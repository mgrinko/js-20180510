import Component from '../../component.js';

export default class ShoppingCart extends Component {

    constructor({ element }) {
        super({ element });

        this._element.addEventListener('click', this._onButtonDelClick.bind(this));

        this._addedItems = new Set;
        this._render();
    }

    addPhone(phone) {
        this._addedItems.add(phone);
        this._render();
        this.show();
    }

    delPhone(phone) {
        console.log(phone);
        this._addedItems.delete(phone);
        this._render();
        this.show();
    }

    _render() {
        this._element.innerHTML = `
            <p>Shopping Cart</p>
            <ul>   ${Array.from(this._addedItems).map((phone) => `
                <li data-element="phone"
                data-phone-name="${ phone}">${phone} 
                <button data-element="button-del">del</button></li>`).join('')}
            </ul>
        `;
    }

    _onButtonDelClick(event) {
        let buttonDel = event.target.closest('[data-element="button-del"]');

        if (!buttonDel) {
            return;
        }

        let phoneElement = event.target.closest('[data-element="phone"]');
        this.trigger('phone-deleted', phoneElement.dataset.phoneName);
    }
}
