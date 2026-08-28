const BASE_ADVANCED_API = "/api/advanced-sinhvien";

const BASE_BASIC_API = "/api/sinhvien";


/* =========================================
   STATE
========================================= */

/*
 * Danh sách môn học đang chờ bổ sung.
 */
let pendingCourses = [];

/*
 * Danh sách môn học đang có sẵn trong CSDL.
 */
let availableCourses = [];

/*
 * Danh sách sinh viên dùng cho các combobox.
 */
let availableStudents = [];

/*
 * Danh sách ngoại ngữ đang được chọn.
 */
let selectedLanguages = [];


/*
 * Danh sách môn học hiện tại của sinh viên
 * đang được tra cứu.
 */
let currentStudentCourses = [];


/* =========================================
   TOAST
========================================= */

let toastTimer = null;


function showToast(message, type = "success") {

    const toast =
        document.getElementById("toast");


    if (!toast) {
        return;
    }


    toast.textContent = message;


    toast.className =
        `toast ${type}`;


    toast.style.display =
        "block";


    if (toastTimer) {

        clearTimeout(toastTimer);

    }


    toastTimer =
        setTimeout(() => {

            toast.style.display =
                "none";

        }, 3000);
}


/* =========================================
   LOOKUP STUDENT
========================================= */

async function lookupStudent() {

    const searchInput =
        document.getElementById(
            "search-masv"
        );


    const masv =
        searchInput.value.trim();


    if (!masv) {

        showToast(
            "Vui lòng nhập mã sinh viên cần tra cứu.",
            "error"
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${BASE_BASIC_API}/${encodeURIComponent(masv)}`
            );


        if (!response.ok) {

            const text =
                await response.text();

            throw new Error(
                text ||
                `Không tìm thấy sinh viên có mã '${masv}'.`
            );
        }


        const sv =
            await response.json();


        const studentId =
            sv.id ??
            sv._id ??
            "";


        /* ================================
           HIỂN THỊ THÔNG TIN SINH VIÊN
        ================================= */

        document
            .getElementById("info-id")
            .textContent =
            studentId || "-";


        document
            .getElementById("info-masv")
            .textContent =
            sv.maSV ?? "-";


        document
            .getElementById("info-hoten")
            .textContent =
            sv.hoTen ?? "-";


        document
            .getElementById("info-malop")
            .textContent =
            sv.maLop ?? "-";


        document
            .getElementById("info-ngoaingu")
            .textContent =
            (sv.ngoaiNgu || []).join(", ") ||
            "Chưa có";


        document
            .getElementById("student-info")
            .style.display =
            "block";


        /* ================================
           AUTO FILL MÃ SINH VIÊN
        ================================= */

        document
            .getElementById("lang-masv")
            .value =
            sv.maSV ?? "";


        document
            .getElementById("course-masv")
            .value =
            sv.maSV ?? "";


        document
            .getElementById("score-student-select")
            .value =
            sv.maSV ?? "";

        await loadScoreCourses(sv.maSV);


        /* ================================
           AUTO FILL OBJECT ID
        ================================= */

        document
            .getElementById("replace-id")
            .value =
            studentId;


        /* ================================
           HIỂN THỊ DOCUMENT HIỆN TẠI
        ================================= */

        document
            .getElementById("replace-json")
            .value =
            JSON.stringify(
                sv,
                null,
                2
            );


        /* ================================
           RESET OPERATION STATE
        ================================= */

        resetPendingOperations();


        /* ================================
           LANGUAGE CHECKLIST
        ================================= */

        if (
            typeof refreshLanguageChecklist ===
            "function"
        ) {

            refreshLanguageChecklist(
                sv.ngoaiNgu || []
            );

        }


        /* ================================
           LOAD CURRENT COURSES
        ================================= */

        try {

            currentStudentCourses =
                await getStudentCourses(
                    sv.maSV
                );


            /*
             * Render danh sách môn học
             * vào #info-monhoc
             */
            renderCurrentStudentCourses();


        } catch (error) {

            currentStudentCourses = [];

            renderCurrentStudentCourses();


            console.error(
                "Không thể tải danh sách môn học:",
                error
            );
        }


        showToast(
            `Đã tải thông tin sinh viên ${sv.maSV}.`,
            "success"
        );


    } catch (error) {

        document
            .getElementById("student-info")
            .style.display =
            "none";


        currentStudentCourses = [];

        renderCurrentStudentCourses();


        showToast(
            error.message ||
            "Không thể tra cứu sinh viên.",
            "error"
        );
    }
}


/* =========================================
   GET STUDENT COURSES
========================================= */

/*
 * API:
 *
 * GET /api/advanced-sinhvien/{masv}/mon-hoc
 *
 * Response thực tế:
 *
 * [
 *   {
 *     "maMon": "csdl",
 *     "tenMon": "Cơ sở dữ liệu",
 *     "diem": 8.5
 *   },
 *   {
 *     "maMon": "laptrinh",
 *     "tenMon": "Lập trình Cơ bản",
 *     "diem": 8
 *   }
 * ]
 */
async function getStudentCourses(masv) {

    if (!masv) {

        throw new Error(
            "Mã sinh viên không được để trống."
        );
    }


    const response =
        await fetch(
            `${BASE_ADVANCED_API}/${encodeURIComponent(masv)}/mon-hoc`
        );


    const text =
        await response.text();


    if (!response.ok) {

        throw new Error(
            text ||
            `Không thể lấy danh sách môn học của sinh viên '${masv}'.`
        );
    }


    let courses = [];


    try {

        courses =
            text
                ? JSON.parse(text)
                : [];


    } catch (error) {

        throw new Error(
            "Dữ liệu danh sách môn học trả về không hợp lệ."
        );
    }


    if (!Array.isArray(courses)) {

        throw new Error(
            "Dữ liệu danh sách môn học không phải là mảng."
        );
    }


    return courses;
}


/* =========================================
   RENDER CURRENT STUDENT COURSES
========================================= */

/*
 * Hiển thị môn học hiện tại của sinh viên
 * vào:
 *
 * #info-monhoc
 *
 * Đây là ID đang tồn tại trong advance.html.
 */
function renderCurrentStudentCourses() {

    const container =
        document.getElementById(
            "info-monhoc"
        );


    if (!container) {

        console.error(
            "Không tìm thấy element #info-monhoc trong advance.html"
        );

        return;
    }


    container.innerHTML =
        "";


    /* =====================================
       KHÔNG CÓ MÔN HỌC
    ====================================== */

    if (
        !Array.isArray(currentStudentCourses) ||
        currentStudentCourses.length === 0
    ) {

        container.innerHTML = `
            <div class="empty-state">
                Chưa có môn học.
            </div>
        `;

        return;
    }


    /* =====================================
       CÓ MÔN HỌC
    ====================================== */

    currentStudentCourses.forEach(
        (course, index) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "course-detail-item";


            const maMon =
                course.maMon ??
                "-";


            const tenMon =
                course.tenMon ??
                "-";


            const diem =
                course.diem ??
                "-";


            item.innerHTML = `

                <div class="course-detail-index">
                    ${index + 1}
                </div>

                <div class="course-detail-main">

                    <strong class="course-detail-code">
                        ${escapeHtml(maMon)}
                    </strong>

                    <span class="course-detail-name">
                        ${escapeHtml(tenMon)}
                    </span>

                </div>

                <div class="course-detail-score">

                    <span>
                        Điểm
                    </span>

                    <strong>
                        ${escapeHtml(diem)}
                    </strong>

                </div>

            `;


            container.appendChild(
                item
            );
        }
    );
}


/* =========================================
   LANGUAGE CHECKLIST
========================================= */

function getCheckedLanguages() {

    return selectedLanguages;
}


function addSelectedLanguage(language) {

    if (!language) {
        return;
    }

    const exists =
        selectedLanguages.some(
            selectedLanguage =>
                selectedLanguage.toLowerCase() ===
                language.toLowerCase()
        );

    if (exists) {
        showToast(
            `Ngôn ngữ '${language}' đã có trong danh sách.`,
            "error"
        );
        return;
    }

    selectedLanguages.push(language);

    document
        .getElementById("language-select")
        .value = "";

    updateSelectedLanguages();
}


function updateSelectedLanguages() {

    selectedLanguages =
        getCheckedLanguages();


    const container =
        document.getElementById(
            "selected-languages"
        );


    const count =
        document.getElementById(
            "language-count"
        );


    if (count) {

        count.textContent =
            selectedLanguages.length;

    }


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    if (
        selectedLanguages.length === 0
    ) {

        container.innerHTML = `
            <div class="empty-state">
                Chưa chọn ngoại ngữ nào.
            </div>
        `;

        return;
    }


    selectedLanguages.forEach(
        language => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "selected-item";


            item.innerHTML = `

                <span>
                    ${escapeHtml(language)}
                </span>

                <button
                    type="button"
                    class="remove-item-button"
                    data-language="${escapeHtml(language)}">

                    ×

                </button>

            `;


            container.appendChild(
                item
            );
        }
    );
}


function handleAddCustomLanguage(event) {

    event.preventDefault();

    const input =
        document.getElementById(
            "custom-language-input"
        );

    const language =
        input.value.trim();

    if (!language) {
        showToast(
            "Vui lòng nhập tên ngôn ngữ.",
            "error"
        );
        return;
    }

    if (/[^\x20-\x7E\u00A0-\uFFFF]/.test(language)) {
        showToast(
            "Tên ngôn ngữ chứa ký tự không hợp lệ.",
            "error"
        );
        return;
    }

    const exists =
        Array.from(
            document.querySelectorAll(
                "#language-select option"
            )
        ).some(
            option =>
                option.value.toLowerCase() ===
                language.toLowerCase()
        );

    if (exists) {
        showToast(
            `Ngôn ngữ '${language}' đã có trong danh sách.`,
            "error"
        );
        return;
    }

    document
        .getElementById("language-select")
        .appendChild(
            createLanguageOption(language)
        );

    input.value = "";
    addSelectedLanguage(language);
}


function removeSelectedLanguage(
    language
) {

    const option =
        document.querySelector(
            `#language-select option[value="${CSS.escape(language)}"]`
        );


    if (option) {

        selectedLanguages =
            selectedLanguages.filter(
                selectedLanguage =>
                    selectedLanguage !== language
            );

    }


    updateSelectedLanguages();
}


/* =========================================
   ADD LANGUAGE - $addToSet
========================================= */

async function handleAddLanguage() {

    const masv =
        document
            .getElementById("lang-masv")
            .value
            .trim();


    if (!masv) {

        showToast(
            "Vui lòng nhập hoặc tra cứu mã sinh viên.",
            "error"
        );

        return;
    }


    const languages =
        [...getCheckedLanguages()];


    if (languages.length === 0) {

        showToast(
            "Vui lòng chọn ít nhất một ngoại ngữ.",
            "error"
        );

        return;
    }


    let successCount = 0;

    let failedLanguages = [];


    for (
        const ngoaiNgu of languages
    ) {

        try {

            const response =
                await fetch(
                    `${BASE_ADVANCED_API}/${encodeURIComponent(masv)}/ngoai-ngu`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                ngoaiNgu
                            )
                    }
                );


            const text =
                await response.text();


            if (!response.ok) {

                throw new Error(
                    text ||
                    `Không thể thêm ${ngoaiNgu}.`
                );
            }


            successCount++;


        } catch (error) {

            failedLanguages.push(
                ngoaiNgu
            );
        }
    }


    if (
        failedLanguages.length === 0
    ) {

        showToast(
            `Đã bổ sung ${successCount} ngoại ngữ thành công.`,
            "success"
        );


    } else {

        showToast(
            `Đã thêm ${successCount} ngoại ngữ. Không thể thêm: ${failedLanguages.join(", ")}.`,
            "error"
        );
    }


    document
        .getElementById("language-select")
        .value = "";


    updateSelectedLanguages();


    await refreshCurrentStudent(
        masv
    );
}


