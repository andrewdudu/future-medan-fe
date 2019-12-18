document.title = 'Profile'
validateUserToken(getCookie('access-token'), (err) => window.location.href = '/login')

async function loadProfile() {
    try {
        $("#edit-error-message").hide()

        const response = await api.get(`${APP_URL}/api/users`,{
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })

        const data = response.data.data
        $('#nickname').val(data.name)
        $('#username').val(data.username)
        $('#email').val(data.email)
        $('#phone-number').val(data.phoneNumber)
        $('#address').val(data.address)
    }
    catch (err) {

    }
}

$('#save-changes').click(async profile => {
    try {
        let nickname = $('#nickname').val()
        let username = $('#username').val()
        let phoneNumber = $('#phone-number').val()
        let address = $('#address').val()

        const res = await api.put(`/users/${id}`, {
                nickname, 
                username,
                phoneNumber, 
                address
            })

    }
    catch (err) {
        $('#edit-error-message').show()
    }
})

$('#avatar').click(async function() {
    
})

$(document).ready(async function () {
    loadProfile()
})