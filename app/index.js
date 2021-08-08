import each from 'lodash/each'
import Webfont from 'webfontloader'

// pages
import Home from 'pages/home'

// Components
import HomeSlider from 'components/HomeSlider'
import NewsCarousel from 'components/NewsCarousel'


class App {
  constructor() {
    this.loadFonts()
    this.createPages()
    this.createComponents()


    this.onResize()
  }

  createComponents() {
    this.homeSlider = new HomeSlider()
    this.newsSlider = new NewsCarousel()
  }

  loadFonts() {
    Webfont.load({
      custom: {
        families: ['Dharma Gothic', 'Optician Sans', 'Silka']
      }
    })
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
