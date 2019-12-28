document.title = 'Login'

$('#login-button').click(async e => {
    e.preventDefault();

    try {
        let usernameOrEmail = $("#username-email").val();
        let password = $("#login-password").val();

        const response = await api.post(`${APP_URL}/api/login`, {
            usernameOrEmail,
            password
        })
    
        setCookie('access-token', response.data.accessToken, 1)
        
        window.location.href = "/"
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

$(document).ready(() => {
    $(":input[required]").each(function (i, requiredInput){
        $(requiredInput).on("keyup", function (e) {
            let inputGroup = $(requiredInput).parent()
            let lastElement = inputGroup.next()

            if (lastElement.length == 0 && !lastElement.hasClass("invalid")){
                inputGroup.parent().append(`<span class="invalid-${i}" style="color: red; font-size: 12px"></span>`)
            }

            if ($(requiredInput).val().trim() == '') {
                $(`.invalid-${i}`).text(`${$(requiredInput).attr("placeholder")} can't be empty`)
                inputGroup.css("border", "1px solid red")
            } 
            else {
                $(`.invalid-${i}`).empty()
                inputGroup.css("border", "1px solid #CCC")
            }
        })
    })
})

$("#show-password").click(e => {
    let passwordInput = $("#login-password");

    if (passwordInput.attr('type') == "password") {
        passwordInput.attr('type', 'text');
        $("#show-password").css("color", "#278ACB")
    }
    else {
        passwordInput.attr('type', 'password');
        $("#show-password").css("color", "#A7A7A7")
    }
})