const mainDiv = document.getElementById('main')

const render = html => {
  mainDiv.innerHTML = html
}

const controllers = {
  '/': mainPage,
  '/about': aboutPage,
  '*': () => render('<h1>Not Found</h1>')
}

(() => {
  ['/', '/about', '*'].forEach(
    path => page(path, controllers[path])
  )
  page()
})()