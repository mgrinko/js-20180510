import Component from '../../component.js';

export default class PhoneCatalog extends Component {
  constructor({ element, phones }) {
    super({ element });

    this._phones = phones;

    this._render();

    this.on('click', '[data-element="phone"]', this._onPhoneClick);
  }

  _onPhoneClick(event) {
    let phoneElement = event.delegateTarget;

    console.log(phoneElement);
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${this._phones.map(phone => `
          
          <li class="thumbnail" data-element="phone">
            <a href="#!/phones/${ phone.id }" class="thumb">
              <img
                alt="${ phone.name }"
                src="${ phone.imageUrl }"
              >
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success">
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