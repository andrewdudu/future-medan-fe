document.title = 'Categories'
$('#add-error-message').hide()
size = 10
page = 0
validateAdminToken(getCookie('access-token'), (err) => window.location.href = '/admin-login')

function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

async function addNewSubmitButton() {
    try {
        let name = $('#add-name').val()
        let description = $('#add-description').val()
        let image = $('#add-image-base64').val()

        const response = await api.post('/categories', {
            name,
            description,
            image
        }, {
            headers: {
                "Authorization": "Bearer " + getCookie('access-token')
            }
        })

        let table = $("#dataTable tbody")
        let elem = response.data.data;
        table.append(`
            <tr>
                <td><img id="image-${elem.id}" class="rounded-circle mr-2" width="30" height="30" src="${APP_URL}${elem.image}"><span id="name-${elem.id}">${elem.name}</td>
                <td id="description-${elem.id}">${elem.description}</td>
                <td id="hidden-${elem.id}">${elem.hidden}</td>
                <td>
                    <button onclick="setEditFormValue('${elem.id}')" id="${elem.id}" type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal">
                        Edit
                    </button>
                    <button id="hide-${elem.id}" onclick="hideCategory('${elem.id}')" id="${elem.id}" type="button" class="btn btn-${!elem.hidden ? 'danger' : 'primary'}" data-toggle="modal">
                        ${!elem.hidden ? 'Hide' : 'Unhide'}
                    </button>
                </td>
            </tr>`)

        $('#addModal').modal('hide')
    } catch (err) {

    }
}

async function hideCategory(id) {
    try {
        const response = await api.post(`/categories/hide/${id}`, {}, {
            headers: {
                "Authorization": "Bearer " + getCookie('access-token')
            }
        })

        if ($(`#hide-${id}`).hasClass('btn-danger')) {
            $(`#hide-${id}`).removeClass('btn-danger');
            $(`#hide-${id}`).addClass('btn-primary');
            $(`#hide-${id}`).text('Unhide');
            $(`#hidden-${id}`).text(response.data.data.hidden)
        } else {
            $(`#hide-${id}`).removeClass('btn-primary');
            $(`#hide-${id}`).addClass('btn-danger');
            $(`#hide-${id}`).text('Hide');
            $(`#hidden-${id}`).text(response.data.data.hidden)
        }
    } catch (err) {

    }
}

function setEditFormValue(id) {
    $('#hidden-id').val(id)
    $('#name').val($(`#name-${id}`).text())
    $('#description').val($(`#description-${id}`).text())
    toDataUrl($('#image-' + id).attr('src'), function(myBase64) {
        $('#image-base64').val(myBase64.substr(myBase64.indexOf(',') + 1))
    });

    $('#edit-error-message').hide()
}

function addImageFile() {
    var preview = document.querySelector('img');
    var file    = document.querySelector('#add-image-file').files[0];
    var reader  = new FileReader();
  
    reader.addEventListener("load", function () {
      preview.src = reader.result;
      $('#add-image-base64').val(reader.result.substr(reader.result.indexOf(',') + 1));
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
}

function previewFile() {
    var preview = document.querySelector('img');
    var file    = document.querySelector('#image-file').files[0];
    var reader  = new FileReader();
  
    reader.addEventListener("load", function () {
      preview.src = reader.result;
      $('#image-base64').val(reader.result.substr(reader.result.indexOf(',') + 1));
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
}

async function submitButton() {
    let id = $('#hidden-id').val()
    let name = $('#name').val()
    let description = $('#description').val()
    let image = $('#image-base64').val()
    let hidden = $('#hidden-' + id).text()
    
    try {
        const response = await api.put(`/categories/${id}`, {
            name,
            description,
            image,
            hidden
        }, {
            headers: {
                "Authorization": "Bearer " + getCookie('access-token')
            }
        })

        $('#name-' + id).text(response.data.data.name)
        $('#description-' + id).text(response.data.data.description)
        $('#image-' + id).attr('src', APP_URL + response.data.data.image)
        $('#editModal').modal('hide')
    } catch (err) {
        $('#edit-error-message').show()
    }

}

$("#show-category").change(function() {
    size = $(this).val()
    getCategoriesData()
})

function changePage(index) {
    page = parseInt(index)
    getCategoriesData()
}

async function getCategoriesData() {
    try {
        const response = await api.get(`/categories/paginate?size=${size}&page=${page}`, {
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
                <td><img id="image-${elem.id}" class="rounded-circle mr-2" width="30" height="30" src="${APP_URL}${elem.image}"><span id="name-${elem.id}">${elem.name}</td>
                <td id="description-${elem.id}">${elem.description}</td>
                <td id="hidden-${elem.id}">${elem.hidden}</td>
                <td>
                    <button onclick="setEditFormValue('${elem.id}')" id="${elem.id}" type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal">
                        Edit
                    </button>
                    <button id="hide-${elem.id}" onclick="hideCategory('${elem.id}')" id="${elem.id}" type="button" class="btn btn-${!elem.hidden ? 'danger' : 'primary'}" data-toggle="modal">
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
    getCategoriesData()
})