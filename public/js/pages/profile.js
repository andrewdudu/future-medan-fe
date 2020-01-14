document.title = 'Profile'
validateUserToken(getCookie('access-token'), (err) => {
    validateMerchantToken(getCookie('access-token'), (err) => {
        window.location.href = '/login'
    })
})

function loadProfile() {
    $("#edit-error-message").hide()

    $('#nickname').val(getCookie('nickname'))
    $('#username').val(getCookie('username'))
    $('#email').val(getCookie('email'))
}

$('#save-changes').click(async profile => {
    try {
        let nickname = $('#nickname').val().trim()
        let description = $('#description').val().trim()

        const res = await api.put(`/users`, {
                name: nickname, 
                description
            }, {
                headers: {
                    "Authorization": "Bearer " + getCookie('access-token')
                }
            })
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