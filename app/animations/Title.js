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

    this.elementLinesSpans = this.element.querySelectorAll('span')
  }

  animateIn() {
    this.timelineIn = GSAP.timeline({ delay: .5 })
    this.timelineIn.set(this.element, {
      autoAlpha: 1
    })
    each(this.elementLines, (line, index) => {
      this.timelineIn.fromTo(line, {
        autoAlpha: 0,
        x: 100,
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

    GSAP.set(this.element, {
      autoAlpha: 0,
    })
  }

  onResize() {
    this.elementLines = calculate(this.elementLinesSpans)
  }
}
