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
  '/faq': AboutPage,
  '/payment': PaymentPage,
  '/login': LoginPage,
  '/product': ProductPage,
  '/search': SearchPage,
  '/profile': ProfilePage,
  '/book-library': BookLibraryPage,
  '/forgot-password': ForgotPasswordPage,
  '/reset-password': ResetPasswordPage,
  '/review-product': ReviewProductPage,
  '/wishlist': WishlistPage,
  '/pdf-viewer': PDFViewerPage,
  '/shopping-cart': ShoppingCartPage,
  '/all-categories': AllCategoriesPage,
  '/product-by-categories': ProductByCategoriesPage,
  '/merchant-storefront': MerchantStorefrontPage,
  '/merchant-incoming-order': MerchantIncomingOrderPage,
  '/admin': AdminUserTablePage,
  '/admin-merchant': AdminMerchantTablePage,
  '/admin-login': AdminLoginPage,
  '/admin-table': AdminTablePage,
  '/admin-product': AdminProductTablePage,
  '/admin-category': AdminCategoryTablePage,
  '/admin-wishlist': AdminWishlistTablePage,
  '*': AdminNotFoundPage
}

const route = pathname => {

}

(() => {
  [
    '/',
    '/faq',
    '/payment',
    '/login',
    '/product',
    '/search',
    '/profile',
    '/book-library',
    '/forgot-password',
    '/reset-password',
    '/review-product',
    '/wishlist',
    '/pdf-viewer',
    '/shopping-cart',
    '/all-categories',
    '/product-by-categories',
    '/merchant-storefront',
    '/merchant-incoming-order',
    '/admin',
    '/admin-merchant',
    '/admin-login',
    '/admin-table',
    '/admin-product',
    '/admin-category',
    '/admin-wishlist',
    '*'
  ].forEach(
    path => page(path, controllers[path])
  )
  page()
})()