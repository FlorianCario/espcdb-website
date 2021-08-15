import Animation from "classes/Animation";
import GSAP from 'gsap'

export default class Line extends Animation {
  constructor({ element, elements }) {
    super({ element, elements })

    console.log("line");
  }

  animateIn() {
    this.timelineIn = GSAP.timeline({ delay: .5 })

    this.timelineIn.fromTo(this.element, {
      scaleX: 0,
      transformOrigin: 'left center'
    }, {
      scaleX: 1,
      ease: 'power3.out',
      duration: 1.5,
      delay: .5
    })
  }
  animateOut() {

  }

  onResize() {

  }
}
