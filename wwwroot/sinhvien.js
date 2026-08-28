const API = "/api/sinhvien";


// currentEditingId lưu maSV
// API route sử dụng mã sinh viên:
// /api/sinhvien/{masv}

let currentEditingId = null;


// =====================================================
// TOAST
// =====================================================

function showToast(
    msg,
    type = "success"
) {

    const toast =
        document.getElementById("toast");

    toast.textContent = msg;

    toast.className =
        "toast " + type;

    toast.style.display =
        "block";

    setTimeout(() => {

        toast.style.display =
            "none";

    }, 2500);
}


// =====================================================
// NGOẠI NGỮ
// =====================================================

function addNgoaiNguRow(
    value = ""
) {

    const wrap =
        document.getElementById(
            "ngoaingu-list"
        );

    const row =
        document.createElement("div");

    row.className =
        "row-inline";

    row.innerHTML = `
        <input
            type="text"
            class="ngoaingu-input"
            placeholder="VD: Tiếng Anh"
            value="${escapeHtml(value)}"
        />

        <button
            type="button"
            class="btn btn-x"
            onclick="this.parentElement.remove()">

            ✕

        </button>
    `;

    wrap.appendChild(row);
}


function getNgoaiNguList() {

    return [
        ...document.querySelectorAll(
            ".ngoaingu-input"
        )
    ]
        .map(
            input =>
                input.value.trim()
        )
        .filter(
            value =>
                value !== ""
        );
}


// =====================================================
// MÔN HỌC
// =====================================================

function addMonHocRow(
    mamon = "",
    tenmon = "",
    diem = ""
) {

    const wrap =
        document.getElementById(
            "monhoc-list"
        );

    const row =
        document.createElement("div");

    row.className =
        "row-inline";

    row.innerHTML = `

        <input
            type="text"
            class="mamon-input"
            placeholder="Mã môn"
            value="${escapeHtml(mamon)}"
            style="max-width:90px;"
        />

        <input
            type="text"
            class="tenmon-input"
            placeholder="Tên môn"
            value="${escapeHtml(tenmon)}"
        />

        <input
            type="number"
            class="diem-input diem"
            placeholder="Điểm"
            min="0"
            max="10"
            step="0.1"
            value="${diem}"
        />

        <button
            type="button"
            class="btn btn-x"
            onclick="this.parentElement.remove()">

            ✕

        </button>

    `;

    wrap.appendChild(row);
}


function getMonHocList() {

    const rows =
        document.querySelectorAll(
            "#monhoc-list .row-inline"
        );

    const list = [];


    for (const row of rows) {

        const maMon =
            row
                .querySelector(
                    ".mamon-input"
                )
                .value
                .trim();


        const tenMon =
            row
                .querySelector(
                    ".tenmon-input"
                )
                .value
                .trim();


        const diemRaw =
            row
                .querySelector(
                    ".diem-input"
                )
                .value;


        if (
            !maMon &&
            !tenMon &&
            diemRaw === ""
        ) {

            continue;
        }


        if (!maMon || !tenMon) {

            throw new Error(
                "Vui lòng nhập đầy đủ Mã môn và Tên môn cho mỗi dòng môn học."
            );
        }


        const diem =
            parseFloat(diemRaw);


        if (
            isNaN(diem) ||
            diem < 0 ||
            diem > 10
        ) {

            throw new Error(
                `Điểm môn '${tenMon}' phải trong khoảng 0 đến 10.`
            );
        }


        list.push({
            maMon,
            tenMon,
            diem
        });
    }


    return list;
}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHtml(str) {

    return String(str)
        .replace(
            /[&<>"']/g,
            character => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[character])
        );
}


// =====================================================
// FORM
// =====================================================

function clearForm() {

    document.getElementById(
        "masv"
    ).value = "";

    document.getElementById(
        "masv"
    ).disabled = false;


    document.getElementById(
        "hoten"
    ).value = "";


    document.getElementById(
        "tuoi"
    ).value = 18;


    document.getElementById(
        "phai"
    ).value = "Nam";


    document.getElementById(
        "malop"
    ).value = "";


    document.getElementById(
        "ngoaingu-list"
    ).innerHTML = "";


    document.getElementById(
        "monhoc-list"
    ).innerHTML = "";


    currentEditingId = null;
}


function validateBasicInput() {
    // Ưu tiên lấy maSV từ currentEditingId nếu đang ở chế độ cập nhật, nếu không thì lấy từ input
    const maSV = currentEditingId || document.getElementById("masv").value.trim();

    const hoTen = document
        .getElementById("hoten")
        .value
        .trim();

    const tuoi = parseInt(
        document
            .getElementById("tuoi")
            .value,
        10
    );

    if (!maSV || !hoTen) {
        throw new Error(
            "Vui lòng nhập đầy đủ Mã SV và Họ tên."
        );
    }

    if (
        isNaN(tuoi) ||
        tuoi <= 0
    ) {
        throw new Error(
            "Tuổi phải là số nguyên dương."
        );
    }

    return {
        maSV,
        hoTen,
        tuoi
    };
}

