$(document).ready(() => {
    let arrOfColors = ['', '#DF5F1D', '#DFB81D', '#D2DF1D', '#1DDF78', '#1DB1DF']

    $('.rating').click((event) => {
        var id = parseInt($(event.target).attr('id').substring(5), 10);
        changeColor(arrOfColors[id], id)

        showRatingCount(arrOfColors[id], id)
    })
});

function changeColor(color, index) {
    let colorDefault = '#BBBBBB'
    let k = 1

    $('.rating').each(function(i) {
        if (k++ <= index) {
            this.style.color = color;
        } else {
            this.style.color = colorDefault;
        }
    });
}

function showRatingCount(color, index){
    let ratingInfo = ['Bad', 'Poor', 'Average', 'Great', 'Excellent']

    let span = document.createElement('span')
    span.innerHTML = ratingInfo[index-1]
    span.style.color = color

    $('#rating-count').html(index + ' Star' + (index > 1? 's':'') + ' : ')
    $('#rating-count').append(span)
    $('#rating-count').show()
}