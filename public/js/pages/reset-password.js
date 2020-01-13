document.title = 'Reset Password'
let currentPassword = ""

$('#btn-submit-pass').click(async (e) => {
    e.preventDefault()
    try {
        let newPassword = $('#input-new-password').val().trim()
        let retypeNewPassword = $('#input-retype-new-password').val().trim()

        let token = get('token')
        console.log(token)

        if (newPassword === ""  || retypeNewPassword === ""){
            addErrorMsg("reset-pass", passwordWrong)
        } else if (newPassword !== retypeNewPassword) {
            addErrorMsg("reset-pass", passwordWrong)
        } else {
            const response = await api.post("/reset-password", {
                token,
                password: newPassword
            })
            
        }

        window.location.href = "/login"
    }
    catch (err) {
        console.log(err)
    }
})

$(document).ready(async () => {
    
})
