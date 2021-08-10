import Component from 'classes/Component'
import gsap from 'gsap'
import imagesLoaded from 'imagesloaded'

export default class HomeSlider extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        logo: '.preloader__logo',
        percentage: '.preloader__percentage'
      }
    })

    this.bind()
    this.totalImages = document.querySelectorAll('img').length

    this.preloadImages()
  }

  bind() {
    ['preloadImages', 'animateOut', 'progress'].forEach((fn) => this[fn] = this[fn].bind(this))
  }

  preloadImages() {
    this.imgLoaded = imagesLoaded(document.querySelectorAll('img'))
    this.imgLoaded.on('progress', this.progress)
    this.imgLoaded.on('done', this.animateOut)
  }

  animateOut() {
    this.tlPreloader = gsap.timeline({ defaults: { delay: 2 } })

    this.tlPreloader.fromTo(this.element, {
      autoAlpha: 1
    }, {
      autoAlpha: 0,
      duration: .5,
    })
  }

  progress(instance, image) {
    if (image.isLoaded) {
      image.img.classList.add('is-loaded')

      this.loadedImages = document.querySelectorAll('img.is-loaded').length

      this.percentage = Math.round((this.loadedImages / this.totalImages) * 100)

      this.elements.percentage.innerHTML = this.percentage

      console.log(this.elements.percentage);
    }
  }
}

