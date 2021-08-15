import Animation from "classes/Animation";

export default class Parallax extends Animation {
  constructor({ element, elements }) {
    super({ element, elements })

    this.element = element
    this.media = element.querySelector('img')

  }
}
