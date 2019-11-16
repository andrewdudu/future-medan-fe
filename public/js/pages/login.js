$("#login-error-message").hide();
$("#signup-error-message").hide();
document.title = 'Login'

$('#login-button').click(async e => {
    e.preventDefault();

    const api = axios.create({
        baseURL: 'http://127.0.0.1:8080/future-medan/api',
        timeout: 5000
    })

    try {
        let usernameOrEmail = $("#username-email").val();
        let password = $("#login-password").val();

        const response = await api.post('/login', {
            usernameOrEmail,
            password
        })
    
        appState = response.data.accessToken;

        window.location.href = "/";
    } catch (err) {
        $("#login-error-message").show();
    }
})

$("#register-button").click(async e => {
    e.preventDefault();

    const api = axios.create({
        baseURL: "http://127.0.0.1:8080/future-medan/api",
        timeout: 5000
    })

    let username = $("#username").val();
    let password = $("#password").val();
    let confirmPassword = $("#confirmpassword").val();
    let name = $("#nickname").val();
    let email = $("#email").val();
    let radio = $("input[type='radio']:checked").val();

    if (password !== confirmPassword) {
        $("#signup-error-message").append(`
            <div id="signup-error-message" class="alert alert-danger alert-dismissible fade show">
                <strong>Error!</strong> 
                <span id="signup-error-message-span">Password does not match.</span>
                <button type="button" class="close" data-dismiss="alert">&times;</button>
            </div>`)
        $("#signup-error-message").show();
    } else {

        try {
            let path = "/user/register";
    
            if (radio === "merchant") path = "/merchant/register"; 
            
    
            const response = await api.post(path, {
                username,
                email,
                password,
                name
            })
    
            console.log(response)
            window.location.href = "/login";
        } catch (err) {
            console.log(err.response);
            if (err.response === undefined) {
                $("#signup-error-message").append(`
                <div id="signup-error-message" class="alert alert-danger alert-dismissible fade show">
                    <strong>Error!</strong> 
                    <span id="signup-error-message-span">Something went wrong, please try again.</span>
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                </div>`)
            } else {
                let errors = err.response.data.success ? err.response.data.message : err.response.data.errors;
                let message = "";
        
                $("#signup-error-message").empty();
                if (Array.isArray(errors)) {
                    errors.forEach(errMessage => {
                        let el = `
                        <div id="signup-error-message" class="alert alert-danger alert-dismissible fade show">
                            <strong>Error!</strong> 
                            <span id="signup-error-message-span">${errMessage.field} ${errMessage.defaultMessage}</span>
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                        </div>`
                        $("#signup-error-message").append(el);
                    })
                } else if (err.response.data.message) {
                    $("#signup-error-message").append(`
                    <div id="signup-error-message" class="alert alert-danger alert-dismissible fade show">
                        <strong>Error!</strong> 
                        <span id="signup-error-message-span">${err.response.data.message}</span>
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                    </div>`)
                } else {
                    $("#signup-error-message").append(`
                    <div id="signup-error-message" class="alert alert-danger alert-dismissible fade show">
                        <strong>Error!</strong> 
                        <span id="signup-error-message-span">Something went wrong, please try again.</span>
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                    </div>`)
                }
            }
            
            $("#signup-error-message").show();
        }

    }
})

$("#show-password").click(e => {
    let passwordInput = $("#login-password");
    if (passwordInput.attr('type') == "password") {
        passwordInput.attr('type', 'text');
    } else {
        passwordInput.attr('type', 'password');
    }
})