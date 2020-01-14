document.title = "Review"
validateUserToken(getCookie('access-token'), () => window.location.href = '/login')
let productId = get('product-id')

$(document).ready(async (e) => {
    try {
        let cookie = document.cookie
        const response = await api.get(`/review/{userId}/{productId}`, cookie.user_id, productId)
        
        let rating = parseInt(response.data.rating)
        changeColor(arrOfColors[rating], rating)
        showRatingCount(arrOfColors[rating], rating)

        $("#review-content").val(response.data.comment)
        $("#submit").attr("disabled", true)
    }
    catch (err) {
        
    }

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

    try {
        const response = await api.post('/addReview', {
            productId,
            rating,
            comment
        }, {
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })
    }
    catch (err) {
        $("#rating-error").append(errorHTML("rating", "Bad request to save rating, please try again."))
    }

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