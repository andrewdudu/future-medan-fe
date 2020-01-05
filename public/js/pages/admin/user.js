document.title = 'Users'
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

$(document).ready(async function () {
    try {
        const response = await api.get('/users', {
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })

        let table = $("#dataTable tbody")
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
    } catch (err) {
        
    }
})