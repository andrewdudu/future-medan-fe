document.title = 'Users'
size = 10
page = 0
validateAdminToken(getCookie('access-token'), (err) => window.location.href = '/admin-login')

async function onButtonClick(id) {
    try {
        const response = await api.post(`/products/hide/${id}`, {}, {
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        });

        if ($(`#${id}`).hasClass('btn-danger')) {
            $(`#${id}`).removeClass('btn-danger');
            $(`#${id}`).addClass('btn-primary');
            $(`#${id}`).text('Unhide');
        } else {
            $(`#${id}`).removeClass('btn-primary');
            $(`#${id}`).addClass('btn-danger');
            $(`#${id}`).text('Hide');
        }
    } catch (err) {
    }
}

$("#show-product").change(function() {
    size = $(this).val()
    getProductData()
})

function changePage(index) {
    page = parseInt(index)
    getProductData()
}

async function getProductData() {
    try {
        const response = await api.get(`/products/paginate?size=${size}&page=${page}`, {
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })
        
        let pagination = $("#pagination")
        let totalPages = response.data.total_pages
        let totalElements = response.data.total_elements
        pagination.empty()
        pagination.append(`
            <li class="page-item ${page == 0 ? 'disabled' : ''}">
                <a class="page-link" onclick="changePage('${page-1}')" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                </a>
            </li>
        `)
        for (let i = 0; i < totalPages; i++) {
            pagination.append(`
                <li class="page-item ${i == page ? 'active' : ''}">
                    <a class="page-link" onclick="changePage('${i}')">${i+1}</a>
                </li>
            `)
        }
        pagination.append(`
            <li class="page-item ${page >= totalPages-1 ? 'disabled' : ''}">
                <a class="page-link" onclick="changePage('${page+1}')" aria-label="Next">
                    <span aria-hidden="true">»</span>
                </a>
            </li>
        `)

        let table = $("#dataTable tbody")
        table.empty()
        response.data.data.forEach(function(elem) {
            table.append(`
            <tr>
                <td><img class="rounded-circle mr-2" width="30" height="30" src="${APP_URL}${elem.image}">${elem.name}</td>
                <td>${elem.sku}</td>
                <td>${elem.variant}</td>
                <td>${elem.description}</td>
                <td>${elem.price}</td>
                <td>${elem.pdf}</td>
                <td>
                    <button id="${elem.id}" onclick="onButtonClick('${elem.id}')" type="button" class="btn btn-${!elem.hidden ? 'danger' : 'primary'}" data-target="#deleteModal">
                        ${!elem.hidden ? 'Hide' : 'Unhide'}
                    </button>
                </td>
            </tr>`)
        })

        $('#dataTable_info').text(`Showing ${size*page + 1} to ${size * (page + 1) > totalElements ? totalElements : size * (page + 1)} of ${totalElements}`)
    } catch (err) {
    }
}

$(document).ready(async function () {
    getProductData()
})