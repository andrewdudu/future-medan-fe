const mainDiv = document.getElementById('main')

const render = html => {
  mainDiv.innerHTML = html
}

const serializeForm = form => {
  const data = {}
  const elements = form.getElementsByClassName('form-control')
  for(el of elements) {
    data[el.name] = el.value
  }
  return data
}

const controllers = {
  '/': mainPage,
  '/about': aboutPage,
  '/login': LoginPage,
  '/product-page': ProductPage,
  '/search': SearchPage,
  '/profile': ProfilePage,
  '/shopping-cart': ShoppingCartPage,
  '*': () => render('<h1>Not Found</h1>')
}

const route = pathname => {

}

(() => {
  [
    '/', 
    '/about', 
    '/login',
    '/product-page',
    '/search',
    '/profile',
    '/shopping-cart', 
    '*'
  ].forEach(
    path => page(path, controllers[path])
  )
  page()
})()