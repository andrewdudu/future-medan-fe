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
  
window.onscroll = function() {
    if (document.documentElement.scrollTop > 20) {
        $('#back-to-top').css("display", "block");
    }
    else {
        $('#back-to-top').css("display", "block");
    }
    // console.log(document.documentElement.scrollTop)
};

function topFunction() {
  document.documentElement.scrollTop = 0;
}

$('#formCheck').click( function() {
    $('input:checkbox').not(this).prop('checked', this.checked)
})

function changeIcon(){
    var icon = getElementById('checkbox')
      
    icon.classList.toggle('icon ion-android-checkbox-outline')
}

function addEmptyPict(id, src) {
    $(`#${id}`).empty()

    let pageName = id.replace('-', ' ')
    $(`#${id}`).html(alternativeHTML(src, `Your ${pageName} is Empty!`))
}

// <div class="row h-75 flex-lg-row">
//     <div class="col-sm-12 my-auto">
//         <img class="w-75 h-100 mx-auto d-block" src="${src}" style="max-width: 600px;">
//         <p class="text-center" style="color: #278ACB;font-family: 'Montserrat Alternates', sans-serif;font-size: 20px;">
//             Your ${pageName} is Empty!
//         </p>
//     </div>
// </div>

function addReloadPict(id){
    $(`${id}`).empty()
    $(`${id}`).append(alternativeHTML("assets/img/illustration/refresh.png", "Oops! Something went wrong. Please reload this page"))
}

function alternativeHTML(src, message) {
    return `<div id="empty" class="flex-center justify-content-center flex-column w-100 h-100 centered" >
                <img class="w-100 mt-5" src="${src}" style="max-width: 600px;">
                <p class="text-center mt-3" style="color: #278ACB;font-family: 'Montserrat Alternates', sans-serif;font-size: 20px;">
                    ${message}
                </p>
            </div>`
}