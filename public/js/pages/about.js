document.title = 'About'

let msg = " can't be empty"

$(document).ready(() => {
    $(":input[required]").each(function (i, requiredInput){
        $(requiredInput).on("keyup", function (e) {
            let errorMsg = $(requiredInput).next()
            let input = $(requiredInput).val().trim()

            if (input == '') {
                $(requiredInput).addClass('is-invalid')
                errorMsg.text($(requiredInput).attr('name') + msg)
                errorMsg.show()
            } 
            else if ($(requiredInput).attr('name') === 'Email') {
                if (emailRegrex.test(input)) {
                    $(requiredInput).removeClass('is-invalid')
                    $(requiredInput).addClass('is-valid')
                    errorMsg.hide()    
                }
                else {
                    $(requiredInput).addClass('is-invalid')
                    errorMsg.text($(requiredInput).attr('name') + " format is invalid")
                    errorMsg.show()
                }
            }
            else {
                $(requiredInput).removeClass('is-invalid')
                $(requiredInput).addClass('is-valid')
                errorMsg.hide()
            }
        })
    })
})

$('#btn-send-Q').click(() => {
    
})