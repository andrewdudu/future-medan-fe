document.title = 'Cart'
validateUserToken(getCookie('access-token'), () => window.location.href = "/login")
totalPrice = 0;
products = [];
selected = [];
productLength = 0;

async function loadUserCart(){
    try {
        const response = await api.get(`${APP_URL}/api/carts`, {
            headers: {
                "Authorization": "Bearer " + getCookie('access-token')
            }
        });
        
        products = response.data.data.products;
    
        const html = generateProductHtml(products);
    
        $("#total-price").text('Rp ' + totalPrice.format(2, 3, ',', '.'));
        $('#product-in-cart').append(html);
    } catch (err) {

    }
}

function checkout() {
    setCookie('selected-product', selected, 1)
    setCookie('total-price', totalPrice, 1)
    window.location.assign('/payment-page')
}

function disableButton() {
    $("#checkout-button").attr("disabled", true)
}

function enableButton() {
    $("#checkout-button").attr("disabled", false)
}

function checkSelected() {
    if (selected.length === 0) disableButton();
    else enableButton();
}

function checkAll() {
    let checked = $("#checkbox-all").prop("checked");

    if (checked) {
        products.forEach((product) => {
            selected.push(product.id);
            $("#checkbox-" + product.id).prop("checked", true);
        })
    } else {
        products.forEach((product) => {
            $("#checkbox-" + product.id).prop("checked", false);
        })
        selected = []
    }

    checkSelected()
}

function addSelected(id) {
    let checked = $("#checkbox-" + id).prop("checked");
    if (checked) {
        selected.push(id);
        products.forEach(product => {
            if (product.id === id) totalPrice += product.price
        })
    } else {
        selected = selected.filter(selectedId => selectedId !== id)
        products.forEach(product => {
            if (product.id === id) totalPrice -= product.price;
        })
    }
    $("#total-price").text('Rp ' + totalPrice.format(2, 3, ',', '.'))

    if (productLength == selected.length) {
        $("#checkbox-all").prop("checked", true);
    } else {
        $("#checkbox-all").prop("checked", false);
    }

    checkSelected()
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
    }
    catch (err) {
    }
}

function generateProductHtml (list) {
    return list.map(product => {
        productLength++;
        return `<div class="row shadow-1 product-cart" id="${product.id}">
                    <div class="col col-3 flex-center" style="padding-right: 0;">
                        <input id="checkbox-${product.id}" onclick="addSelected('${product.id}')" type="checkbox" style="width: 500px;">
                        <div>
                            <a href="/product-page?id=${product.id}">
                                <img id="product-image" class="shadow" src="${APP_URL}${product.image}">
                            </a>
                        </div>
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