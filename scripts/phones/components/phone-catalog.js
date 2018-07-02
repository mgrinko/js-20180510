import Component from '../../component.js';

export default class PhoneCatalog extends Component {
  constructor({ element }) {
    super({ element });

    this._phones = [];

    this._render();

    this.on('click', '[data-element="details-link"]', (event) => {
      let phoneElement = event.delegateTarget.closest('[data-element="phone"]');

      this.trigger('phone-selected', phoneElement.dataset.phoneId);
    });

    this.on('click', '[data-element="add-button"]', (event) => {
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
        ${this._phones.map(phone => `
          
          <li class="thumbnail"
              data-element="phone"
              data-phone-id="${ phone.id }">
              
            <a
              data-element="details-link"
              href="#!/phones/${ phone.id }"
              class="thumb"
            >
              <img
                alt="${ phone.name }"
                src="${ phone.imageUrl }"
              >
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a
                data-element="add-button"
                class="btn btn-success"
              >
                Add
              </a>
            </div>
  
            <a
              href="#!/phones/${ phone.id }"
              data-element="details-link"
            >
              ${ phone.name }
            </a>
            
            <p>${ phone.snippet }</p>
          </li>
        
        `).join('')}
      </ul>
    `;
  }
}