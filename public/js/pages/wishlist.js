document.title = "My Wishlist"
validateUserToken(getCookie('access-token'), (err) => window.location.href = '/login')

$(document).ready(async () => {
    try {
        const response = await api.get(`/my-wishlists`,{
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })
        
        const myWishlist = response.data.data.products
            .map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    author: product.author
                }
            })

        if (!$.isArray(myWishlist) ||  !myWishlist.length ) {
            addEmptyPict("wishlist", "assets/img/illustration/wishlist.png")
        } else {
            const html = generateProductHTML(myWishlist)
            $("#wishlist").append(html)
        }
        
    }
    catch (err) {
         console.log(err)
    }
})

function generateProductHTML(list) {
    return list.map(product => {
        return `<div class="row shadow-1 product-cart bg-light-blue" id="${product.id}">
                    <div class="col">
                        <div id="product-details" class="d-flex justify-content-between pt-2 pb-2">
                            <div class="d-flex">
                                <div class="p-1 d-flex align-items-center">
                                    <a href="/product?id=${product.id}">
                                        <img id="product-image" class="shadow" src="${APP_URL}${product.image}">
                                    </a>
                                </div>
                                <div class="pl-3 d-flex align-items-center flex-column">
                                    <div>
                                        <a href="/product?id=${product.id}">
                                            <p id="book-title" style="margin: 0;">${product.name}&nbsp;</p>
                                        </a>
                                        <p id="book-writer" style="font-size: 50%;">by ${product.author}</p>
                                    </div>
                                    <p id="book-price" class="m-0"><strong>Rp ${new Intl.NumberFormat('ID').format(product.price)}.00</strong></p>
                                </div>
                            </div>
                            <div class="d-flex align-items-end flex-column justify-content-between">
                                <div onclick="deleteWishlistProduct('${product.id}')">
                                    <i class="icon ion-android-delete" style="color: #5d5d5d;font-size: x-large;"></i>
                                </div>
                                <button class="btn btn-primary pt-2" type="button" onclick=addToCart('${product.id}')>
                                    &nbsp;<i class="fas fa-cart-plus" style="font-size: larger;"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`
    })
}

async function deleteWishlistProduct(id) {
    try {
        const response = await api.delete(`${APP_URL}/api/wishlists`, {
            headers: {
                "Authorization": "Bearer " + getCookie('access-token')
            },
            data: {
                "product_id": id
            }
        })

        $(`#${id}`).remove();
        Notify('Wishlist is deleted', null, null, 'info')
    }
    catch (err) {
    }
}

async function addToCart(id) {
    try {
        const response = await api.post(`${APP_URL}/api/carts`, { 
            product_id: id
         }, {
            headers: {
                "Authorization": "Bearer " + getCookie('access-token')
            }
        })

        Notify('Added to cart', null, null, 'info')
    }
    catch (err) {

    }
}