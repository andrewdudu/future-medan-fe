document.title = "My Wishlist"

$(document).ready(async () => {
    try {
        const response = await api.get(`/wishlists/${user_id}`,{
            headers: {
                "Authorization": "Bearer " + getCookie("access-token")
            }
        })
        
        const myWishlist = response.data.data
            .map(i => {
                return {
                    name: i.name,
                    image: i.image,
                    price: i.price
                }
            })

        if (!$.isArray(myWishlist) ||  !myWishlist.length ) {
            
        }

        else {
            const html = generateProductHTML(myWishlist)
            $("#wishlist").append(html)
        }
        
        
    }
    catch (err) {
        
    }
})

function generateProductHTML(list) {
    return list.map(i => {
        return `<div class="row shadow-1 product-cart bg-light-blue">
                <div class="col">
                    <div id="product-details" class="d-flex justify-content-between pt-2 pb-2">
                        <div class="d-flex">
                            <div class="p-1 d-flex align-items-center">
                                <a href="#product-page.html">
                                    <img id="product-image" class="shadow" src="assets/img/rubberplant2.jpeg">
                                </a>
                            </div>
                            <div class="pl-3 d-flex align-items-center flex-column">
                                <div>
                                    <a href="#product-page.html">
                                        <p id="book-title" style="margin: 0;">${i.title}&nbsp;</p>
                                    </a>
                                    <p id="book-writer" style="font-size: 50%;">by ${i.author}</p>
                                </div>
                                <p id="book-price" class="m-0"><strong>${new Intl.NumberFormat('ID').format(i.price)}</strong></p>
                            </div>
                        </div>
                        <div class="d-flex align-items-end flex-column justify-content-between"><a href="#"><i class="icon ion-android-delete" style="color: #5d5d5d;font-size: x-large;"></i></a><button class="btn btn-primary pt-2" type="button">&nbsp;<i class="fas fa-cart-plus" style="font-size: larger;"></i></button></div>
                    </div>
                </div>
            </div>`
    })
}

function emptyHTML (src, pageName) {
    return `<div class="row h-75 flex-lg-row">
                <div class="col-sm-12 my-auto">
                <img class="w-75 h-100 mx-auto d-block" src="${src}" style="max-width: 600px;">
                    <p class="text-center" style="color: #278ACB;font-family: 'Montserrat Alternates', sans-serif;font-size: 20px;">
                        Your ${pageName} is Empty!
                    </p>
                </div>
            </div>`
}