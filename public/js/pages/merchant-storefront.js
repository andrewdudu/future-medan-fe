document.title = "Storefront"

$(document).ready(async (e) => {
    e.preventDefault();

    $(".product-new").css("cursor", "pointer")

    const response = await api.get(`/users/${id}`)
    
    $("#btn-edit").hide()
    if (response.data.data.role === "Merchant"){
        $("#btn-edit").show()
    }
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