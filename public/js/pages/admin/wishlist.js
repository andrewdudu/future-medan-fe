document.title = 'Users'
size = 10
page = 0
validateAdminToken(getCookie('access-token'), (err) => window.location.href = '/admin-login')

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
        const response = await api.get(`/wishlists/paginate?size=${size}&page=${page}`, {
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
            elem.products.forEach(function(product) {
                table.append(`
                <tr>
                    <td>${elem.user.email}</td>
                    <td>${product.name}</td>
                    <td>${product.sku}</td>
                </tr>`)
            })
        })

        $('#dataTable_info').text(`Showing ${size*page + 1} to ${size * (page + 1) > totalElements ? totalElements : size * (page + 1)} of ${totalElements}`)
    } catch (err) {
    }
}

$(document).ready(async function () {
    getProductData()
})