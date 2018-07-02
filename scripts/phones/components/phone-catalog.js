import Component from '../../component.js';

export default class PhoneCatalog extends Component {
  constructor({ element, phones }) {
    super({ element });

    this._phones = phones;

    this._element.addEventListener('click', this._onButtonAddClick.bind(this));
    this._element.addEventListener('click', this._onPhoneClick.bind(this));
    

    this._render();
  }

  updatePhones(phones) {
    this._phones = phones;
    this._render();
  }

  sortPhones(sortType) {
    this._phones = this._phones.sort((a, b) => a[sortType] > b[sortType] ? 1 : -1);
    this._render();
  }

  _onPhoneClick(event) {

    if (event.target.closest('[data-element="button-add"]')) {
      return
    }

    let phoneElement = event.target.closest('[data-element="phone"]');
    this.trigger('phone-selected', phoneElement.dataset.phoneId);
  }

  _onButtonAddClick(event) {
    let buttonAdd = event.target.closest('[data-element="button-add"]');

    if (!buttonAdd) {
      return;
    }

    let phoneElement = event.target.closest('[data-element="phone"]');
    this.trigger('phone-added', phoneElement.dataset.phoneName);
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${this._phones.map((phone) => `
          
          <li class="thumbnail"
              data-element="phone"
              data-phone-id="${ phone.id}"
              data-phone-name="${ phone.name}">
              
            <a href="#!/phones/${ phone.id}" class="thumb">
              <img
                alt="${ phone.name}"
                src="${ phone.imageUrl}"
              >
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success" data-element="button-add">
                Add
              </a>
            </div>
  
            <a href="#!/phones/${ phone.id}">${phone.name}</a>
            <p>${ phone.snippet}</p>
          </li>
        
        `).join('')}
      </ul>
    `;
  }
}