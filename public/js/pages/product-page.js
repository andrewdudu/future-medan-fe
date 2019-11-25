document.title = 'Product Details'

function getCasts(){
    const idPath = `/products/${id}`
    const ratingPath = ''
    const url = `http://127.0.0.1:8080/future-medan/api`

    const api = axios.create({
        baseURL: url,
        timeout: 5000
    })

    const data = api.get(idPath, {id}).data
    
    $('#book-title').innerHTML = data.name
    $('#book-writer').innerHTML = `by ${data.author}`
    $('#book-price').innerHTML = priceHtml(data.price)
    $('#book-image').innerHTML = imageHtml(data.image)
    $('#description').innerHTML = descHtml(data.description)
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

getCasts()