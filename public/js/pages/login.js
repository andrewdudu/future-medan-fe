document.title = 'Login'

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

$(document).ready(() => {
    $(":input[required]").each(function (i, requiredInput){
        $(requiredInput).on("keyup", function (e) {
            let inputGroup = $(requiredInput).parent()
            let inputErrorMsg = inputGroup.parent()
            let lastElement = inputGroup.next()

            if ($(requiredInput).val().trim() == '') {
                if (lastElement.length == 0 && !lastElement.hasClass("invalid")){
                    inputErrorMsg.append(`<span class="invalid-${i}" style="color: red; font-size: 12px">${$(requiredInput).attr("placeholder")} can't be empty</span>`)
                    inputGroup.addClass('mb-1')
                    inputGroup.css("border", "1px solid red")
                }
                else {
                    $(`.invalid-${i}`).text(`${$(requiredInput).attr("placeholder")} can't be empty`)
                    inputGroup.addClass('mb-1')
                    inputGroup.css("border", "1px solid red")
                }
            }
            else {
                $(`.invalid-${i}`).empty()
                inputGroup.removeClass('mb-1')
                inputGroup.css("border", "1px solid #CCC")
            }
        })
    })
})