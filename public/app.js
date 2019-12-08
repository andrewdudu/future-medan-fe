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
  '/book-library': BookLibraryPage,
  '/forgot-password': ForgotPasswordPage,
  '/reset-password': ResetPasswordPage,
  '/review-product': ReviewProductPage,
  '/wishlist': WishlistPage,
  '/shopping-cart': ShoppingCartPage,
  '/merchant-storefront': MerchantStorefrontPage,
  '/merchant-incoming-order': MerchantIncomingOrderPage,
  '/admin': AdminUserTablePage,
  '/admin-login': AdminLoginPage,
  '/admin-table': AdminTablePage,
  '/admin-product': AdminProductTablePage,
  '/admin-category': AdminCategoryTablePage,
  '*': AdminNotFoundPage
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
    '/book-library',
    '/forgot-password',
    '/reset-password',
    '/review-product',
    '/wishlist',
    '/shopping-cart',
    '/merchant-storefront',
    '/merchant-incoming-order',
    '/admin',
    '/admin-login',
    '/admin-table',
    '/admin-product',
    '/admin-category',
    '*'
  ].forEach(
    path => page(path, controllers[path])
  )
  page()
})()