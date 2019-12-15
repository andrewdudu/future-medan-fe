document.title = 'Forgot Password'

$('#btn-send-email').click(async email => {
    email.preventDefault();

    try {
        let email = $('#email').val()

        const response = await api.post(`${APP_URL}/api/forgot-password`, email)

        startTime(30000)

        $('#p-info-reset').text("A confirmation email has been sent to your email account. Click the link to reset your password.")
    }
    catch (err) {
        addErrorMsg("forgot-pass", emailWrong)
        $("#forgot-pass-error").show();
    }
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