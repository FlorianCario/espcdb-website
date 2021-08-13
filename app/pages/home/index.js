import Page from 'classes/page'

import HomeSlider from './HomeSlider'
import NewsCarousel from './NewsCarousel'

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '#h',
    })
  }

  create() {
    super.create()
    this.createComponents()
  }

  createComponents() {
    this.homeSlider = new HomeSlider()
    this.newsCarousel = new NewsCarousel()
  }

}
