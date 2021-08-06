import Animation from "classes/Animation";
import GSAP from 'gsap'
import each from "lodash/each";
import { calculate, split } from 'utils/text'

export default class Title extends Animation {
  constructor({ element, elements }) {
    super({ element, elements })

    split({
      element: this.element,
      append: true
    })

    split({
      element: this.element,
      append: true
    })

    this.elementLinesSpans = this.element.querySelectorAll('span span')
  }

  animateIn() {
    GSAP.set(this.element, {
      autoAlpha: 1
    })
    each(this.elementLines, (line, index) => {
      GSAP.fromTo(line, {
        yPercent: 100
      }, {
        yPercent: 0,
        delay: 0.5 + index * 0.2,
        duration: 2,
        ease: 'expo.out',
      })
    })
  }
  animateOut() {

    GSAP.set(this.element, {
      autoAlpha: 0,
    })
  }

  onResize() {
    this.elementLines = calculate(this.elementLinesSpans)
  }
}
