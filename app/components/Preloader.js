import Component from 'classes/Component'
import GSAP from 'gsap'

export default class Preloader extends Component {
    constructor() {
        super({
            element: '.preloader',
            elements: {
            }
        })
        this.rootElement = document.body
        this.bind()
        this.init()
    }

    bind() {
        ['hide', 'addEvents'].forEach((fn) => this[fn] = this[fn].bind(this))
    }

    hide() {
        this.hideTl = GSAP.timeline({ defaults: { duration: .3 } })
        this.hideTl.fromTo(this.element, {
            autoAlpha: 1
        }, {
            autoAlpha: 0,
            duration: .3,
            delay: .5
        })
    }

    addEvents() {
        window.addEventListener('load', this.hide)
    }

    init() {
        this.addEvents()
    }
}

