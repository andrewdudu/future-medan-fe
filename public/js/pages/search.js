document.title = "Search"

$("#search-input").on('input', debounce((term) => onInputChange(term), 1000))

async function onInputChange(term) {
    console.log(term)
    try {
        let response = await api.get(`/search?term=${term.target.value}`)

        let products = response.data.data;
        
        $("#empty-image").hide()

        $("#result-list").html(generateProductHTML(products))
    } catch (err) {
        $("#empty-image").show();
    }
}

function generateProductHTML(list) {
    return list.map(product => {
        return `
        <div id="product-details" class="d-flex justify-content-between pt-2 pb-2">
            <div class="d-flex">
                <div class="p-1 d-flex align-items-center"><a href="/product?id=${product.id}"><img id="product-image" class="shadow" src="${APP_URL}${product.image}"></a></div>
                <div class="pl-3 d-flex align-items-center flex-column">
                    <div>
                        <a href="/product?id=${product.id}">
                            <p id="book-title" style="margin: 0;">${product.name}&nbsp;</p>
                        </a>
                        <p id="book-writer" style="font-size: 50%;">${product.author}</p>
                    </div>
                    <p id="book-price" class="m-0"><strong>Rp ${product.price.format(2, 3, ',', '.')}</strong></p>
                </div>
            </div>
        </div>
        <hr>
    `
    })
}