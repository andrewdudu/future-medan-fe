document.title = "Storefront"
validateMerchantToken(getCookie('access-token'), (err) => $("#btn-edit").hide())
var productIsValid = false, it;

function getUser (name) {
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

$(document).ready(async (e) => {
    // e.preventDefault();

    try {
        const response = await api.get(`${APP_URL}/api/users`, {
            headers: {
                "Authorization": "Bearer " + getCookie('access-token')
            }
        })
        
        const data = response.data.data
        const htmlProducts = generateProductHTML(data)
        const html = htmlProducts + (check_if_merchant? newProductHTML() : '')

        $("#post-count").text(htmlProducts.length)

        $("#merchant-storefront").html(html)

        // Check if a merchant is logged in
        if (check_if_merchant) {
            
        }
    }
    catch (err) {

    }
})

$('#add-products').on('shown.bs.modal', async function (e) {
    $('#btn-close').click(() => {
        $(".modal-body:input").each(function (i, id) {
            $(id).val("")
            $(id).css("border", "1px solid #CCC")
        })
        $("#add-products").modal("hide")
    })
    
    $('#btn-add').click(async () => {
        it = 0;
        $(":input[required]").each(function (i, requiredInput){
            let lastElement = $(requiredInput).next()

            if (lastElement.length == 0 && !lastElement.hasClass("invalid")){
                $(requiredInput).parent().append(`<span class="invalid-${i}" style="color: red; font-size: 12px"></span>`)
            }

            if ($(requiredInput).val().trim() == '') {
                $(`.invalid-${i}`).text(`${$(requiredInput).attr("placeholder")} can't be empty`)
                $(requiredInput).css("border", "1px solid red")
            } 
            else {
                $(`.invalid-${i}`).empty()
                $(requiredInput).css("border", "1px solid #CCC")
                it++;
            }
        })

        if (it !== $(":input[required]").length) return;

        let newBookTitle = $("#new-book-title").val().trim()
        let newBookAuthor = $("#new-book-author").val().trim()
        let newBookPrice = $("#new-book-price").val().trim()
        let newBookISBN = $("#new-book-ISBN").val().trim()
        let newBookDescription = $("#new-book-description").val().trim()
        let newBookCategory = $("#new-book-category").val()
        let newBookImage = $("#new-book-image").val().trim()
        let newBookPDF = $("#new-book-PDF").val().trim()
        
        try {
            const response = await api.post(`${APP_URL}/api/products`, {
                newBookTitle, 
                newBookDescription,
                newBookPrice,
                newBookAuthor,
                newBookISBN,
                newBookCategory,
                newBookPDF,
                newBookImage
            }, {
                headers: {
                    "Authorization": "Bearer " + getCookie('access-token')
                }
            })
    
            console.log(response)
            window.location.href = `/merchant-storefront`;
        }
        catch (err) {
            console.log(err.response)
        }
    })
});

$(".product-new").click(async () => {
    await $("#add-products").modal("show")
})

$("#btn-edit").click(async() => {
    window.location.href = await '/profile'
})

function generateProductHTML(products) {
    return products.map(product => {
        return `<li id="product-item">
                    <a id="product-link" class="p-0" href="#"></a>
                    <div id="product-home" class="flex-center">
                        <a id="product-link" class="p-0" href="/product-page?id=${product.id}">
                            <img id="product-image-home" src="${APP_URL}${product.image}">
                        </a>
                        <div id="product-details-home" class="text-left">
                            <a id="product-link" class="p-0" href="/product-page?id=${product.id}">
                                <span id="product-name-home">${product.title}</span>
                                <span id="product-price-home">${new Intl.NumberFormat('ID').format(product.price)}</span>
                            </a>
                            <div class="d-flex justify-content-between">
                                <a id="product-link" class="p-0" href="#"><span class="pt-2"></span></a>
                                <a id="product-categories" href="#">Plants</a>
                            </div>
                        </div>
                    </div>
                </li>`
    })
}

function newProductHTML() {
   return `<li id="product-item">
                <div id="product-home" class="flex-center product-new">
                    <i class="material-icons d-flex align-items-center justify-content-center" id="product-image-home">add_circle_outline</i>
                    <div id="product-details-home">
                        <span id="product-name-home">Title</span>
                        <span id="product-price-home">Price</span>
                        <div class="d-flex justify-content-between">
                            <span class="pt-2"><a id="product-categories" href="#">Others</a></span>
                        </div>
                    </div>
                </div>
            </li>`
}