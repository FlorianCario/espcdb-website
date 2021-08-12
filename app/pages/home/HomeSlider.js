import Component from 'classes/Component'
import gsap from 'gsap'

export default class HomeSlider extends Component {
  constructor() {
    super({
      element: '.js-hero__slider',
      elements: {
        nextButton: '.js-hero__control--next',
        prevButton: '.js-hero__control--prev',
        counter: '.js-slide__number',
        images: document.querySelectorAll('.js-slide__image')
      }
    })

    this.data = {
      current: 0,
      last: 0,
      total: this.elements.images.length - 1
    }

    this.state = {
      animating: false
    }
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)

    this.elements.counter.innerHTML = "1"

    this.init()
  }

  changeSlideNext() {
    this.state.animating = true
    const currentImageSlide = this.elements.images[this.data.last]
    const nextImageSlide = this.elements.images[this.data.current]

    const nextImageSlideImg = nextImageSlide.querySelector('img')

    const tl = gsap.timeline({
      paused: true,
      defaults: ({ ease: "expo.inOut", duration: 1.5 }),
      onComplete: () => this.state.animating = false
    });

    tl.set(nextImageSlide, {
      autoAlpha: 1,
      zIndex: 2
    })
      .set(currentImageSlide, {
        zIndex: 1
      })
      .fromTo(currentImageSlide, {
        xPercent: 0
      }, {
        xPercent: -25,
      }, 0)
      .fromTo(nextImageSlide, {
        xPercent: 100
      }, {
        xPercent: 0,
      }, 0)
      .fromTo(nextImageSlideImg, {
        xPercent: -100,
        scale: 1.4
      }, {
        xPercent: 0,
        scale: 1,
      }, 0)
      .set(currentImageSlide, {
        autoAlpha: 0,
      })

    tl.play()
  }


  changeSlidePrev() {
    this.state.animating = true
    const currentImageSlide = this.elements.images[this.data.last]
    const nextImageSlide = this.elements.images[this.data.current]

    const nextImageSlideImg = nextImageSlide.querySelector('img')

    const tl = gsap.timeline({
      paused: true,
      defaults: ({ ease: "expo.inOut", duration: 1.5 }),
      onComplete: () => this.state.animating = false
    });

    tl.set(nextImageSlide, {
      autoAlpha: 1,
      zIndex: 2
    })
      .set(currentImageSlide, {
        zIndex: 1
      })
      .fromTo(currentImageSlide, {
        xPercent: 0
      }, {
        xPercent: 25,
      }, 0)
      .fromTo(nextImageSlide, {
        xPercent: -100
      }, {
        xPercent: 0,
      }, 0)
      .fromTo(nextImageSlideImg, {
        xPercent: 100,
        scale: 1.4
      }, {
        xPercent: 0,
        scale: 1,
      }, 0)
      .set(currentImageSlide, {
        autoAlpha: 0,
        zIndex: 1
      })

    tl.play()
  }

  next() {
    if (this.state.animating) {
      return;
    }
    this.data.last = this.data.current;
    this.data.current = this.data.current === this.data.total ? 0 : this.data.current + 1
    this.elements.counter.innerHTML = this.data.current + 1
    this.changeSlideNext();
  }

  prev() {
    if (this.state.animating) return

    this.data.last = this.data.current
    this.data.current = this.data.current === 0 ? this.data.total : this.data.current - 1
    this.elements.counter.innerHTML = this.data.current + 1
    this.changeSlidePrev()
  }

  addListeners() {
    this.elements.nextButton.addEventListener('click', this.next)
    this.elements.prevButton.addEventListener('click', this.prev)
  }

  init() {
    this.addListeners();
  }
}
