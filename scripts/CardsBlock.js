export default class CardsBlock {
    static _template = document.querySelector('#element_template').content;

    constructor(cards) {
        this._cards = cards;
    }
    render = (container) => {
        // console.log("this._cards", this._cards);
        this._view = CardsBlock._template.cloneNode(true).children[0];
        container.prepend(this._view);
    }
}