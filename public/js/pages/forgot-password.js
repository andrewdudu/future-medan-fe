$("#forgot-pass-error-message").hide();
document.title = 'Forgot Password'

$('#btn-send-email').click(async email => {
    email.preventDefault();

    const api = axios.create({
        baseURL: "http://127.0.0.1:8080/future-medan/api",
        timeout: 5000
    })

    try {
        let email = $('#email').val()
        let path = '' // path for forgot password

        const response = await api.post(path, email)

        startTime(30000)
        window.location.href = "/";
    }
    catch (err) {
        $("#forgot-pass-error-message").show();
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