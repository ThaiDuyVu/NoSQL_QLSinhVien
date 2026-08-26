const VALID_LANGUAGES = [

    "Tiếng Anh",

    "Tiếng Nhật",

    "Tiếng Hàn",

    "Tiếng Trung",

    "Tiếng Pháp",

    "Tiếng Đức",

    "Tiếng Tây Ban Nha"

];


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

    const container =
        document.getElementById(
            "language-checklist"
        );


    if (!container) {
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


    container.innerHTML = "";


    /*
     * Render toàn bộ ngoại ngữ hợp lệ.
     */
    VALID_LANGUAGES.forEach(
        language => {

            const item =
                document.createElement(
                    "label"
                );


            item.className =
                "checklist-item";


            const checkbox =
                document.createElement(
                    "input"
                );


            checkbox.type =
                "checkbox";

            checkbox.name =
                "language";

            checkbox.value =
                language;


            /*
             * Nếu sinh viên đã có ngoại ngữ này
             * thì checkbox sẽ được đánh dấu.
             */
            checkbox.checked =
                existingLanguages.includes(
                    language
                );


            const text =
                document.createElement(
                    "span"
                );


            text.textContent =
                language;


            item.appendChild(
                checkbox
            );

            item.appendChild(
                text
            );


            container.appendChild(
                item
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