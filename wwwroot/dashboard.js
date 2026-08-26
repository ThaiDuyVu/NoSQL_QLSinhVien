const statusMessage =
    document.getElementById('status-message');


function formatNumber(value, digits = 2) {

    const number = Number(value ?? 0);

    return Number.isFinite(number)
        ? number.toLocaleString(
            'vi-VN',
            {
                maximumFractionDigits: digits
            }
        )
        : '0';
}


function setText(id, value) {

    document.getElementById(id).textContent =
        value;
}


function setBar(id, value) {

    const bar =
        document.getElementById(id);

    bar.style.width =
        `${Math.max(
            0,
            Math.min(
                100,
                Number(value) || 0
            )
        )}%`;
}


function escapeHtml(value) {

    return String(value ?? '')
        .replace(
            /[&<>'"]/g,
            character => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[character])
        );
}


async function getData(path) {

    const response =
        await fetch(
            `/api/dashboard/${path}`
        );

    if (!response.ok) {

        throw new Error(
            `Không thể tải dữ liệu từ ${path}`
        );
    }

    return response.json();
}


function renderClasses(items) {

    const body =
        document.getElementById(
            'classes-table'
        );

    if (!items.length) {

        body.innerHTML =
            `
            <tr>
                <td colspan="4" class="empty">
                    Chưa có dữ liệu
                </td>
            </tr>
            `;

        return;
    }

    body.innerHTML =
        items.map(item => `
            <tr>

                <td>
                    ${escapeHtml(item.maLop)}
                </td>

                <td>
                    ${formatNumber(
                        item.studentCount,
                        0
                    )}
                </td>

                <td>
                    ${formatNumber(
                        item.highestAverageScore
                    )}
                </td>

                <td>
                    ${formatNumber(
                        item.lowestAverageScore
                    )}
                </td>

            </tr>
        `).join('');
}


function renderTopStudents(items) {

    const body =
        document.getElementById(
            'top-students-table'
        );

    if (!items.length) {

        body.innerHTML =
            `
            <tr>
                <td colspan="5" class="empty">
                    Chưa có dữ liệu
                </td>
            </tr>
            `;

        return;
    }

    body.innerHTML =
        items.map((item, index) => `
            <tr>

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${escapeHtml(item.maSV)}
                </td>

                <td>
                    ${escapeHtml(item.hoTen)}
                </td>

                <td>
                    ${escapeHtml(item.maLop)}
                </td>

                <td>
                    ${formatNumber(
                        item.averageScore
                    )}
                </td>

            </tr>
        `).join('');
}


function renderBars(
    elementId,
    items,
    labelProperty,
    valueProperty,
    cssClass = ''
) {

    const container =
        document.getElementById(
            elementId
        );

    if (!items.length) {

        container.innerHTML =
            `
            <p class="empty">
                Chưa có dữ liệu
            </p>
            `;

        return;
    }

    const maxValue =
        Math.max(
            ...items.map(
                item =>
                    Number(
                        item[valueProperty]
                    ) || 0
            ),
            1
        );

    container.innerHTML =
        items.map(item => {

            const value =
                Number(
                    item[valueProperty]
                ) || 0;

            const width =
                Math.max(
                    2,
                    value / maxValue * 100
                );

            return `
                <div
                    class="bar-row ${cssClass}"
                >

                    <span>
                        ${escapeHtml(
                            item[labelProperty]
                        )}
                    </span>

                    <div class="bar-track">

                        <div
                            class="bar-fill"
                            style="width: ${width}%"
                        ></div>

                    </div>

                    <strong>
                        ${formatNumber(value, 0)}
                    </strong>

                </div>
            `;

        }).join('');
}


async function loadDashboard() {

    statusMessage.className = 'status';

    statusMessage.textContent =
        'Đang tải dữ liệu...';

    try {

        const [
            overview,
            classes,
            languages,
            topStudents,
            grades
        ] = await Promise.all([

            getData('overview'),

            getData('classes'),

            getData('languages'),

            getData('top-students'),

            getData('grade-distribution')

        ]);


        setText(
            'total-students',
            formatNumber(
                overview.totalStudents,
                0
            )
        );


        setText(
            'total-classes',
            formatNumber(
                overview.totalClasses,
                0
            )
        );


        setText(
            'average-score',
            formatNumber(
                overview.averageScore
            )
        );


        setText(
            'male-percentage',
            `${formatNumber(
                overview.malePercentage
            )}%`
        );


        setText(
            'female-percentage',
            `${formatNumber(
                overview.femalePercentage
            )}%`
        );


        setText(
            'male-label',
            `${formatNumber(
                overview.malePercentage
            )}%`
        );


        setText(
            'female-label',
            `${formatNumber(
                overview.femalePercentage
            )}%`
        );


        setBar(
            'male-bar',
            overview.malePercentage
        );


        setBar(
            'female-bar',
            overview.femalePercentage
        );


        renderClasses(classes);

        renderTopStudents(topStudents);

        renderBars(
            'language-chart',
            languages,
            'language',
            'studentCount',
            'language'
        );

        renderBars(
            'grade-chart',
            grades,
            'classification',
            'studentCount'
        );


        statusMessage.textContent =
            `Đã cập nhật lúc ${
                new Date().toLocaleTimeString(
                    'vi-VN'
                )
            }`;

    } catch (error) {

        statusMessage.className =
            'status error';

        statusMessage.textContent =
            `${error.message}. Hãy kiểm tra API và MongoDB đang chạy.`;
    }
}


document
    .getElementById('refresh-button')
    .addEventListener(
        'click',
        loadDashboard
    );


loadDashboard();