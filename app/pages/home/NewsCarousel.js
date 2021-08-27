import Component from 'classes/Component'
import { lerp } from 'utils/maths'


export default class NewsCarousel extends Component {
    constructor() {
        super({
            element: '.js-news__slider',
            elements: {
                sliderInner: '.js-news__sliderInner',
                slides: document.querySelectorAll('.js-news__slide'),
                images: document.querySelectorAll('.js-news__slideImage')
            }
        })

        this.opts = {
            el: '.js-news__slider',
            ease: 0.1,
            speed: 1.5,
            velocity: 15,
        }

        this.onX = 0
        this.offX = 0

        this.currentX = 0
        this.lastX = 0

        this.isDragging = false

        this.min = 0
        this.max = 0

        this.centerX = window.innerWidth / 2

        this.slidesNumb = this.elements.slides.length;

        this.bind()
        this.init()
    }

    bind() {
        ['setPos', 'setBounds', 'run', 'on', 'off', 'resize'].forEach((fn) => this[fn] = this[fn].bind(this))
    }

    clamp() {
        this.currentX = Math.max(Math.min(this.currentX, this.min), this.max)
    }

    setBounds() {
        this.elements.sliderInner.style.width = `calc((65.5rem + 12.1rem) * ${this.slidesNumb})`

        this.oneSlideWidth = this.elements.slides[0].getBoundingClientRect().width
        this.sliderWidth = this.oneSlideWidth * this.slidesNumb

        this.max = -(this.sliderWidth - 200)
    }

    setPos(e) {
        if (!this.isDragging) return

        if (e.type === 'touchmove') {
            this.currentX = this.offX + ((e.touches[0].pageX - this.onX) * this.opts.speed)
        } else if (e.type == 'mousemove') {
            this.currentX = this.offX + ((e.clientX - this.onX) * this.opts.speed)
        }
        this.clamp();
    }

    run() {
        this.lastX = lerp(this.lastX, this.currentX, this.opts.ease)
        this.lastX = Math.floor(this.lastX * 100) / 100

        const sd = this.currentX - this.lastX
        const acc = sd / window.innerWidth
        let velo = + acc

        this.elements.sliderInner.style.transform = `translate3D(${this.lastX}px, 0, 0) skewX(${velo * this.opts.velocity}deg)`

        window.requestAnimationFrame(this.run)
    }

    on(e) {
        this.isDragging = true
        this.onX = e.touches ? e.touches[0].clientX : e.clientX;
        this.element.classList.add('is-grabbing')
    }

    off(e) {
        this.isDragging = false
        this.offX = this.currentX
        this.element.classList.remove('is-grabbing')
    }

    resize() {
        this.setBounds()
    }

    init() {
        this.setBounds()
        this.addListeners()
    }

    addListeners() {
        this.run()

        this.element.addEventListener('mousemove', this.setPos, { passive: true })
        this.element.addEventListener('mousedown', this.on, false)
        this.element.addEventListener('mouseup', this.off, false)

        this.element.addEventListener('touchmove', this.setPos, { passive: true });
        this.element.addEventListener('touchstart', this.on, false);
        this.element.addEventListener('touchend', this.off, false);

        window.addEventListener('resize', this.resize)
    }

}
