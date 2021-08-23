// pages
import Home from 'pages/home'
import Documents from 'pages/documents'
import Actualites from 'pages/actualites'
import Boutique from 'pages/boutique'
import Contact from 'pages/contact'
import Convocations from 'pages/convocations'
import Partenaires from 'pages/partenaires'
import Article from 'pages/article'

// components
import Footer from 'components/Footer'




class App {
    constructor() {
        this.createContent()
        this.createFooter()
        this.createPages()

        this.onResize()
    }

    createContent() {
        this.content = document.querySelector('.page')
        this.template = this.content.getAttribute('data-template')
    }

    createFooter() {
        this.footer = new Footer()
    }

    createPages() {

        this.pages = {
            home: new Home(),
            documents: new Documents(),
            convocations: new Convocations(),
            actualites: new Actualites(),
            boutique: new Boutique(),
            contact: new Contact(),
            partenaires: new Partenaires(),
            article: new Article()
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

new App()


