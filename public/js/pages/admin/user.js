document.title = 'Users'
size = 10
page = 0
validateAdminToken(getCookie('access-token'), (err) => window.location.href = "/admin-login")

async function onButtonClick(id) {
    try {
        const response = await api.post(`/users/${id}`, {}, {
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        });

        if ($(`#${id}`).hasClass('btn-danger')) {
            $(`#${id}`).removeClass('btn-danger');
            $(`#${id}`).addClass('btn-primary');
            $(`#${id}`).text('Unblock');
            $(`#${id}-status`).text(response.data.data.status);
        } else {
            $(`#${id}`).removeClass('btn-primary');
            $(`#${id}`).addClass('btn-danger');
            $(`#${id}`).text('Block');
            $(`#${id}-status`).text(response.data.data.status);
        }
    } catch (err) {
    }

}

$("#show-user").change(function() {
    size = $(this).val()
    getCategoriesData()
})

function changePage(index) {
    page = parseInt(index)
    getCategoriesData()
}

async function getCategoriesData() {
    try {
        const response = await api.get(`/users/paginate?size=${size}&page=${page}`, {
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
                <td>${elem.name}</td>
                <td>${elem.email}</td>
                <td>${elem.username}</td>
                <td id="${elem.id}-status">${elem.status}</td>
                <td>
                    <button id="${elem.id}" onclick="onButtonClick('${elem.id}')" type="button" class="btn btn-${elem.status == true ? 'danger' : 'primary'}" data-target="#deleteModal">
                        ${elem.status == true ? 'Block' : 'Unblock'}
                    </button>
                </td>
            </tr>`)
        })

        $('#dataTable_info').text(`Showing ${size*page + 1} to ${size * (page + 1) > totalElements ? totalElements : size * (page + 1)} of ${totalElements}`)
    } catch (err) {
    }
}

$(document).ready(async function () {
    // try {
    //     const response = await api.get('/users', {
    //         headers: {
    //             "Authorization": "Bearer " + getCookie("access-token")
    //         }
    //     })

        // let table = $("#dataTable tbody")
        // response.data.data.forEach(function(elem) {
        //     table.append(`
        //     <tr>
        //         <td>${elem.name}</td>
        //         <td>${elem.email}</td>
        //         <td>${elem.username}</td>
        //         <td id="${elem.id}-status">${elem.status}</td>
        //         <td>
        //             <button id="${elem.id}" onclick="onButtonClick('${elem.id}')" type="button" class="btn btn-${elem.status == true ? 'danger' : 'primary'}" data-target="#deleteModal">
        //                 ${elem.status == true ? 'Block' : 'Unblock'}
        //             </button>
        //         </td>
        //     </tr>`)
        // })
    // } catch (err) {
        
    // }
    getCategoriesData()
})