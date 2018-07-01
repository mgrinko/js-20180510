import Component from '../../component.js';

export default class PhoneMenu extends Component {
  constructor({ element }) {
    super({ element });
    this._render();

    this.on('keyup', '[data-element="phone-search"]', (event) => {
      this._onSearch(event);
    });

    this.on('change', '[data-element="phone-sort"]', (event) => {
      this._onSort(event);
    });

    this.on('click', '[data-element="delete-item"]', (event) => {
      this._onDeleteFromCart(event);
    });
  }

  addToCart(item) {
    let cart = this._element.querySelector('[data-element="cart-content"]');
    cart.insertAdjacentHTML("beforeend", `<li>${ item } <a data-element="delete-item">[x]</a></li>`)
  }

  _onSearch(event) {
    if (event.keyCode !== 13) {
      return;
    }

    let searchInput = event.delegateTarget;
    this.trigger('search-initiated', searchInput.value);
  }

  _onSort(event) {
      let sortInput = event.delegateTarget;
      this.trigger('sort-initiated', sortInput[sortInput.selectedIndex].value);
  }

  _onDeleteFromCart(event) {
    let item = event.delegateTarget.closest('li');
    item.remove();
  }

  _render() {
    this._element.innerHTML = `

        <section>
          <p>
            Search:
            <input data-element="phone-search">
          </p>
  
          <p>
            Sort by:
            <select data-element="phone-sort">
              <option value="name">Alphabetical</option>
              <option value="age">Newest</option>
            </select>
          </p>
        </section>
  
        <section>
          <p>Shopping Cart</p>
          <ul data-element="cart-content">
            <li>Phone 1 <a data-element="delete-item">[x]</a></li>
            <li>Phone 2 <a data-element="delete-item">[x]</a></li>
            <li>Phone 3 <a data-element="delete-item">[x]</a></li>
          </ul>
        </section>
        
        `;
    }
}