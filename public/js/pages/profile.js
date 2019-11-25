document.title = 'Profile'

$('#save-changes').click(async profile => {
	profile.preventDefault()

	const path = `/users/${id}`
	const url = 'http://127.0.0.1:8080/future-medan/api'
    const api = axios.create({
        baseURL: url,
        timeout: 5000
    })

    let nickname = $('#nickname').val()
    let username = $('#username').val()
    let email = $('#email').val()
    let password = $('#password').val()
    let phoneNumber = $('#phone-number').val()
    let address = $('#address').val()

    const res = api.put(path, {nickname, username, email, password, phoneNumber, address})
})