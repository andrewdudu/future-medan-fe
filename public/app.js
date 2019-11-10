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
  '*': () => render('<h1>Not Found</h1>')
}

const route = pathname => {

}

(() => {
  [
    '/', 
    '/about', 
    '/login',
    '*'
  ].forEach(
    path => page(path, controllers[path])
  )
  page()
})()