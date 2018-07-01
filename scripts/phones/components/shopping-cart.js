import Component from '../../component.js';

export default class ShoppingCart extends Component {

    constructor({ element }) {
        super({ element });

        this._render();

        /* this.on('change', (event) => {
            this.trigger('phone-sorting', event.target.value);
        }); */
    }

    _render() {
        this._element.innerHTML = `
            <p>Shopping Cart</p>
            <ul>
                <li>Phone 1</li>
                <li>Phone 2</li>
                <li>Phone 3</li>
            </ul>
        `;
    }
}
