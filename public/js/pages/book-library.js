document.title = 'Book Library';
validateUserToken(getCookie('access-token'), () => window.location.href = '/login')

async function getPdf(filePath, productId) {
    window.location.href = `/pdf-viewer?file-path=%2f${filePath}&product-id=${productId}`
}

async function loadMyProduct() {
    try {
        let response = await api.get(`/my-products`, {
            headers: {
                "Authorization": "Bearer " + getCookie('access-token')
            }
        })

        let purchases = response.data.data;

        purchases.forEach(purchase => {
            let status = 'approved'
            if (purchase.status !== 'APPROVED') status = 'pending'
            $(`#${status}-book`).append(`
                <div id="product-details" class="d-flex justify-content-between pt-2 pb-2">
                    <div class="d-flex">
                        <div class="p-1 d-flex align-items-center"><a href="/product?id=${purchase.product.id}"><img id="product-image" class="shadow" src="${APP_URL}${purchase.product.image}"></a></div>
                        <div class="pl-3 d-flex align-items-center flex-column">
                            <div>
                                <a href="/product?id=${purchase.product.id}">
                                    <p id="book-title" style="margin: 0;font-size: 90%;">${purchase.product.name}&nbsp;</p>
                                </a>
                                <div class="row">
                                    <div class="col-8">
                                        <p id="book-writer" style="font-size: 50%;margin-bottom: 0px">${purchase.merchant.name}</p>
                                        <p id="book-order-id" style="font-size: 60%;font-weight: bold;margin-top: 5px;margin-bottom:0">${purchase.order_id}</p>
                                    </div>
                                    <div class="col-4">
                                        ${status !== 'approved' ? `<p id="book-status" style="font-size: 60%;font-weight: bold;margin-top: 5px;color: ${purchase.status === 'PENDING' ? 'tomato' : 'grey'}">${purchase.status === 'PENDING' ? 'NOT PAID' : "WAITING APPROVAL"}</p>` : ''}
                                    </div>
                                </div>
                                <p id="book-price" class="m-0"><strong>Rp ${purchase.product.price.format(2, 3, ',', '.')}</strong></p>
                            </div>
                        </div>
                    </div>
                    
                    ${status === 'approved' ? `<div class="d-flex align-items-end flex-column justify-content-between">
                            <button onclick="getPdf('${purchase.product.pdf}', '${purchase.product.id}')" class="btn btn-primary pt-2" type="button">Read</button>

                    <div class="flex-center justify-content-between p-2">
                        <button id="review-btn" class="w-100 border-0 bg-white" onclick="reviewProduct('${purchase.product.id}')" style="color: #278acb;font-size: 13px;">Review</button>
                    </div>`: ''}
                </div>
            `)
        })
    } catch (err) {

    }
}

async function reviewProduct(productId) {
    window.location.href = `/review-product?product-id=${productId}`
}

$(document).ready(function () {
    loadMyProduct();
})