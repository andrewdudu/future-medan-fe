document.title = 'Cart'
validateUserToken(getCookie('access-token'), (err) => window.location.href = '/login')

async function loadUserCart(){
    const CART_BY_USER_ID = `/carts/${user_id}`
    const PRODUCTS = `/products/${product_id}`

    const data = await api.get(CART_BY_USER_ID, {user_id}).data
    const productInCart = data.map(i => await api.get(PRODUCTS, i.productId))
    
    if (!$.isArray(productInCart) ||  !productInCart.length ) {
        addEmptyPict("shopping-cart", "assets/img/illustration/empty-cart.png")
    }

    else {
        const html = generateProductHTML(productInCart)
        $("#shopping-cart").append(html)
    }
}

function generateProductHtml (list) {
    return list.map(i => {
            return `<div class="row shadow-1 product-cart">
                        <div class="col col-3 flex-center" style="padding-right: 0;"><input type="checkbox" style="width: 500px;">
                            <div>
                                <a href="#product-page.html">
                                <img id="product-image" class="shadow" style="border-radius: 50%;" src="${i.image}"></a>
                                </div>
                        </div>
                        <div class="col col-sm-7">
                            <a href="#product-page.html">
                                <p id="book-title" style="margin: 0;">${i.name}</p>
                            </a>
                            <p id="book-writer" style="font-size: 50%;">by ${i.author}</p>
                            <p id="book-price"><strong>${new Intl.NumberFormat('ID').format(i.price)}</strong></p>
                        </div>
                        <div class="col col-sm-1 flex-center justify-content-end">
                            <a href="#"><i class="icon ion-android-delete" style="color: #5d5d5d;font-size: xx-large;"></i></a>
                        </div>
                    </div>`
    })
}

$(document).ready({
    loadUserCart()
})