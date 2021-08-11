import Component from 'classes/Component'
import gsap from 'gsap'
import imagesLoaded from 'imagesloaded'

export default class HomeSlider extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        logo: '.preloader__logo',
      }
    })

    this.bind()
    this.totalImages = document.querySelectorAll('img').length

    this.preloadImages()
  }

  bind() {
    ['preloadImages', 'animateOut'].forEach((fn) => this[fn] = this[fn].bind(this))
  }

  preloadImages() {
    this.imgLoaded = imagesLoaded(document.querySelectorAll('img'))
    this.imgLoaded.on('done', this.animateOut)
  }

  animateOut() {
    document.body.classList.remove('is-loading')
    this.tlPreloader = gsap.timeline({ defaults: { delay: 2 } })

    this.tlPreloader.fromTo(this.elements.logo, {
      autoAlpha: 1
    }, {
      autoAlpha: 0,
      duration: .5,
    }).to(this.element, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 1.3,
      ease: 'expo.out'
    }, '-=1.6')
      .set(this.element, {
        autoAlpha: 0
      }, '-=1')
  }
}

