document.title = 'Profile'
validateUserToken(getCookie('access-token'), (err) => window.location.href = '/login')

function loadProfile() {
    $("#edit-error-message").hide()

    $('#nickname').val(getCookie('nickname'))
    $('#username').val(getCookie('username'))
    $('#email').val(getCookie('email'))
}

$('#save-changes').click(async profile => {
    try {
        let nickname = $('#nickname').val().trim()
        let username = $('#username').val().trim()

        const res = await api.put(`/users/${id}`, {
                name: nickname, 
                username
            })
    }
    catch (err) {
        $('#edit-error-message').show()
    }
})

$('#avatar').click(async function() {
    
})

$(document).ready(function () {
    loadProfile()
})

$('#menu-log-out').click(() => logOut())