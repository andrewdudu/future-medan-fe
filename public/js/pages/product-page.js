document.title = 'Product Details'

function loadProducts(){
    try {
        const response = await api.get(`/products/${id}`,{
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })
    
        const data = response.data.data
        
        $('#book-title').innerHTML = data.name
        $('#book-writer').innerHTML = `by ${data.author}`
        $('#book-price').innerHTML = priceHtml(data.price)
        $('#book-image').innerHTML = imageHtml(data.image)
        $('#description').innerHTML = descHtml(data.description)
    }
    catch (err){
        
    }
}

function priceHtml (price) {
    return `<p style="margin: 0;color: #DF5F1D;"><strong>Rp${new Intl.NumberFormat('ID').format(price)}</strong></p>`
}

function imageHtml (imageSrc) {
    return `<img class="w-100 img-fluid" src="${imageSrc}">`
}

function descHtml (desc) {
    return `<p>${desc}</p>`
}

$(document).ready(async function () {
    loadProducts()
})