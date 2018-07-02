import Component from '../../component.js';

export default class PhoneBasket extends Component {
  constructor({ element, listPhones }) {
    super({ element });
    this._listPhone = listPhones;

    this.onAddToBasket = this.onAddToBasket.bind(this);

    if (this._listPhone) {
      this._render();
    }
  }

  //добавление в корзину
  onAddToBasket(phoneToBasket) {
    // переменная ндля проверки телефона в корзине
    const isEmpty = this._listPhone.forEach(el => {
      if (el.name === phoneToBasket) {
        return true;
      }
    });

    // если телефона нет в корзине, то добалвяем
    if (!isEmpty) {
      this._listPhone.push({ name: phoneToBasket });
      this._render();
    }
  }

  // удаление из корзины
  onRemovePhone(phoneIndex) {
    this._listPhone.splice(phoneIndex, 1);
    this._render();
  }

  _render() {
    this._element.innerHTML = `<p>Shopping Cart</p>
        <ul>
          ${this._listPhone
            .map(
              (phone, index) => `
            <li>
              <div >${phone.name}</div> 
              <div class="basket-remove-item" data-phone-item="${index}">[X]</div>
            </li>
            
            `,
            )
            .join('')}
        </ul>
      `;
  }
}