/* =========================================
   ADD COURSE TO PENDING LIST
========================================= */
function addCourseToPendingList() {

    const mode =
        document.querySelector(
            'input[name="course-mode"]:checked'
        )?.value;


    const diem =
        parseFloat(
            document
                .getElementById("course-diem")
                .value
        );


    if (
        Number.isNaN(diem) ||
        diem < 0 ||
        diem > 10
    ) {

        showToast(
            "Điểm phải nằm trong khoảng từ 0 đến 10.",
            "error"
        );

        return;
    }


    let maMon = "";
    let tenMon = "";


    // =================================================
    // TRƯỜNG HỢP 1: NHẬP MÔN MỚI
    // =================================================

    if (mode === "new") {

        maMon =
            document
                .getElementById("course-mamon")
                .value
                .trim();

        tenMon =
            document
                .getElementById("course-tenmon")
                .value
                .trim();


        if (!maMon || !tenMon) {

            showToast(
                "Vui lòng nhập mã môn và tên môn.",
                "error"
            );

            return;
        }
    }


    // =================================================
    // TRƯỜNG HỢP 2: CHỌN MÔN CÓ SẴN
    // =================================================

    else if (mode === "existing") {

        const selectedMaMon =
            document
                .getElementById(
                    "existing-course-select"
                )
                .value;


        if (!selectedMaMon) {

            showToast(
                "Vui lòng chọn một môn học.",
                "error"
            );

            return;
        }


        const selectedCourse =
            availableCourses.find(
                course =>
                    course.maMon ===
                    selectedMaMon
            );


        if (!selectedCourse) {

            showToast(
                "Không tìm thấy thông tin môn học đã chọn.",
                "error"
            );

            return;
        }


        maMon =
            selectedCourse.maMon;

        tenMon =
            selectedCourse.tenMon;
    }


    // =================================================
    // KIỂM TRA TRÙNG TRONG DANH SÁCH CHỜ
    // =================================================

    const exists =
        pendingCourses.some(
            course =>
                course.maMon
                    .toLowerCase() ===
                maMon.toLowerCase()
        );


    if (exists) {

        showToast(
            `Môn ${maMon} đã có trong danh sách.`,
            "error"
        );

        return;
    }


    // =================================================
    // THÊM VÀO PENDING
    // =================================================

    pendingCourses.push({

        maMon,

        tenMon,

        diem

    });


    renderPendingCourses();


    // =================================================
    // RESET INPUT
    // =================================================

    document
        .getElementById("course-diem")
        .value = "";


    if (mode === "new") {

        document
            .getElementById("course-mamon")
            .value = "";

        document
            .getElementById("course-tenmon")
            .value = "";

    } else {

        document
            .getElementById(
                "existing-course-select"
            )
            .value = "";
    }


    showToast(
        `Đã thêm môn ${maMon} vào danh sách chờ.`,
        "success"
    );
}

