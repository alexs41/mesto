export default class Card {
    static _template = document.querySelector('#element_template').content;

    constructor(link, name) {
        this.link = link;
        this.name = name;
    }

    like() {
        this.isLiked = !this.isLiked;
    }
    delete() {

    }
    openPopup() {

    }

    render(container) {
        this._view = Card._template.cloneNode(true).children[0];
        this._view.querySelector('.element__image').src = this.link;
        this._view.querySelector('.element__header').textContent= this.name;
        container.prepend(this._view);
        console.log('вывод ' + this.name);
    }
}