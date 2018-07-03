import Component from '../../component.js';

export default class PhoneCatalog extends Component {
  constructor({ element, phones }) {
    super({ element });

    this.on('click', '[data-element="details-link"]', event => {
      let phoneElement = event.delegateTarget.closest('[data-element="phone"]');

      this.trigger('phone-selected', phoneElement.dataset.phoneId);
    });

    this.on('click', '[data-element="add-to-basket"]', event => {
      let phoneElement = event.delegateTarget.closest('[data-element="phone"]');

      this.trigger('add', phoneElement.dataset.phoneId);
    });
  }

  showPhones(phones) {
    this._phones = phones;
    this._render();
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
              
            <a href="#!/phones/${phone.id}" class="thumb" data-element="details-link">
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
  
            <a href="#!/phones/${phone.id}" data-element="details-link">${phone.name}</a>
            <p>${phone.snippet}</p>
          </li>
        
        `,
          )
          .join('')}
      </ul>
    `;
  }
}
