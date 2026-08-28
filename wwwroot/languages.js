const VALID_LANGUAGES = [

    "Tiếng Anh",

    "Tiếng Nhật",

    "Tiếng Hàn",

    "Tiếng Trung",

    "Tiếng Pháp",

    "Tiếng Đức",

    "Tiếng Tây Ban Nha"

];


function createLanguageOption(
    language,
    disabled = false
) {

    const option =
        document.createElement("option");

    option.value = language;
    option.textContent = language;
    option.disabled = disabled;

    return option;
}


/* =========================================
   RENDER LANGUAGE CHECKLIST
========================================= */

/*
 * Render danh sách ngoại ngữ hợp lệ
 * vào #language-checklist.
 *
 * currentLanguages:
 * danh sách ngoại ngữ hiện tại của sinh viên
 * vừa được tra cứu.
 */
function refreshLanguageChecklist(
    currentLanguages = []
) {

    const select =
        document.getElementById(
            "language-select"
        );


    if (!select) {
        return;
    }


    /*
     * Chuẩn hóa danh sách ngoại ngữ
     * hiện tại của sinh viên.
     */
    const existingLanguages =
        Array.isArray(currentLanguages)
            ? currentLanguages
            : [];

    const languages = [
        ...VALID_LANGUAGES,
        ...existingLanguages.filter(
            language =>
                !VALID_LANGUAGES.some(
                    validLanguage =>
                        validLanguage.toLowerCase() ===
                        String(language).toLowerCase()
                )
        )
    ];


    select.innerHTML = `
        <option value="">
            -- Chọn ngôn ngữ --
        </option>
    `;


    /*
     * Render toàn bộ ngoại ngữ hợp lệ.
     */
    languages.forEach(
        language => {
            const currentLanguage =
                existingLanguages.find(
                    current =>
                        String(current).toLowerCase() ===
                        String(language).toLowerCase()
                );

            select.appendChild(
                createLanguageOption(
                    language,
                    currentLanguage !== undefined
                )
            );
        }
    );
}


/* =========================================
   INITIAL RENDER
========================================= */

/*
 * Khi trang vừa mở,
 * render danh sách ngoại ngữ hợp lệ.
 *
 * Chưa có sinh viên nào được tra cứu,
 * nên chưa tick ngoại ngữ nào.
 */
document.addEventListener(
    "DOMContentLoaded",
    () => {

        refreshLanguageChecklist([]);

    }
);