document.title = 'Reset Password'
let currentPassword = ""

$('#btn-submit-pass').click(async () => {
    try {
        let path = '/reset-password'
        let newPassword = $('#input-new-password').val().trim()
        let retypeNewPassword = $('#input-retype-new-password').val().trim()

        if (newPassword === ""  || retypeNewPassword === ""){
            addErrorMsg("reset-pass", passwordWrong)
        }

        else if (newPassword !== retypeNewPassword) {
            addErrorMsg("reset-pass", passwordWrong)
        }
        else {
            const response = await api.post(path, newPassword)
            
        }

        window.location.href = "/login"
    }
    catch (err) {

    }
})

$(document).ready(async () => {
    
})