/* =========================================
   RENDER PENDING COURSES
========================================= */

function renderPendingCourses() {

    const container =
        document.getElementById(
            "selected-courses"
        );


    const count =
        document.getElementById(
            "course-count"
        );


    if (count) {

        count.textContent =
            pendingCourses.length;

    }


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    if (
        pendingCourses.length === 0
    ) {

        container.innerHTML = `
            <div class="empty-state">
                Chưa có môn học nào.
            </div>
        `;

        return;
    }


    pendingCourses.forEach(
        (course, index) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "selected-item course-item";


            item.innerHTML = `

                <div class="course-item-info">

                    <strong>
                        ${escapeHtml(course.maMon)}
                    </strong>

                    <span>
                        ${escapeHtml(course.tenMon)}
                    </span>

                    <small>
                        Điểm: ${escapeHtml(course.diem)}
                    </small>

                </div>


                <button
                    type="button"
                    class="remove-item-button"
                    data-course-index="${index}">

                    ×

                </button>

            `;


            container.appendChild(
                item
            );
        }
    );
}


/* =========================================
   REMOVE COURSE FROM PENDING LIST
========================================= */

function removePendingCourse(index) {

    if (
        index < 0 ||
        index >= pendingCourses.length
    ) {

        return;
    }


    pendingCourses.splice(
        index,
        1
    );


    renderPendingCourses();
}


