document.title = 'Home Page'
merchant = true, user = true;
var userPromise = validateUserToken(getCookie('access-token'), (err) => {
    user = false
    $("#library").hide()
})
var merchantPromise = validateMerchantToken(getCookie('access-token'), (err) => {
    merchant = false
})

$(document).ready(async e => {
    try {
        const response = await api.get(`/products`)
        const categories = await api.get(`/categories`)
        const data = response.data.data
        
        const html = generateProductHtml(data.slice(0,3))
        $('#new-release').html(html)
        
        const categoriesHtml = generateCategoriesHtml(categories.data.data.slice(0, 8))
        $('#category-list').html(categoriesHtml)

        // Book library
        if (user) {
            try {
                const myProducts = await api.get(`/my-products`, {
                    headers: {
                        "Authorization": "Bearer " + getCookie('access-token')
                    }
                })
                const myProductsData = myProducts.data.data

                if (!$.isArray(myProductsData) ||  !myProductsData.length || myProductsData.length === 0) {
                    $('#library').hide()
                    console.log("empty")
                } else {
                    const library = generateProductHtml(myProductsData.slice(0, 3))
                    $('#user-library').html(library)
                }
            }
            catch (err) {

            }
        }
    }
    catch (err) {
        addReloadPict(".index-page")
    }
})

function generateProductHtml(list) {
    return list.map(product => {
            return `<li id="product-item">
                        <a id="product-link" href="/product?id=${product.id}">
                            <div id="product-home" class="flex-center">
                                <img id="product-image-home" src="${APP_URL}${product.image}">
                                <div id="product-details-home" class="text-left">
                                    <span id="product-name-home">${product.name}</span>
                                    <span id="product-price-home">Rp${new Intl.NumberFormat('ID').format(product.price)}</span>
                                </div>
                            </div>
                        </a>
                    </li>`
    })
}

function generateCategoriesHtml(list) {
    return list.map(category => {
        return `
            <a id="category-link" href="/product-by-categories?category=${category.id}&name=${category.name}">
                <div id="category-group" class="flex-column p-2 flex-center"><img id="category-image" src="${APP_URL}${category.image}"><span id="category-name">${category.name}</span></div>
            </a>
        `   
    })
}