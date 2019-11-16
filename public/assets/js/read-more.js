function readMore(){
    var link = document.getElementById('link')
    var more = document.getElementById('more')
    
    if (more.style.display === 'none'){
        more.style.display = 'inline'
        link.innerHTML = 'Read less'
    }
    else {
        more.style.display = 'none'
        link.innerHTML = 'Read more'
    }
}