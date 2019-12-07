document.title = 'Login'

$('#admin-login-button').click(async e => {
    e.preventDefault();

    let usernameOrEmail = $('#usernameOrEmail').val();
    let password = $('#password').val();

    try {
        const response = await api.post('/login', {
            usernameOrEmail,
            password
        })
        let skip = false;
        response.data.roles.forEach(elem => skip = skip || (elem.authority == 'ROLE_ADMIN'));
        if (!skip) {
            addErrorMsg("login", inputWrong)
            $("#login-error").show()
        }
        else {
            setCookie("access-token", response.data.accessToken, 1);
    
            window.location.href = "/admin";
        }
    }
    catch (err) {
        addErrorMsg("login", inputWrong)
        $("#login-error").show()
    }
})