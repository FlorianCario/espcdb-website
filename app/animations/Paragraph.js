import Animation from "classes/Animation";
import GSAP from 'gsap'
import each from "lodash/each";
import { calculate, split } from 'utils/text'

export default class Paragraph extends Animation {
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

    this.elementLinesSpans = this.element.querySelectorAll('span')
  }

  animateIn() {
    this.timelineIn = GSAP.timeline({ delay: .2 })
    this.timelineIn.set(this.element, {
      autoAlpha: 1
    })
    each(this.elementLines, (line, index) => {
      this.timelineIn.fromTo(line, {
        yPercent: 100,
      }, {
        yPercent: 0,
        duration: 1.5,
        ease: 'expo.out',
      }, 0)
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
