import Component from '../../component.js';

export default class ShoppingCart extends Component {

    constructor({ element }) {
        super({ element }) ;

        this._storage = {};

        this._render();
        this._addEvents();
    }

    _addEvents() {
        this.on('click', '.cart__remove-phone', (event) => {
            this._onRemovePhoneClick(event);
        });
    }

    _onRemovePhoneClick(event) {
        const phoneToRemove = event.delegateTarget.dataset.phoneToRemove;
        this.remove(phoneToRemove);
    }

    add(phoneName) {
        if (phoneName in this._storage) {
            this._storage[phoneName] ++;
        } else {
            this._storage[phoneName] = 1;
        }

        this._reloadCart();
    }

    remove(phoneName) {
        if (!phoneName in this._storage) {
            return;
        }

        if (this._storage[phoneName] > 1) {
            this._storage[phoneName]--;
        } else {
            delete this._storage[phoneName];
        }

        this._reloadCart();
    }

    _reloadCart() {
        let html = '';

        for (let item in this._storage) {
            html += `
                <li>
                    <span 
                        data-phone-to-remove="${ item }"
                        class="cart__remove-phone glyphicon glyphicon-remove">
                    </span>
                    <span class="cart__phone-name">${ item } (${this._storage[item]})</span>
                </li>
            `;
        }

        this._element.querySelector('ul').innerHTML = html;
    }

    _render() {
        this._element.innerHTML = `
            <p>Shopping Cart</p>
            <ul class="cart"></ul>
        `;
    }

}

