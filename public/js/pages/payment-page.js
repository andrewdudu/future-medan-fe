document.title = "Payment";
validateUserToken(getCookie('access-token'), () => window.location.href = '/login');
selectedBank = '';

async function loadPaymentMethod() {
    try {
        let response = await api.get(`${APP_URL}/api/payment-method`, {
            headers: {
                "Authorization": "Bearer " + getCookie('access-token')
            }
        });

        paymentMethods = response.data.data;

        paymentMethods.forEach(paymentMethod => {
            if (paymentMethod.type === 'BANK_TRANSFER') {
                $("#bank").append(`<a id="${paymentMethod.id}" onclick="paymentMethodClicked('${paymentMethod.id}')" class="dropdown-item" role="presentation">${paymentMethod.name}</a>`)
            } else {
                $("#virtual-bank").append(`<a id="${paymentMethod.id}" onclick="paymentMethodClicked('${paymentMethod.id}')"  class="dropdown-item" role="presentation">${paymentMethod.name}</a>`)
            }
        })

        $(`#total-price`).text('Rp ' + parseInt(getCookie('total-price')).format(2, 3, ',', '.'))
    } catch (err) {

    }
}

async function onBuyNowClicked() {
    let products = getCookie('selected-product').split(',');
    try {
        let response = await api.post(`${APP_URL}/api/purchases`, {
            products
        }, {
            headers: {
                "Authorization": "Bearer " + getCookie('access-token')
            }
        })
        
        window.location.href = '/book-library'
    } catch (err) {

    }
}

function paymentMethodClicked(id) {
    if (selectedBank !== '')  {
        $(`#${selectedBank}`).css('background-color', 'transparent')
        $(`#${selectedBank}`).css('color', 'black')
    }
    $(`#${id}`).css('background-color', '#007bff')
    $(`#${id}`).css('color', 'white')
    selectedBank = id
    $("#buy-now-button").attr("disabled", false)
}

$(document).ready(function () {
    loadPaymentMethod();
});