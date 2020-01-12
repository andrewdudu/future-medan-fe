document.title = "All Categories"

$(document).ready(async e => {
    try {
        const response = await api.get(`/categories`)
        const data = response.data.data

        if (!$.isArray(data) ||  !data.length) {
            addEmptyPict("all-categories", "assets/img/illustration/empty.png")
            console.log("empty")
        }

        else {
            const html = generateProductHTML(data)
            $("#all-categories").removeClass("bg-white")
            $("#all-categories").html(html)
            console.log("fill")
        }
    }
    catch (err){
        addReloadPict(".all-categories")
    }
})

function generateProductHTML(categories) {
    return categories.map(category => {
        return `<a id="category-link" href="/product-by-categories?category=${category.id}&name=${category.name}>
                    <div id="category-group" class="flex-column p-2 flex-center">
                        <img id="category-image" src="${APP_URL}${category.image}">
                        <span id="category-name">${category.name}</span>
                    </div>
                </a>`
    })
}