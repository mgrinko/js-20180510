import Component from '../../component.js';

export default class PhoneBasket extends Component {
  constructor({ element }) {
    super({ element });
    this._listPhones = [];

    if (this._listPhones) {
      this._render();
    }

    //Удаление телефонов
    this.on('click', '[data-element="basket-remove-item"]', event => {
      this.onRemovePhone(event.delegateTarget.dataset.phoneItem);
    });
  }

  //добавление в корзину
  onAddToBasket(phoneToBasket) {
    // переменная для проверки телефона в корзине
    const isEmpty = this._listPhones.includes(el => {
      if (el.name === phoneToBasket) {
        return true;
      }
    });
    // если телефона нет в корзине, то добалвяем
    if (!isEmpty) {
      this._listPhones.push({ name: phoneToBasket });
      this._render();
    }
  }

  // удаление из корзины
  onRemovePhone(phoneIndex) {
    this._listPhones.splice(phoneIndex, 1);
    this._render();
  }

  _render() {
    this._element.innerHTML = `<p>Shopping Cart</p>
        <ul>
          ${this._listPhones
            .map(
              (phone, index) => `
            <li>
              <div >${phone.name}</div> 
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
