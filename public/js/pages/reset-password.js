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

        if (newPassword !== retypeNewPassword) {
            addErrorMsg("reset-pass", passwordWrong)
        }
        

        const response = await api.post(path, )
    }
    catch (err) {

    }
})

$(document).ready(async () => {
    
})