/* =========================================
   ADD COURSES - $push
========================================= */

async function handleAddCourses() {

    const masv =
        document
            .getElementById("course-masv")
            .value
            .trim();


    if (!masv) {

        showToast(
            "Vui lòng nhập hoặc tra cứu mã sinh viên.",
            "error"
        );

        return;
    }


    if (
        pendingCourses.length === 0
    ) {

        showToast(
            "Vui lòng thêm ít nhất một môn học vào danh sách.",
            "error"
        );

        return;
    }


    let successCount = 0;

    let failedCourses = [];


    for (
        const monHoc of pendingCourses
    ) {

        try {

            const response =
                await fetch(
                    `${BASE_ADVANCED_API}/${encodeURIComponent(masv)}/mon-hoc`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                monHoc
                            )
                    }
                );


            const text =
                await response.text();


            if (!response.ok) {

                throw new Error(
                    text ||
                    `Không thể thêm môn ${monHoc.maMon}.`
                );
            }


            successCount++;


        } catch (error) {

            failedCourses.push(
                monHoc.maMon
            );
        }
    }


    if (
        failedCourses.length === 0
    ) {

        showToast(
            `Đã thêm ${successCount} môn học thành công.`,
            "success"
        );


    } else {

        showToast(
            `Đã thêm ${successCount} môn. Không thể thêm: ${failedCourses.join(", ")}.`,
            "error"
        );
    }


    pendingCourses = [];


    renderPendingCourses();


    await refreshCurrentStudent(
        masv
    );
}


