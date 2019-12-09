document.title = 'Cart'
validateUserToken(getCookie('access-token'), () => window.location.href = "/login")
let totalPrice = 0;

async function loadUserCart(){
    try {
        const response = await api.get(`${APP_URL}/api/carts`, {
            headers: {
                "Authorization": "Bearer " + getCookie('access-token')
            }
        })
        
        let products = response.data.data.products;
    
        const html = generateProductHtml(products)
    
        $("#total-price").text('Rp ' + totalPrice.format(2, 3, ',', '.'))
        $('#product-in-cart').append(html)
    } catch (err) {

    }
}

async function deleteCartProduct(id) {
    try {
        const response = await api.delete(`${APP_URL}/api/carts`, {
            headers: {
                "Authorization": "Bearer " + getCookie('access-token')
            },
            data: {
                "product_id": id
            }
        })

        $('#' + id).remove();
    } catch (err) {

    }
}

function generateProductHtml (list) {
    return list.map(product => {
        totalPrice += product.price
        $("#total-price").text('Rp ' + totalPrice.format(2, 3, ',', '.'))
        return `<div class="row shadow-1 product-cart" id="${product.id}">
                    <div class="col col-3 flex-center" style="padding-right: 0;"><input type="checkbox" style="width: 500px;">
                        <div><a href="/product-page?id=${product.id}"><img id="product-image" class="shadow" src="${APP_URL}${product.image}"></a></div>
                    </div>
                    <div class="col col-sm-7">
                        <a href="/product-page?id=${product.id}">
                            <p id="book-title" style="margin: 0;">${product.name}</p>
                        </a>
                        <p id="book-writer" style="font-size: 50%;">by ${product.author}</p>
                        <p id="book-price"><strong>Rp ${product.price.format(2, 3, ',', '.')}</strong></p>
                    </div>
                    <div onclick="deleteCartProduct('${product.id}')" class="col col-sm-1 flex-center justify-content-end"><a ><i class="icon ion-android-delete" style="color: #5d5d5d;font-size: xx-large;"></i></a></div>
                </div>`
    })
}

$(document).ready(async function() {
    loadUserCart()
})