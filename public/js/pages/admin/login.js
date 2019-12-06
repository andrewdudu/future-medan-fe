// $("#login-error-message").hide();
document.title = 'Login'

$('#admin-login-button').click(async e => {
    e.preventDefault();
    
    // $("#login-error-message").hide();

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
            addErrorMsg()
        } else {
            setCookie("access-token", response.data.accessToken, 1);
    
            window.location.href = "/admin";
        }
    } catch (err) {
        console.log(err);
        addErrorMsg()
    }
})

function addErrorMsg() {
    $("#login-error").append(`<div id="login-error-message" class="alert alert-danger alert-dismissible fade show">
                                <strong>Error!</strong> Make sure your username or email and password correct.
                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                              </div>`)
}