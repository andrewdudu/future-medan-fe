inputWrong = "Make sure your username or email and password correct."
somethingWrong = "Something went wrong, please try again."
passwordWrong = "Password does not match."
emailWrong = "The email you entered did not match our records. Please double-check and try again."

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

$( ".form-control" ).focus(function() {
    $(this).prev('.input-group-addon').removeClass().addClass('input-group-addon-focus');
    $(this).next('.input-group-addon').removeClass().addClass('input-group-addon-focus');
});

$( ".form-control" ).focusout(function() {
    $(this).prev('.input-group-addon-focus').removeClass().addClass('input-group-addon');
    $(this).next('.input-group-addon-focus').removeClass().addClass('input-group-addon');
});

function readMore(){
    var link = document.getElementById('link')
    var more = document.getElementById('more')

    if (more.style.display === 'none'){
        more.style.display = 'block'
        link.innerHTML = 'Read less'
    }
    else {
        more.style.display = 'none'
        link.innerHTML = 'Read more'
    }
}

$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {
        $('#back-to-top').fadeIn()
    } 
    else {
        $('#back-to-top').fadeOut()
    }
})

$('#formCheck').click( function() {
    $('input:checkbox').not(this).prop('checked', this.checked)
})

function changeIcon(){
    var icon = getElementById('checkbox')
      
    icon.classList.toggle('icon ion-android-checkbox-outline')
}

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