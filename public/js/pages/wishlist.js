document.title = "My Wishlist"

function getCasts() {
    const api = axios.create({
        baseURL: "http://127.0.0.1:8080/future-medan/api",
        timeout: 5000
    }) 

    const path = '/wishlists'
    const data = api.get(path)

    
}

getCasts()