document.title = "Storefront"
isMerchant = true;
merchantId = get('id')
categories = [];
products = [];
selectedId = '';
addNew = true;
validateMerchantToken(getCookie('access-token'), (err) => {
    isMerchant = false;
})
var productIsValid = false, it;


function getUser (name) {
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

$(document).ready(async (e) => {

    if (merchantId !== undefined) {
        try {
            categories = await api.get(`/categories`)
            categories = categories.data.data

            $("#category-select").html(generateSelectForm(categories))

            let response = await api.get(`/merchant/${merchantId}`)
            let productsResponse = response.data.data.products
            let userResponse = response.data.data.user

            products = productsResponse

            $("#merchant-name").text(userResponse.name)
            
            const htmlProducts = generateProductHTML(productsResponse)
            // const html = htmlProducts + (isMerchant ? newProductHTML() : '')
    
            $("#post-count").text(htmlProducts.length)
    
            $("#merchant-storefront").html(htmlProducts)
    
            $("#empty-image").hide()

            // Check if a merchant is logged in
            if (isMerchant && (merchantId === getCookie('user_id'))) {
                $("#product-new").css("display", "block")
            }
        }
        catch (err) {
            $("#empty-image").show();
            $("#merchant-name").css('display', 'none');
            $("#product-title").css('display', 'none')
        }
    } else {
        $("#product-title").css('display', 'none')
        $("#merchant-name").css('display', 'none')
    }
})

function generateSelectForm(list) {
    return list.map(category => {
        return `
            <option value="${category.id}">
                ${category.name}
            </option>
        `
    })
}

function previewImageFile() {
    var preview = document.querySelector('img');
    var file    = document.querySelector('#image-file').files[0];
    var reader  = new FileReader();
  
    reader.addEventListener("load", function () {
      preview.src = reader.result;
      $('#image-base64').val(reader.result.substr(reader.result.indexOf(',') + 1));
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
}

function previewPdfFile() {
    var preview = document.querySelector('img');
    var file    = document.querySelector('#pdf-file').files[0];
    var reader  = new FileReader();
  
    reader.addEventListener("load", function () {
      preview.src = reader.result;
      $('#pdf-base64').val(reader.result.substr(reader.result.indexOf(',') + 1));
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
}

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

        let title = $("#new-book-title").val().trim()
        let author = $("#new-book-author").val().trim()
        let price = $("#new-book-price").val().trim()
        let ISBN = $("#new-book-ISBN").val().trim()
        let description = $("#new-book-description").val().trim()
        let category = $("#category-select").val()
        let image = $("#image-base64").val()
        let pdf = $("#pdf-base64").val()
        
        try {
            if (addNew) {
                const response = await api.post(`/products`, {
                    name: title, 
                    isbn: ISBN,
                    description,
                    price,
                    author,
                    category,
                    pdf,
                    image
                }, {
                    headers: {
                        "Authorization": "Bearer " + getCookie('access-token')
                    }
                })
            } else {
                const response = await api.put(`/products/${selectedId}`, {
                    name: title,
                    isbn: ISBN, 
                    description,
                    price,
                    author,
                    category,
                    pdf,
                    image
                }, {
                    headers: {
                        "Authorization": "Bearer " + getCookie('access-token')
                    }
                })
            }
    
            window.location.href = `/merchant-storefront?id=${getCookie('user_id')}`;
        }
        catch (err) {
        }
    })
});

function showEditForm(productId) {
    addNew = false;
    selectedId = productId;

    let editProduct = products.filter(product => product.id === productId)[0]

    if (editProduct !== undefined) {
        $("#new-book-title").val(editProduct.name)
        $("#new-book-author").val(editProduct.author)
        $("#new-book-price").val(editProduct.price)
        $("#new-book-ISBN").val(editProduct.isbn)
        $("#image-base64").val('')
        $("#pdf-base64").val('')
        $("#new-book-description").val(editProduct.description)

        $("#add-products").modal("show")
    }
}

$("#product-new").click(async () => {
    addNew = true;

    await $("#add-products").modal("show")
})

$("#btn-edit").click(async() => {
    window.location.href = await '/profile'
})

function generateProductHTML(products) {
    return products.map(product => {
        return `
        <div id="product-details" class="d-flex justify-content-between pt-2 pb-2">
            <div class="d-flex">
                <div class="p-1 d-flex align-items-center"><a href="/product?id=${product.id}"><img id="product-image" class="shadow" src="${APP_URL}${product.image}"></a></div>
                <div class="pl-3 d-flex align-items-center flex-column">
                    <div>
                        <a href="/product?id=${product.id}">
                            <p id="book-title" style="margin: 0;">${product.name}&nbsp;</p>
                        </a>
                    </div>
                    <p id="book-price" class="m-0"><strong>Rp ${product.price.format(2, 3, ',', '.')}</strong></p>
                </div>
            </div>

        ${(isMerchant && (merchantId === getCookie('user_id'))) ? `<div class="d-flex align-items-end flex-column justify-content-between"><a></a><button class="btn btn-primary pt-2" type="button" onclick="showEditForm('${product.id}')">Edit</button></div>` : ''  }
    </div>
    `})
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