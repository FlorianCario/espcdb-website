import Component from 'classes/Component'

export default class Footer extends Component {
  constructor() {
    super({
      element: '.footer',
      elements: {
        buttonTop: '.footer__backTop',
      }
    })

    this.rootElement = document.body
    this.bind()
    this.addEvents()
  }

  bind() {
    ['scrollToTop'].forEach((fn) => this[fn] = this[fn].bind(this))
  }

  scrollToTop() {
    console.log(this.rootElement)
    this.rootElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  addEvents() {
    this.elements.buttonTop.addEventListener('click', this.scrollToTop)
  }
}

