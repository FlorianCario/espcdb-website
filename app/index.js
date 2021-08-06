import each from 'lodash/each'
import HomeSlider from 'components/homeSlider'
import Home from 'pages/home'

class App {
  constructor() {
    this.createPages()
    this.createHomeSlider()

    this.onResize()
  }

  createHomeSlider() {
    this.homeSlider = new HomeSlider()
  }

  createPages() {
    this.pages = {
      home: new Home()
    }

    each(this.pages, page => {
      this.page = page
      this.page.create()
    })
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize()
    }
  }
}

new App()
