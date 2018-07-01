import Component from '../../component.js';

export default class PhoneCatalog extends Component {
  constructor({ element, phones }) {
    super({ element });

    this.setPhoneList(phones);

    this.on('click', '[data-element="phone"]', (event) => {
      this._onPhoneClick(event);
    });

    this.on('click', '[data-element="phone-add"]', (event) => {
      this._onAddClick(event);
    });
  }

  setPhoneList(phones) {
    this._phones = phones;
    this._render();
  }

  _onPhoneClick(event) {
    if (event.target.dataset.element === 'phone-add') {
      return;
    }
    let phoneElement = event.delegateTarget;
    this.trigger('phone-selected', phoneElement.dataset.phoneId);
  }

  _onAddClick(event) {
    let phoneElement = event.delegateTarget.closest('[data-element="phone"]');
    this.trigger('phone-added', phoneElement.dataset.phoneName);
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${this._phones.map(phone => `
          
          <li class="thumbnail"
              data-element="phone"
              data-phone-id="${ phone.id }"
              data-phone-name="${ phone.name }">
              
            <a href="#!/phones/${ phone.id }" class="thumb">
              <img
                alt="${ phone.name }"
                src="${ phone.imageUrl }"
              >
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success" data-element="phone-add">
                Add
              </a>
            </div>
  
            <a href="#!/phones/${ phone.id }">${ phone.name }</a>
            <p>${ phone.snippet }</p>
          </li>
        
        `).join('')}
      </ul>
    `;
  }
}