/* =========================================
   UPDATE SCORE - POSITIONAL $
========================================= */

async function handleUpdateScore(event) {

    event.preventDefault();


    const masv =
        document
            .getElementById("score-student-select")
            .value
            .trim();


    const mamon =
        document
            .getElementById("score-course-select")
            .value
            .trim();


    const diem =
        parseFloat(
            document
                .getElementById("score-diem")
                .value
        );


    if (!masv || !mamon) {

        showToast(
            "Vui lòng nhập mã sinh viên và mã môn.",
            "error"
        );

        return;
    }


    if (
        Number.isNaN(diem) ||
        diem < 0 ||
        diem > 10
    ) {

        showToast(
            "Điểm phải nằm trong khoảng từ 0 đến 10.",
            "error"
        );

        return;
    }


    const dto = {
        diem
    };


    try {

        const response =
            await fetch(
                `${BASE_ADVANCED_API}/${encodeURIComponent(masv)}/mon-hoc/${encodeURIComponent(mamon)}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(dto)
                }
            );


        const text =
            await response.text();


        if (!response.ok) {

            throw new Error(
                text ||
                "Không thể cập nhật điểm."
            );
        }


        showToast(
            text ||
            "Cập nhật điểm thành công.",
            "success"
        );


        await refreshCurrentStudent(
            masv
        );


    } catch (error) {

        showToast(
            error.message ||
            "Không thể cập nhật điểm.",
            "error"
        );
    }
}


/* =========================================
   REPLACE DOCUMENT
========================================= */

async function handleReplaceDoc(event) {

    event.preventDefault();


    const id =
        document
            .getElementById("replace-id")
            .value
            .trim();


    const jsonString =
        document
            .getElementById("replace-json")
            .value
            .trim();


    if (!id) {

        showToast(
            "Vui lòng nhập _id MongoDB.",
            "error"
        );

        return;
    }


    if (!jsonString) {

        showToast(
            "Vui lòng nhập nội dung JSON.",
            "error"
        );

        return;
    }


    let updatedStudent;


    try {

        updatedStudent =
            JSON.parse(
                jsonString
            );

    } catch (error) {

        showToast(
            "Định dạng JSON không hợp lệ. Vui lòng kiểm tra lại.",
            "error"
        );

        return;
    }


    try {

        const response =
            await fetch(
                `${BASE_ADVANCED_API}/replace/${encodeURIComponent(id)}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            updatedStudent
                        )
                }
            );


        const text =
            await response.text();


        if (!response.ok) {

            throw new Error(
                text ||
                "Không thể replace Document."
            );
        }


        showToast(
            text ||
            "Replace Document thành công.",
            "success"
        );


        if (
            updatedStudent.maSV
        ) {

            await refreshCurrentStudent(
                updatedStudent.maSV
            );

        }


    } catch (error) {

        showToast(
            error.message ||
            "Không thể replace Document.",
            "error"
        );
    }
}


