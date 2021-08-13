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
    this.template = window.location.pathname
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
      '/espcdb-website/': this.home,
      '/espcdb-website/documents': this.documents,
      '/espcdb-website/actualites': this.actualites,
      '/espcdb-website/boutique': this.boutique,
      '/espcdb-website/contact': this.contact,
      '/espcdb-website/convocations': this.convocations,
      '/espcdb-website/partenaires': this.partenaires,
    }
    this.page = this.pages[this.template]
    console.log(this.template);
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

