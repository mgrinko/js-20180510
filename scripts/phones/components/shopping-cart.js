import Component from '../../component.js';

export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({ element });

    this._items = ['1', '2', '3'];

    this._render();

    this.on('click', '[data-element="item-remover"]', (event) => {
      const itemToRemove = event.delegateTarget.dataset.item;
      this.removeItem(itemToRemove);
    });
  }

  addItem(itemToAdd) {
    this._items.push(itemToAdd);
    this._render();
  }

  removeItem(itemToRemove) {
    this._items = this._items.filter(item => itemToRemove !== item);
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        ${ this._items.map(item => `

          <li>
            ${ item }
            <button
              data-element="item-remover"
              data-item="${item}"
            >
              x
            </button>
          </li>
          
        `).join('') }
      </ul>
    `;
  }
}