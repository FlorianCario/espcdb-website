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
    this.loadFonts()
    this.createContent()
    this.createPages()

    this.onResize()
  }

  createContent() {
    this.content = document.querySelector('.page')
    this.template = this.content.getAttribute('data-template')
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

window.addEventListener('load', _ => {
  new App()
})