/* =========================================
   REFRESH CURRENT STUDENT
========================================= */

async function refreshCurrentStudent(
    masv
) {

    if (!masv) {
        return;
    }


    try {

        /* ================================
           LẤY THÔNG TIN SINH VIÊN
        ================================= */

        const response =
            await fetch(
                `${BASE_BASIC_API}/${encodeURIComponent(masv)}`
            );


        if (!response.ok) {
            return;
        }


        const sv =
            await response.json();


        const studentId =
            sv.id ??
            sv._id ??
            "";


        /* ================================
           UPDATE THÔNG TIN SINH VIÊN
        ================================= */

        document
            .getElementById("info-id")
            .textContent =
            studentId || "-";


        document
            .getElementById("info-masv")
            .textContent =
            sv.maSV ?? "-";


        document
            .getElementById("info-hoten")
            .textContent =
            sv.hoTen ?? "-";


        document
            .getElementById("info-malop")
            .textContent =
            sv.maLop ?? "-";


        document
            .getElementById("info-ngoaingu")
            .textContent =
            (sv.ngoaiNgu || []).join(", ") ||
            "Chưa có";


        document
            .getElementById("replace-id")
            .value =
            studentId;


        document
            .getElementById("replace-json")
            .value =
            JSON.stringify(
                sv,
                null,
                2
            );


        /* ================================
           LANGUAGE CHECKLIST
        ================================= */

        if (
            typeof refreshLanguageChecklist ===
            "function"
        ) {

            refreshLanguageChecklist(
                sv.ngoaiNgu || []
            );

        }


        /* ================================
           LẤY DANH SÁCH MÔN HỌC
        ================================= */

        try {

            currentStudentCourses =
                await getStudentCourses(
                    sv.maSV
                );


        } catch (error) {

            currentStudentCourses = [];

            console.error(
                "Không thể lấy danh sách môn học:",
                error
            );
        }


        /* ================================
           RENDER MÔN HỌC
        ================================= */

        renderCurrentStudentCourses();


    } catch (error) {

        console.error(
            "Không thể refresh sinh viên:",
            error
        );
    }
}


/* =========================================
   RESET PENDING OPERATIONS
========================================= */

function resetPendingOperations() {

    /*
     * Reset môn học chờ thêm.
     */

    pendingCourses = [];

    renderPendingCourses();


    /*
     * Reset ngoại ngữ được chọn.
     */

    selectedLanguages = [];


    document
        .getElementById("language-select")
        .value = "";


    updateSelectedLanguages();
}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHtml(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );
}


/* =========================================
   EVENT LISTENERS
========================================= */

document
    .getElementById("lookup-button")
    .addEventListener(
        "click",
        lookupStudent
    );


