document.title = 'Profile'
validateUserToken(getCookie('access-token'), (err) => {
    validateMerchantToken(getCookie('access-token'), (err) => {
        window.location.href = '/login'
    })
})

function addImageFile() {
    var preview = document.querySelector('#avatar-image');
    var file    = document.querySelector('#avatar').files[0];
    var reader  = new FileReader();
  
    reader.addEventListener("load", function () {
        preview.src = reader.result;
        $('#add-avatar-base64').val(reader.result.substr(reader.result.indexOf(',') + 1));
    }, false);
  
    if (file) {
        reader.readAsDataURL(file);
    }
}

function loadProfile() {
    $("#edit-error-message").hide()

    $('#nickname').val(getCookie('nickname'))
    $('#username').val(getCookie('username'))
    $('#email').val(getCookie('email'))
    if (getCookie('image') !== "null") $('#avatar-image').attr('src', APP_URL + getCookie('image'))
    if (getCookie('description') !== "null") $('#description').val(getCookie('description'))
}

$('#save-changes').click(async e => {
    e.preventDefault()

    try {
        let nickname = $('#nickname').val().trim()
        let description = $('#description').val().trim()
        let image = $('#add-avatar-base64').val();

        $('#loading-animation').css('display', 'block')
        const res = await api.put(`/users`, {
                name: nickname, 
                description,
                image
            }, {
                headers: {
                    "Authorization": "Bearer " + getCookie('access-token')
                }
            })
        $('#loading-animation').css('display', 'none')

        setCookie('description', description)
        setCookie('image', res.data.data.image)
        setCookie('nickname', nickname)
    }
    catch (err) {
        $('#edit-error-message').show()
    }
})

$('#avatar').click(async function() {
    
})

$('#menu-log-out').click(() => logOut())

$(document).ready(function () {
    loadProfile()
})