document.title = 'Profile'
validateUserToken(getCookie('access-token'), (err) => window.location.href = '/login')

async function loadProfile() {
    try {
        const response = await api.get(`/users/${id}`,{
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

        const res = api.put(`/users/${id}`, {
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