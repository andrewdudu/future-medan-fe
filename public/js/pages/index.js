document.title = 'Home Page'
var userPromise = validateUserToken(getCookie('access-token'), (err) => $("#library").hide())
var merchantPromise = validateMerchantToken(getCookie('access-token'), (err) => {})
var merchant, user;

merchantPromise.then(function (value) {
    console.log(`Merchant : ${value}`)
    merchant = value
})

console.log(userPromise)
userPromise.then(function (value) {
    console.log(`User : ${value}`)
    user = value
})

$(document).ready(async e => {
    try {
        e.preventDefault()

        if (merchant) {
            window.location.href = '/merchant-storefront';
            return;
        }

        const response = await api.get(`${APP_URL}/api/products`)
        const data = response.data.data

        const newReleaseProducts = data
            .filter(product => product.newRelease)
            .map(i => {
                return {
                    name: i.name,
                    image: i.image,
                    price: i.price
                }
            })
        
        const bestSellerProducts = data
            .filter(product => product.bestSeller)
            .map(i => {
                return {
                    name: i.name,
                    image: i.image,
                    price: i.price
                }
            })
    
        const html = generateProductHtml(newReleaseProducts)
        const html2 = generateProductHtml(bestSellerProducts)

        $('#new-release').html(html)
        $('#best-seller').html(html2)

        // Book library
        if (user){
            try {
                const response2 = await api.get(`${APP_URL}/api/products`)
                const data2 = response.data.data

                if (!$.isArray(data2) ||  !data2.length) {
                    $('#book-library').hide()
                    console.log("empty")
                }
                else {
                    const library = generateProductHtml(data)
                    $('#book-library').html(library)
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
    return list.map(i => {
            return `<li id="product-item">
                        <a id="product-link" href="#">
                            <div id="product-home" class="flex-center">
                                <img id="product-image-home" src="${i.image}">
                                <div id="product-details-home" class="text-left">
                                    <span id="product-name-home">${i.name}</span>
                                    <span id="product-price-home">Rp${new Intl.NumberFormat('ID').format(i.price)}</span>
                                </div>
                            </div>
                        </a>
                    </li>`
    })
}