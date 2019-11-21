$("#login-error-message").hide();
document.title = 'Login'

$('#admin-login-button').click(async e => {
    e.preventDefault();
    
    $("#login-error-message").hide();

    let usernameOrEmail = $('#usernameOrEmail').val();
    let password = $('#password').val();

    const api = axios.create({
        baseURL: 'http://127.0.0.1:8080/future-medan/api',
        timeout: 5000
    })

    try {
        const response = await api.post('/login', {
            usernameOrEmail,
            password
        })
        let skip = false;
        response.data.roles.forEach(elem => skip = skip || (elem.authority == 'ROLE_ADMIN'));
        if (!skip) {
            $("#login-error-message").show();
        } else {
            appState = response.data.accessToken;
    
            window.location.href = "/admin";
        }
    } catch (err) {
        $("#login-error-message").show();
    }
})