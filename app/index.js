import Webfont from 'webfontloader'

// pages
import Home from 'pages/home'
import Documents from 'pages/documents'
import Actualites from 'pages/actualites'
import Boutique from 'pages/boutique'
import Contact from 'pages/contact'
import Convocations from 'pages/convocations'
import Partenaires from 'pages/partenaires'

// components
import Footer from 'components/Footer'
import Scrolling from 'components/Scrolling'



class App {
  constructor() {
    this.loadFonts()
    this.createContent()
    this.createSmoothScroll()
    this.createFooter()
    this.createPages()

    this.onResize()
  }

  createContent() {
    this.content = document.querySelector('.page')
    this.template = this.content.getAttribute('data-template')
  }

  createSmoothScroll() {
    this.scroll = new Scrolling()
  }

  loadFonts() {
    Webfont.load({
      custom: {
        families: ['Dharma Gothic', 'Optician Sans', 'Silka']
      }
    })
  }

  createFooter() {
    this.footer = new Footer()
  }

  createPages() {

    this.pages = {
      home: new Home(),
      documents: new Documents(),
      actualites: new Actualites(),
      boutique: new Boutique(),
      contact: new Contact(),
      convocations: new Convocations(),
      partenaires: new Partenaires()
    }
    this.page = this.pages[this.template]
    console.log(this.page);
    this.page.create()
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize()
    }
  }
}

window.addEventListener('DOMContentLoaded', _ => {
  new App()
})