document
    .getElementById("search-masv")
    .addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                lookupStudent();

            }

        }
    );


/* =========================================
   LANGUAGE EVENTS
========================================= */

document
    .getElementById("language-select")
    .addEventListener(
        "change",
        event =>
            addSelectedLanguage(
                event.target.value
            )
    );


document
    .getElementById("custom-language-form")
    .addEventListener(
        "submit",
        handleAddCustomLanguage
    );


document
    .getElementById("selected-languages")
    .addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".remove-item-button"
                );


            if (!button) {
                return;
            }


            const language =
                button.dataset.language;


            if (language) {

                removeSelectedLanguage(
                    language
                );

            }

        }
    );


/* =========================================
   ADD LANGUAGE
========================================= */

document
    .getElementById(
        "add-language-button"
    )
    .addEventListener(
        "click",
        handleAddLanguage
    );


/* =========================================
   COURSE EVENTS
========================================= */

document
    .getElementById(
        "add-course-item-button"
    )
    .addEventListener(
        "click",
        addCourseToPendingList
    );
document
    .querySelectorAll(
        'input[name="course-mode"]'
    )
    .forEach(
        radio => {

            radio.addEventListener(
                "change",
                handleCourseModeChange
            );

        }
    );

document
    .getElementById("selected-courses")
    .addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".remove-item-button"
                );


            if (!button) {
                return;
            }


            const index =
                Number(
                    button.dataset.courseIndex
                );


            if (
                !Number.isNaN(index)
            ) {

                removePendingCourse(
                    index
                );

            }

        }
    );


document
    .getElementById(
        "add-courses-button"
    )
    .addEventListener(
        "click",
        handleAddCourses
    );


/* =========================================
   ENTER - ADD COURSE
========================================= */

[
    "course-mamon",
    "course-tenmon",
    "course-diem"
].forEach(
    id => {

        document
            .getElementById(id)
            .addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter"
                    ) {

                        event.preventDefault();

                        addCourseToPendingList();

                    }

                }
            );

        }
    );

/* =========================================
   LOAD AVAILABLE STUDENTS
========================================= */

async function loadAvailableStudents() {

    const select =
        document.getElementById(
            "score-student-select"
        );

    if (!select) {
        return;
    }

    try {
        const response =
            await fetch(BASE_BASIC_API);

        const text =
            await response.text();

        if (!response.ok) {
            throw new Error(
                text ||
                "Không thể tải danh sách sinh viên."
            );
        }

        availableStudents =
            text
                ? JSON.parse(text)
                : [];

        if (!Array.isArray(availableStudents)) {
            throw new Error(
                "Dữ liệu sinh viên trả về không phải là mảng."
            );
        }

        renderScoreStudents(availableStudents);

    } catch (error) {
        availableStudents = [];

        select.innerHTML = `
            <option value="">
                -- Không thể tải danh sách sinh viên --
            </option>
        `;

        showToast(
            error.message ||
            "Không thể tải danh sách sinh viên.",
            "error"
        );
    }
}


function renderScoreStudents(students) {

    const select =
        document.getElementById(
            "score-student-select"
        );

    const selectedMaSV =
        select.value;

    select.innerHTML = `
        <option value="">
            -- Chọn sinh viên --
        </option>
    `;

    students
        .filter(student => student.maSV)
        .forEach(student => {
            const option =
                document.createElement("option");

            option.value = student.maSV;
            option.textContent =
                `${student.maSV} - ${student.hoTen || "Chưa có tên"}`;

            select.appendChild(option);
        });

    if (
        students.some(student =>
            student.maSV === selectedMaSV
        )
    ) {
        select.value = selectedMaSV;
    }
}


