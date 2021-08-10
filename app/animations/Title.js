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

    this.isRightAligned = false

    this.elementLinesSpans = this.element.querySelectorAll('span')
    if (this.element.dataset.align) {
      this.isRightAligned = true
    }
  }

  animateIn() {
    this.timelineIn = GSAP.timeline({ delay: .5 })

    each(this.elementLines, (line, index) => {
      this.timelineIn.fromTo(line, {
        autoAlpha: 0,
        x: this.isRightAligned ? -100 : 100,
      }, {
        autoAlpha: 1,
        x: 0,
        delay: index * 0.2,
        duration: 2,
        ease: 'expo.out',
      }, 0)
    })
  }
  animateOut() {

  }

  onResize() {
    this.elementLines = calculate(this.elementLinesSpans)
  }
}
