import Webfont from 'webfontloader'

// pages
import Home from 'pages/home'
import Documents from 'pages/documents'
import Actualites from 'pages/actualites'
import Boutique from 'pages/boutique'
import Contact from 'pages/contact'
import Convocations from 'pages/convocations'
import Partenaires from 'pages/partenaires'



class App {
  constructor() {
    this.template = window.location.pathname || `/espcdb-website${window.location.pathname}`
    this.loadFonts()
    this.createPages()
    this.createComponents()

    this.onResize()
  }

  createComponents() {

  }

  loadFonts() {
    Webfont.load({
      custom: {
        families: ['Dharma Gothic', 'Optician Sans', 'Silka']
      }
    })
  }

  createPages() {
    this.home = new Home()
    this.documents = new Documents()
    this.actualites = new Actualites()
    this.boutique = new Boutique()
    this.contact = new Contact()
    this.convocations = new Convocations()
    this.partenaires = new Partenaires()

    this.pages = {
      '/': this.home,
      '/documents': this.documents,
      '/actualites': this.actualites,
      '/boutique': this.boutique,
      '/contact': this.contact,
      '/convocations': this.convocations,
      '/partenaires': this.partenaires,
    }
    this.page = this.pages[this.template]
    this.page.create()
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize()
    }
  }
}

window.addEventListener('load', _ => {
  new App()
})