// =====================================================
// CREATE
// =====================================================

async function createSinhVien() {

    try {

        const {
            maSV,
            hoTen,
            tuoi
        } = validateBasicInput();


        const monHoc =
            getMonHocList();


        const sv = {

            maSV,

            hoTen,

            tuoi,

            phai:
                document
                    .getElementById("phai")
                    .value,

            maLop:
                document
                    .getElementById("malop")
                    .value
                    .trim(),

            ngoaiNgu:
                getNgoaiNguList(),

            monHoc

        };


        const res =
            await fetch(API, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(sv)

            });


        const text =
            await res.text();


        if (!res.ok) {

            throw new Error(
                text ||
                "Thêm thất bại."
            );
        }


        showToast(
            "Thêm sinh viên thành công!",
            "success"
        );


        clearForm();

        await loadAll();

    } catch (err) {

        showToast(
            err.message,
            "error"
        );
    }
}


// =====================================================
// UPDATE
// =====================================================

async function updateSinhVien() {
    try {
        if (!currentEditingId) {
            showToast("Vui lòng chọn 1 sinh viên trong bảng để cập nhật.", "error");
            return;
        }

        const hoTen = document.getElementById("hoten").value.trim();
        const tuoi = parseInt(document.getElementById("tuoi").value, 10);

        if (!hoTen) {
            throw new Error("Vui lòng nhập đầy đủ Họ tên.");
        }

        if (isNaN(tuoi) || tuoi <= 0) {
            throw new Error("Tuổi phải là số nguyên dương.");
        }

        // Tạo DTO đúng khớp với UpdateSinhVienDto bên C#
        const dto = {
            hoTen: hoTen,
            tuoi: tuoi,
            phai: document.getElementById("phai").value,
            maLop: document.getElementById("malop").value.trim()
        };

        const res = await fetch(`${API}/${currentEditingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dto)
        });

        const text = await res.text();

        if (!res.ok) {
            throw new Error(text || "Cập nhật thất bại.");
        }

        showToast("Cập nhật thành công!", "success");
        clearForm();
        await loadAll();

    } catch (err) {
        showToast(err.message, "error");
    }
}

// =====================================================
// DELETE
// =====================================================

async function deleteSinhVien(
    maSV
) {

    if (
        !confirm(
            `Bạn có chắc muốn xóa sinh viên '${maSV}'?`
        )
    ) {

        return;
    }


    try {

        const res =
            await fetch(
                `${API}/${maSV}`,
                {
                    method: "DELETE"
                }
            );


        const text =
            await res.text();


        if (!res.ok) {

            throw new Error(
                text ||
                "Xóa thất bại."
            );
        }


        showToast(
            "Xóa thành công!",
            "success"
        );


        await loadAll();

    } catch (err) {

        showToast(
            err.message,
            "error"
        );
    }
}


// =====================================================
// LOAD ALL
// =====================================================

async function loadAll() {

    try {

        const res =
            await fetch(API);


        if (!res.ok) {

            throw new Error(
                "Không thể tải danh sách sinh viên."
            );
        }


        const list =
            await res.json();


        renderTable(list);

    } catch (err) {

        showToast(
            "Không tải được danh sách. Kiểm tra API/MongoDB đã chạy chưa.",
            "error"
        );
    }
}


// =====================================================
// FILTER
// =====================================================

async function filterByLop() {

    const maLop =
        document
            .getElementById("filterLop")
            .value
            .trim();


    if (!maLop) {

        await loadAll();

        return;
    }


    try {

        const res =
            await fetch(
                `${API}/lop/${maLop}`
            );


        if (!res.ok) {

            throw new Error(
                "Lọc thất bại."
            );
        }


        const list =
            await res.json();


        renderTable(list);

    } catch (err) {

        showToast(
            err.message ||
            "Lọc thất bại.",
            "error"
        );
    }
}


// =====================================================
// RENDER TABLE
// =====================================================

function renderTable(list) {

    const tbody =
        document.getElementById(
            "tbody"
        );


    const emptyMsg =
        document.getElementById(
            "emptyMsg"
        );


    tbody.innerHTML = "";


    if (
        !list ||
        list.length === 0
    ) {

        emptyMsg.style.display =
            "block";

        return;
    }


    emptyMsg.style.display =
        "none";


    for (const sv of list) {

        const tr =
            document.createElement("tr");


        tr.innerHTML = `

            <td>
                ${escapeHtml(
            sv.maSV
        )}
            </td>

            <td>
                ${escapeHtml(
            sv.hoTen
        )}
            </td>

            <td>
                ${sv.tuoi}
            </td>

            <td>
                ${escapeHtml(
            sv.phai
        )}
            </td>

            <td>
                ${escapeHtml(
            sv.maLop
        )}
            </td>

            <td>
                ${(sv.ngoaiNgu || [])
                .map(
                    escapeHtml
                )
                .join(", ")
            || "-"
            }
            </td>

            <td>

                <span class="badge" style="cursor:pointer; background-color:#e0e7ff; color:#3730a3; padding:4px 8px; border-radius:4px;" onclick="event.stopPropagation(); showDetailModal(${JSON.stringify(sv).replace(/"/g, '&quot;')})">
                    ${(sv.monHoc || []).length} môn (Xem)
                </span>

            </td>

            <td>

                <button
                    class="btn btn-danger"
                    onclick="
                        event.stopPropagation();
                        deleteSinhVien(
                            '${escapeHtml(
                sv.maSV
            )}'
                        )
                    ">

                    Xóa

                </button>

            </td>

        `;


        tr.onclick =
            () => fillFormFromRow(sv);


        tbody.appendChild(tr);
    }
}


// =====================================================
// SELECT STUDENT
// =====================================================

function fillFormFromRow(sv) {
    // Ưu tiên gán ID trước tiên để tránh bị đứt đoạn
    currentEditingId = sv.maSV;

    document.getElementById("masv").value = sv.maSV;
    document.getElementById("masv").disabled = true;

    document.getElementById("hoten").value = sv.hoTen;
    document.getElementById("tuoi").value = sv.tuoi;
    document.getElementById("phai").value = sv.phai;
    document.getElementById("malop").value = sv.maLop;

    // Ngoại ngữ
    const ngoaiNguWrap = document.getElementById("ngoaingu-list");
    if (ngoaiNguWrap) {
        ngoaiNguWrap.innerHTML = "";
        (sv.ngoaiNgu || []).forEach(nn => addNgoaiNguRow(nn));
    }

    // Môn học
    const monHocWrap = document.getElementById("monhoc-list");
    if (monHocWrap) {
        monHocWrap.innerHTML = "";
        (sv.monHoc || []).forEach(mon =>
            addMonHocRow(mon.maMon, mon.tenMon, mon.diem)
        );
    }

    showToast(`Đã chọn sinh viên ${sv.maSV} — bấm 'Cập nhật' để lưu thay đổi.`, "success");
}
// =====================================================
// MODAL CHI TIẾT MÔN HỌC & NGOẠI NGỮ
// =====================================================

function showDetailModal(sv) {
    // Đổ dữ liệu lên Modal
    document.getElementById("modalMaSV").textContent = sv.maSV;
    document.getElementById("modalHoTen").textContent = sv.hoTen;

    // Ngoại ngữ
    const nnList = document.getElementById("modalNgoaiNgu");
    nnList.innerHTML = "";
    const ngoaiNguArr = sv.ngoaiNgu || sv.NgoaiNgu || [];
    if (ngoaiNguArr.length > 0) {
        ngoaiNguArr.forEach(nn => {
            const li = document.createElement("li");
            li.textContent = nn;
            nnList.appendChild(li);
        });
    } else {
        nnList.innerHTML = "<li>Không có ngoại ngữ</li>";
    }

    // Môn học
    const mhTable = document.getElementById("modalMonHoc");
    mhTable.innerHTML = "";
    const monHocArr = sv.monHoc || sv.MonHoc || [];
    if (monHocArr.length > 0) {
        monHocArr.forEach(m => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="border:1px solid #ddd; padding:6px;">${escapeHtml(m.maMon || m.MaMon || '')}</td>
                <td style="border:1px solid #ddd; padding:6px;">${escapeHtml(m.tenMon || m.TenMon || '')}</td>
                <td style="border:1px solid #ddd; padding:6px; text-align:center;">${m.diem !== undefined ? m.diem : m.Diem}</td>
            `;
            mhTable.appendChild(tr);
        });
    } else {
        mhTable.innerHTML = "<tr><td colspan='3' style='text-align:center; padding:8px;'>Chưa có môn học nào</td></tr>";
    }

    // Hiển thị modal dạng flex căn giữa
    document.getElementById("detailModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("detailModal").style.display = "none";
}

// Đóng modal khi click ra vùng màu đen bên ngoài
window.onclick = function (event) {
    const modal = document.getElementById("detailModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// =====================================================
// INITIALIZE
// =====================================================

loadAll();