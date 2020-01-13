document.title = "Products"

$(document).ready(async e => {
    try {
        let categoryId = get('category')
        let categoryName = get('name')

        let response

        if (categoryId !== undefined) {
            response = await api.get(`/products/category/${categoryId}`)
            $('#title').text(categoryName ? categoryName : '')
        }
        else {
            response = await api.get(`/products`)
            $('#title').text('All Products')
        }
        const data = response.data.data

        if (!$.isArray(data) ||  !data.length) {
            addEmptyPict("all-categories", "assets/img/illustration/empty.png")
            console.log("empty")
        } else {
            const html = generateProductHTML(data)
            $('#empty-image').hide()
            $("#all-categories").removeClass("bg-white")
            $("#products-by-category").html(html)
            console.log("fill")
        }
    }
    catch (err){
    }
})

function generateProductHTML(products) {
    return products.map(product => {
        return `
            <a id="product-link" href="/product?id=${product.id}" style="background-color: white!important;">
                <div id="product-home"><img id="product-image-home" src="${APP_URL}${product.image}">
                    <div id="product-details-home"><span id="product-name-home">${product.name}</span><span id="product-price-home">Rp ${new Intl.NumberFormat('ID').format(product.price)}</span></div>
                </div>
            </a>`
    })
}