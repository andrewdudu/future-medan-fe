document.title = "Incoming Order"

validateMerchantToken(getCookie('access-token'), (err) => {
    window.location.href = '/'
})

$(document).ready(async e => {
    try {
        let response = await api.get(`/merchant/purchases/${getCookie('user_id')}`, {
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })

        if (response.data.data.length > 0) $("#order-list").html(generateProductHTML(response.data.data))
    }
    catch (err){
    }
})

async function onApproveClick(orderId, productId) {
    try {
        await api.post(`/approved`, {
            "order_id": orderId,
            "product_id": productId
        }, {
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })

        $(`#${orderId}${productId}`).css('display', 'none');
    } catch (err) {

    }
}

function generateProductHTML(products) {
    return products.map(purchase => {
        return `
        <div class="row product-cart shadow-1" id="${purchase.order_id}${purchase.product.id}">
            <div class="col">
                <div id="product-details" class="d-flex justify-content-between pt-2 pb-2">
                    <div class="d-flex">
                        <div class="p-1 d-flex align-items-center">
                            <a class="pl-2" href="#product-page.html">
                                <img id="product-image" class="shadow" src="${APP_URL}${purchase.product.image}">
                            </a>
                        </div>
                        <div class="pl-3 d-flex align-items-center flex-column">
                            <div>
                                <a href="#product-page.html">
                                    <p id="book-title" style="margin: 0;">${purchase.product.name}&nbsp;</p>
                                </a>
                                <p id="book-writer" style="font-size: 50%;">by&nbsp;${purchase.product.author}</p>
                            </div>
                        </div>
                    </div>
                    <div id="approve-order-container" class="d-flex flex-column-reverse">
                        <div id="approve-order" class="btn" onclick="onApproveClick('${purchase.order_id}','${purchase.product.id}')">
                            <span style="color: #FFF;"><strong>Approve</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    })
}