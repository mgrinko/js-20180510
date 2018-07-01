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
          <ul>
            <li>Phone 1</li>
            <li>Phone 2</li>
            <li>Phone 3</li>
          </ul>
        </section>
        
        `;
    }
}