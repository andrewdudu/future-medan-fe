document.title = 'Login'
let inputWrong = "Make sure your username or email and password correct."
let somethingWrong = "Something went wrong, please try again."
let passwordWrong = "Password does not match."

$('#login-button').click(async e => {
    e.preventDefault();

    try {
        let usernameOrEmail = $("#username-email").val();
        let password = $("#login-password").val();

        const response = await api.post('/login', {
            usernameOrEmail,
            password
        })
    
        appState = response.data.accessToken;

        window.location.href = "/";
    }
    catch (err) {
        addErrorMsg("login", inputWrong);
        $("#login-error").show();
    }
})

$("#register-button").click(async e => {
    e.preventDefault();

    let username = $("#username").val();
    let password = $("#password").val();
    let confirmPassword = $("#confirmpassword").val();
    let name = $("#nickname").val();
    let email = $("#email").val();
    let radio = $("input[type='radio']:checked").val();

    if (password !== confirmPassword) {
        addErrorMsg("signup", passwordWrong)
        $("#signup-error").show();
    }
    else {
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
        }
        catch (err) {
            console.log(err.response)

            if (err.response === undefined) {
                addErrorMsg("signup", somethingWrong)
            }
            else {
                let errors = err.response.data.success ? err.response.data.message : err.response.data.errors;
                let message = "";
        
                $("#signup-error").empty();
                if (Array.isArray(errors)) {
                    errors.forEach(errMessage => {
                        $("#signup-error").append(errorHTML("signup", `${errMessage.field} ${errMessage.defaultMessage}`));
                    })
                }
                else if (err.response.data.message) {
                    $("#signup-error").append(errorHTML("signup", err.response.data.message))
                }
                else {
                    $("#signup-error").append(errorHTML("signup", somethingWrong))
                }
            }
            
            $("#signup-error").show();
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

function addErrorMsg(event, msg) {
    $(`#${event}-error`).empty()
    $(`#${event}-error`).append(errorHTML(event, msg))
}

function errorHTML(event, msg) {
    return `<div id="${event}-error-message" class="alert alert-danger alert-dismissible fade show">
                <strong>Error!</strong>
                <span id="${event}-error-message-span">${msg}</span>
                <button type="button" class="close" data-dismiss="alert">&times;</button>
            </div>`
}