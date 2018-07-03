import Component from '../../component.js';

export default class PhoneBasket extends Component {
  constructor({ element }) {
    super({ element });
    this._listPhones = new Set();

    if (this._listPhones.lenght > 0) {
      this._render();
    }

    //Удаление телефонов
    this.on('click', '[data-element="basket-remove-item"]', event => {
      this.onRemovePhone(event.delegateTarget.dataset.phoneItem);
    });
  }

  //добавление в корзину
  onAddToBasket(phoneItem) {
    this._listPhones.add(phoneItem);
    this._render();
  }

  // удаление из корзины
  onRemovePhone(phoneItem) {
    this._listPhones.delete(phoneItem);
    this._render();
  }

  _render() {
    const phoneItems = Array.from(this._listPhones);

    this._element.innerHTML = `<p>Shopping Cart</p>
        <ul>
          ${phoneItems
            .map(
              (phone, index) => `
            <li>
              <div >${phone}</div> 
              <div class="basket-remove-item" 
              data-element="basket-remove-item"
              data-phone-item="${index}">[X]</div>
            </li>
            
            `,
            )
            .join('')}
        </ul>
      `;
  }
}
