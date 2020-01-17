$(document).ready(() => {
    let arrOfColors = ['', '#DF5F1D', '#DFB81D', '#D2DF1D', '#1DDF78', '#1DB1DF']

    $('.rating').click((event) => {
        var id = parseInt($(event.target).attr('id').substring(5), 10);
        changeColor(arrOfColors[id], id)

        showRatingCount(arrOfColors[id], id)
    })
});

$('#submit').click(async () => {
    let rating = $('#rating-count').text()[0]
    let comment = $('#review-content').val().trim()

    if (!(rating >= 1 && rating <= 5)) {
        $("#rating-error").append(errorHTML("rating", "You haven't rate"))
        return
    }

    const response = await api.post('/review', {
            rating,
            comment
        }, {
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })

    window.location.href = '/book-library'
})

$('#cancel').click(() => goBack())

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