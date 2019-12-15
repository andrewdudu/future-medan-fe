document.title = 'Book Library'
validateUserToken(getCookie('access-token'), (err) => window.location.href = '/login')

$(document).ready(async () => {
    const path = ''

    const data = await api.get(path).data
    
    if (!$.isArray(data) ||  !data.length ) {
        addEmptyPict("book-library", "assets/img/illustration/books.png")
    }

    else {
        const html = generateProductHTML(productInCart)
        $("#book-library").append(html)
    }
})

function generateProductHTML(list) {
    list.map(i => {
        return `<a id="product-link" href="#" style="background-color: white!important;">
                    <div id="product-home">
                        <img id="product-image-home" src="${i.image}">
                        <div id="product-details-home">
                            <span id="product-name-home">${i.name}</span>
                            <span id="product-price-home">${new Intl.NumberFormat('ID').format(i.price)}</span>
                        </div>
                    </div>
                </a>`
    })
}