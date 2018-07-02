import Component from '../../component.js';

export default class serviceOptions extends Component {
  constructor({ element, phones }) {
    super({ element });

    /*this._phones = phones;*/

    this._render();

    /*this.on('click', '[data-element="phone"]', (event) => {
      this._onPhoneClick(event);
    });*/
  }

  /*_onPhoneClick(event) {
    let phoneElement = event.delegateTarget;

    this.generateEvent('phone-selected', phoneElement.dataset.phoneId);
  }*/

  _render() {
    this._element.innerHTML = `
      <section>
        <p>
          Search:
          <input data-filter>
        </p>
  
        <p>
          Sort by:
          <select data-sort-by>
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
          </select>
        </p>
      </section>
  
      <section>
        <p>Shopping Cart</p>
        <ul data-shopping-cart>
          <li>Phone 1</li>
          <li>Phone 2</li>
          <li>Phone 3</li>
        </ul>
      </section>
    `;
  }
}