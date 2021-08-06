import each from 'lodash/each'
import map from 'lodash/map'

import Title from 'animations/Title'


export default class Page {
  constructor({ id, element, elements }) {
    this.selector = element
    this.selectorChildren = {
      animationsTitles: '[data-animation="title"]',
      ...elements,
    }
    this.id = id
  }

  create() {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    each(this.selectorChildren, (entry, key) => {
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
        this.elements[key] = entry
      } else {
        this.elements[key] = document.querySelectorAll(entry)

        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })
    this.createAnimations()
  }

  createAnimations() {
    this.animations = []

    // titles
    this.animationsTitles = map(this.elements.animationsTitles, element => {
      return new Title({
        element
      })
    })

    this.animations.push(...this.animationsTitles)
  }

  onResize() {
    each(this.animations, animation => {
      animation.onResize()
    })
  }
}
