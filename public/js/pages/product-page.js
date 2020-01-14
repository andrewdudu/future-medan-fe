document.title = 'Product Details'
validateUserToken(getCookie('access-token'), (err) => {
    $("#btn-add-to-wishlist").hide()
})

product = null;

async function loadProducts(){
    try {
        const id = get('id')

        const response = await api.get(`/products/${id}`,{
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })
        const data = response.data.data
        product = data
        
        $('#book-title').text(data.name)
        $('#book-name').text(data.name)
        $('#book-sku').text(data.sku)
        $('#book-variant').text(data.variant)
        $('#book-author').text(data.author)
        $('#book-title-author').text(data.author)
        $('#book-image').attr('src', `${APP_URL}${data.image}`)
        $('#book-merchant').text(data.merchant.name)
        $('#book-writer').append(`by ${data.author}`)
        $('#book-price').text(priceHtml(data.price))
        $('#book-image').append(imageHtml(data.image))
        $('#book-price').text(priceHtml(data.price))
        $('#description').append(descHtml(data.description))

        const reviewResponse = await api.get(`/review/${id}`, {
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })
        const reviewData = reviewResponse.data.data;

        let reviewDiv = $('#reviews')

        reviewData.forEach(review => {
            let star = "";

            for (let i = 0; i < 5; i++) {
                if (i < review.rating) star += `<img style="width:20px" src="assets/img/star.svg">`
                else star += `<img style="width:20px" src="assets/img/star-empty.svg">`
            }

            reviewDiv.append(`
            <div class="reviews">
                <div class="review-item" style="margin-bottom: 0px">
                    <div>
                        ${star}
                    </div>
                    <span class="text-muted">
                        <a href="#">${review.user.name}</a>
                    </span>
                    <p>${review.comment}</p>
                </div>
            </div>
            `)
        })
    } catch (err) {
    }
}

async function onPurchaseNowClicked() {
    setCookie('selected-product', [get('id')], 1);
    setCookie('total-price', product.price, 1)

    try {
        await api.post('/carts', {
            product_id: get('id')
        }, {
            headers: {
                "Authorization": "Bearer " + getCookie('access-token')
            }
        })
    } catch (err) {
        
    }
    window.location.href = '/payment';
}

async function onAddToCartClicked() {
    try {
        let response = await api.post('/carts', {
            product_id: get('id')
        }, {
            headers: {
                "Authorization": "Bearer " + getCookie('access-token')
            }
        })

        Notify('Added to cart', null, null, 'info')
    } catch (err) {
        if (err.response.status === 401) window.location.href = '/login';
    }
}

async function onWishlistButtonClicked() {
    try {
        let response = await api.post('/wishlists', {
            product_id: get('id')
        }, {
            headers: {
                "Authorization": "Bearer " + getCookie('access-token')
            }
        })

        Notify('Added to wishlist', null, null, 'info')
    } catch (err) {
    }
}

function priceHtml (price) {
    return `Rp ${new Intl.NumberFormat('ID').format(price)}.00`
}

function imageHtml (imageSrc) {
    return `<img class="w-100 img-fluid" src="${imageSrc}">`
}

function descHtml (desc) {
    return `<p>${desc}</p>`
}

$(document).ready(() => {
    loadProducts()
})