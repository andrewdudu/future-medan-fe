document.title = 'Forgot Password'

$('#btn-send-email').click(async e => {
    e.preventDefault();

    let email = $('#email').val()

    api.post(`${APP_URL}/api/forgot-password`, {email}).catch(err => {
        addErrorMsg("forgot-pass", emailWrong)
        $("#forgot-pass-error").show();
    })

    startTime(30000)

    $('#p-info-reset').text("A confirmation email has been sent to your email account. Click the link to reset your password.")
})

function startTime(second) {
    var btnText = 'RE-SEND VERIFICATION EMAIL'
    var disabled = false

    if (second > 0) {
        btnText += ` IN (${second/1000} second)`
        setTimeout(function(){ startTime(second-1000) }, 1000)
        disabled = true
    }

    $('#btn-send-email').html(btnText)
    $('#btn-send-email').prop('disabled', disabled);
}