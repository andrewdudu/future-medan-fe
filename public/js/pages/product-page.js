document.title = 'Product Details'
validateUserToken(getCookie('access-token'), (err) => $("#btn-add-to-wishlist").hide())

async function loadProducts(){
    try {
        const response = await api.get(`/products/${id}`,{
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })
    
        const data = response.data.data
        
        $('#book-title').append(data.name)
        $('#book-writer').append(`by ${data.author}`)
        $('#book-price').append(priceHtml(data.price))
        $('#book-image').append(imageHtml(data.image))
        $('#description').append(descHtml(data.description))
    }
    catch (err){
        
    }
}

function priceHtml (price) {
    return `<p style="margin: 0;color: #DF5F1D;">
                <strong>Rp${new Intl.NumberFormat('ID').format(price)}</strong>
            </p>`
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