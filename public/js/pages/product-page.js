document.title = 'Product Details'
validateUserToken(getCookie('access-token'), (err) => {
    $("#btn-add-to-wishlist").hide()
})

async function loadProducts(){
    try {
        const id = get('id')

        const response = await api.get(`/products/${id}`,{
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })
        const data = response.data.data
        
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
        $('#description').append(descHtml(data.description))
    } catch (err) {
        console.log(err)
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