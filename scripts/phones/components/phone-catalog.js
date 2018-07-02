import Component from '../../component.js';

export default class PhoneCatalog extends Component {
  constructor({ element, phones, addToBasket }) {
    super({ element });
    this._phones = phones;
    this._addToBasket = addToBasket;
    this._render();

    this.on('click', '[data-element="phone"]', event => {
      this._onPhoneClick(event);
    });
  }

  _onPhoneClick(event) {
    let phoneElement = event.delegateTarget;
    if (event.target.dataset.element === 'add-to-basket') {
      console.log(phoneElement.dataset.phoneId);
      this._addToBasket(phoneElement.dataset.phoneId);
    } else {
      this.trigger('phone-selected', phoneElement.dataset.phoneId);
    }
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${this._phones
          .map(
            phone => `
          
          <li class="thumbnail"
              data-element="phone"
              data-phone-id="${phone.id}">
              
            <a href="#!/phones/${phone.id}" class="thumb">
              <img
                alt="${phone.name}"
                src="${phone.imageUrl}"
              >
            </a>
  
            <div class="phones__btn-buy-wrapper" >
              <a class="btn btn-success" data-element="add-to-basket">
                Add
              </a>
            </div>
  
            <a href="#!/phones/${phone.id}">${phone.name}</a>
            <p>${phone.snippet}</p>
          </li>
        
        `,
          )
          .join('')}
      </ul>
    `;
  }
}
