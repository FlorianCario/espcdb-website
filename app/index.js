import SmoothScrollbar from 'smooth-scrollbar'
import FontFaceObserver from 'fontfaceobserver'

// pages
import Home from 'pages/home'
import Documents from 'pages/documents'
import Actualites from 'pages/actualites'
import Boutique from 'pages/boutique'
import Contact from 'pages/contact'
import Convocations from 'pages/convocations'
import Partenaires from 'pages/partenaires'
import Article from 'pages/article'
import Equipes from 'pages/equipes'
import Staff from 'pages/staff'
import Historique from 'pages/historique'

// components
import Preloader from 'components/Preloader'
import Navigation from 'components/Navigation'




class App {
    constructor() {
        this.createContent()
        this.createNavigation()
        this.createPages()
        this.createPreloader()
        this.createSmoothScroll()

        this.onResize()
    }

    createNavigation() {
        this.navigation = new Navigation()
    }

    createPreloader() {
        this.preloader = new Preloader()
    }

    createSmoothScroll() {
        this.scroller = document.body;
        SmoothScrollbar.init(this.scroller, {
            damping: 0.075
        })
    }

    createContent() {
        this.content = document.querySelector('.page')
        this.template = this.content.getAttribute('data-template')
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
            article: new Article(),
            equipes: new Equipes(),
            staff: new Staff(),
            historique: new Historique()
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

var fontA = new FontFaceObserver('Silka');
var fontB = new FontFaceObserver('Optician Sans');
var fontC = new FontFaceObserver('Dharma Gothic')

Promise.all([fontA.load(), fontB.load(), fontC.load()]).then(_ => {
    new App()
});

console.log('%c Designed and developed by Florian Cario', 'background: #000; color: #fff;')

