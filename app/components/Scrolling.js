import Component from 'classes/Component'

export default class Scrolling extends Component {
    constructor() {
        super({
            element: document.body,
            elements: {
                scrollContainer: '[data-scroll]',
                scrollContent: '[data-scroll-content]',
            }
        })

        this.bind()
        this.data = {
            ease: .1,
            current: 0,
            last: 0,
            rounded: 0
        }
        this.rAF = null
        this.on()
    }

    bind() {
        ['scroll', 'run', 'resize'].forEach((fn) => this[fn] = this[fn].bind(this))
    }

    setStyles() {
        Object.assign(this.elements.scrollContainer.style, {
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            overflow: 'hidden'
        })
    }

    setHeight() {
        this.element.style.height = `${this.elements.scrollContent.getBoundingClientRect().height}px`
    }

    resize() {
        this.setHeight()
        this.scroll()
        this.data.rounded = this.data.last = this.data.current
    }

    scroll() {
        this.data.current = window.scrollY
    }

    run() {
        this.data.last += (this.data.current - this.data.last) * this.data.ease
        this.data.rounded = Math.round(this.data.last * 100) / 100
        this.elements.scrollContent.style.transform = `translate3D(0, -${this.data.rounded}px, 0)`
        this.requestAnimationFrame()
    }

    on() {
        this.setStyles()
        this.setHeight()
        this.addEvents()
        this.resize()

        this.requestAnimationFrame()
    }

    requestAnimationFrame() {
        this.rAF = requestAnimationFrame(this.run)
    }


    addEvents() {
        window.addEventListener('resize', this.resize, { passive: true })
        window.addEventListener('scroll', this.scroll, { passive: true })
    }

}

