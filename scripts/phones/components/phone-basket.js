import Component from '../../component.js';

export default class PhoneBasket extends Component {
  constructor({ element, phones }) {
    super({ element });
    this._phones = phones;
    if (this._phones) {
      this._render();
    }
  }

  _render() {
    this._element.innerHTML = `<p>Shopping Cart</p>
        <ul>
          ${this._phones
            .map(
              phone => `
            <li>${phone.name}</li>
            `,
            )
            .join('')}
        </ul>
      `;
  }
}
