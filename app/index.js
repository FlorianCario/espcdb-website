import each from 'lodash/each'
import Webfont from 'webfontloader'

// pages
import Home from 'pages/home'

// Components
import HomeSlider from 'components/HomeSlider'
import NewsCarousel from 'components/NewsCarousel'
import Preloader from 'components/Preloader'


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
    this.preloader = new Preloader()
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

window.addEventListener('load', _ => {
  new App
})

