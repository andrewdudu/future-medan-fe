document.title = 'Users'
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

$(document).ready(async function () {
    try {
        const response = await api.get('/products', {
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })

        let table = $("#dataTable tbody")
        response.data.data.forEach(function(elem) {
            table.append(`
            <tr>
                <td><img class="rounded-circle mr-2" width="30" height="30" src="${APP_URL}${elem.image}">${elem.name}</td>
                <td>${elem.sku}</td>
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
    } catch (err) {
        
    }
})