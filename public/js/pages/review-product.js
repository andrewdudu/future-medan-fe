document.title = "Review"
validateUserToken(getCookie('access-token'), () => window.location.href = '/login')
let productId = get('product-id')

let arrOfColors = ['', '#DF5F1D', '#DFB81D', '#D2DF1D', '#1DDF78', '#1DB1DF']

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

$(document).ready(async (e) => {
    try {
        const response = await api.get(`/my-review/${productId}`, {
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })
        
        let data = response.data.data

        if (data != null) {
            let rating = parseInt(data.rating)

            changeColor(arrOfColors[rating], rating)
            showRatingCount(arrOfColors[rating], rating)

            $("#review-content").html(data.comment.toString())
            $("#submit").attr("disabled", true)
        }
    }
    catch (err) {
        
    }

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
        const response = await api.post('/review', {
            productId,
            rating,
            comment
        }, {
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })

        window.location.href = '/book-library'
    }
    catch (err) {
        $("#rating-error").append(errorHTML("rating", "Bad request to save rating, please try again."))
    }
})

$('#cancel').click(() => goBack())