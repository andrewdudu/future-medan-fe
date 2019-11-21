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
  '/': MainPage,
  '/payment-page': PaymentPage,
  '/login': LoginPage,
  '/product-page': ProductPage,
  '/search': SearchPage,
  '/profile': ProfilePage,
  '/shopping-cart': ShoppingCartPage,
  '/admin-notfound': AdminNotFoundPage,
  '/admin': AdminIndexPage,
  '/admin-login': AdminLoginPage,
  '/admin-table': AdminTablePage,
  '*': () => render('<h1>Not Found</h1>')
}

const route = pathname => {

}

(() => {
  [
    '/',
    '/payment-page',
    '/login',
    '/product-page',
    '/search',
    '/profile',
    '/shopping-cart',
    '/admin-notfound',
    '/admin',
    '/admin-login',
    '/admin-table',
    '*'
  ].forEach(
    path => page(path, controllers[path])
  )
  page()
})()