async function loadScoreCourses(masv) {

    const select =
        document.getElementById(
            "score-course-select"
        );

    select.innerHTML = `
        <option value="">
            -- Đang tải danh sách môn học... --
        </option>
    `;

    if (!masv) {
        select.innerHTML = `
            <option value="">
                -- Chọn sinh viên trước --
            </option>
        `;
        return;
    }

    try {
        const courses =
            await getStudentCourses(masv);

        select.innerHTML = `
            <option value="">
                -- Chọn môn học --
            </option>
        `;

        const uniqueCourses = [
            ...new Map(
                courses.map(course => [
                    course.maMon.toLowerCase(),
                    course
                ])
            ).values()
        ];

        uniqueCourses.forEach(course => {
            const option =
                document.createElement("option");

            option.value = course.maMon;
            option.textContent =
                `${course.maMon} - ${course.tenMon}`;

            select.appendChild(option);
        });

        if (courses.length === 0) {
            select.innerHTML = `
                <option value="">
                    -- Sinh viên chưa có môn học --
                </option>
            `;
        }
    } catch (error) {
        select.innerHTML = `
            <option value="">
                -- Không thể tải danh sách môn học --
            </option>
        `;
    }
}


/* =========================================
   LOAD AVAILABLE COURSES
========================================= */

async function loadAvailableCourses() {

    const select =
        document.getElementById(
            "existing-course-select"
        );


    if (!select) {

        console.error(
            "Không tìm thấy #existing-course-select."
        );

        return;
    }


    try {

        select.innerHTML = `
            <option value="">
                -- Đang tải danh sách môn học... --
            </option>
        `;


        const response =
            await fetch(
                `${BASE_BASIC_API}/mon-hoc`
            );


        const text =
            await response.text();


        if (!response.ok) {

            throw new Error(
                text ||
                "Không thể tải danh sách môn học."
            );
        }


        availableCourses =
            text
                ? JSON.parse(text)
                : [];


        if (!Array.isArray(availableCourses)) {

            throw new Error(
                "Dữ liệu môn học trả về không phải là mảng."
            );
        }


        select.innerHTML = `
            <option value="">
                -- Chọn môn học --
            </option>
        `;


        availableCourses.forEach(
            course => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    course.maMon;


                option.textContent =
                    `${course.maMon} - ${course.tenMon}`;


                select.appendChild(
                    option
                );
            }
        );


        if (
            availableCourses.length === 0
        ) {

            select.innerHTML = `
                <option value="">
                    -- Chưa có môn học trong CSDL --
                </option>
            `;

        }


    } catch (error) {

        console.error(
            "LOAD AVAILABLE COURSES ERROR:",
            error
        );


        availableCourses = [];


        select.innerHTML = `
            <option value="">
                -- Không thể tải danh sách môn học --
            </option>
        `;


        showToast(
            error.message ||
            "Không thể tải danh sách môn học.",
            "error"
        );
    }
}
function handleCourseModeChange() {

    const mode =
        document.querySelector(
            'input[name="course-mode"]:checked'
        )?.value;

    const newArea =
        document.getElementById(
            "new-course-area"
        );

    const existingArea =
        document.getElementById(
            "existing-course-area"
        );

    if (!newArea || !existingArea) {
        return;
    }

    if (mode === "existing") {

        newArea.style.display =
            "none";

        existingArea.style.display =
            "block";

        loadAvailableCourses();

    } else {

        newArea.style.display =
            "block";

        existingArea.style.display =
            "none";
    }
}
/* =========================================
   UPDATE SCORE
========================================= */

document
    .getElementById("score-student-select")
    .addEventListener(
        "change",
        event =>
            loadScoreCourses(
                event.target.value
            )
    );

document
    .getElementById(
        "form-update-score"
    )
    .addEventListener(
        "submit",
        handleUpdateScore
    );


/* =========================================
   REPLACE DOCUMENT
========================================= */

document
    .getElementById(
        "form-replace-doc"
    )
    .addEventListener(
        "submit",
        handleReplaceDoc
    );


/* =========================================
   INITIAL STATE
========================================= */

updateSelectedLanguages();

renderPendingCourses();

renderCurrentStudentCourses();

handleCourseModeChange();

loadAvailableStudents();