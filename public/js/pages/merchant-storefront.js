document.title = "Storefront"
validateMerchantToken(getCookie('access-token'), (err) => $("#btn-edit").hide())

$(document).ready(async (e) => {
    e.preventDefault();

    $(".product-new").css("cursor", "pointer")

    const response = await api.get(`${APP_URL}/api/users/${id}`)
})

$(".product-new").click(async () => {
    $("#add-products").modal("show")
})

$('#btn-close').click(() => {
    $(".modal-body:input").each(function (i, id) {
        $(id).val("")
    })
    $("#add-products").modal("hide")
})

$('#btn-add').click(async () => {
    
})