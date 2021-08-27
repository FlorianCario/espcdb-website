import Component from 'classes/Component'

export default class Navigation extends Component {
    constructor() {
        super({
            element: '.navigation__desktop',
            elements: {
                dropdown: '.navigation__dropdown',
                dropdownContent: '.navigation__dropdown__content',
            }
        })

        this.dDLength = this.elements.dropdown.length
        this.bind()
        this.init()
    }

    bind() {
        ['addEvents', 'toggle'].forEach((fn) => this[fn] = this[fn].bind(this))
    }

    toggle(index) {
        if (!this.elements.dropdownContent[index].classList.contains('is-shown')) {
            this.elements.dropdownContent.forEach(element => {
                element.classList.remove('is-shown')
            })
        }
        this.elements.dropdownContent[index].classList.toggle('is-shown')
    }

    addEvents() {
        for (var i = 0; i < this.dDLength; i++) {
            this.elements.dropdown[i].addEventListener('click', this.toggle.bind(null, i))
        }
    }

    init() {
        this.addEvents()
    }

}

