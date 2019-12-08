document.title = 'Home Page'

async function getCasts(){
    try {
        const response = await api.get('/products')
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

        $('new-release').innerHTML = html
        $('best-seller').innerHTML = html2

        // Book library
        
    }
    catch (err) {

    }
}

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

$(document).ready(async function () {
    getCasts()
})