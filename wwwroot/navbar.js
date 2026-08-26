(function () {

    const container = document.getElementById("navbar-container");

    if (!container) {
        return;
    }

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const isDashboard =
        currentPage === "" ||
        currentPage === "index.html";

    const isSinhVien =
        currentPage === "sinhvien.html";

    const isAdvance =
        currentPage === "advance.html";


    container.innerHTML = `

        <style>

            .app-navbar {
                position: sticky;
                top: 0;
                z-index: 1000;

                display: flex;
                align-items: center;
                justify-content: space-between;

                gap: 20px;

                min-height: 64px;

                padding: 0 24px;

                border-bottom: 1px solid #e4e7ec;

                background: rgba(255, 255, 255, .96);

                box-shadow:
                    0 2px 8px rgba(16, 24, 40, .05);

                backdrop-filter: blur(10px);

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif;
            }


            .app-navbar-brand {
                display: flex;
                align-items: center;

                gap: 10px;

                color: #1d2939;

                text-decoration: none;

                font-size: 17px;
                font-weight: 700;

                white-space: nowrap;
            }


            .app-navbar-logo {
                display: flex;
                align-items: center;
                justify-content: center;

                width: 36px;
                height: 36px;

                border-radius: 9px;

                color: #ffffff;

                background: #2563eb;

                font-size: 17px;
            }


            .app-navbar-menu {
                display: flex;
                align-items: center;

                gap: 6px;

                margin: 0;
                padding: 0;

                list-style: none;
            }


            .app-navbar-link {
                display: block;

                padding: 9px 14px;

                border-radius: 7px;

                color: #667085;

                text-decoration: none;

                font-size: 14px;
                font-weight: 600;

                transition:
                    background .2s,
                    color .2s;
            }


            .app-navbar-link:hover {
                color: #2563eb;

                background: #f2f4f7;
            }


            .app-navbar-link.active {
                color: #2563eb;

                background: #dbeafe;
            }


            @media (max-width: 600px) {

                .app-navbar {
                    padding: 0 12px;
                }

                .app-navbar-brand span {
                    display: none;
                }

                .app-navbar-link {
                    padding: 8px 10px;

                    font-size: 13px;
                }

            }

        </style>


        <nav
            class="app-navbar"
            aria-label="Điều hướng chính">


            <a
                href="index.html"
                class="app-navbar-brand">

                <span class="app-navbar-logo">
                    🎓
                </span>

                <span>
                    Quản lý sinh viên
                </span>

            </a>


            <ul class="app-navbar-menu">


                <li>

                    <a
                        href="index.html"
                        class="
                            app-navbar-link
                            ${isDashboard ? "active" : ""}
                        ">

                        Dashboard

                    </a>

                </li>


                <li>

                    <a
                        href="sinhvien.html"
                        class="
                            app-navbar-link
                            ${isSinhVien ? "active" : ""}
                        ">

                        Sinh viên

                    </a>

                </li>


                <li>

                    <a
                        href="advance.html"
                        class="
                            app-navbar-link
                            ${isAdvance ? "active" : ""}
                        ">

                        Thao tác nâng cao

                    </a>

                </li>


            </ul>

        </nav>
    `;

})();