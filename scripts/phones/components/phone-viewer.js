import Component from '../../component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });
    this.on('click', '[data-element="back-button"]', () => {
      this.trigger('back');
    });

    this.on('click', '[data-element="add-button"]', () => {
      this.trigger('add', this._phone.id);
    });

    this.on('click', '[data-element="phone-thumbs"]', event => {
      let phoneImg = this._element.querySelector('[data-element="phone-img"]');
      phoneImg.src = event.target.src;
    });
  }

  showPhone(phoneDetails) {
    this._phone = phoneDetails;
    this._render(this._phone);
    this.show();
  }

  _render(phone) {
    this._element.innerHTML = `
      <img class="phone" src="${phone.images[0]}" data-element="phone-img">

      <button data-element="back-button">Back</button>
      <button data-element="add-button">Add to basket</button>

      <h1>${phone.name}</h1>
  
      <p>${phone.description}</p>
  
      <ul class="phone-thumbs">
      ${phone.images
        .map(
          img => `
        <li>
          <img src="${img}"  data-element="phone-thumbs">
        </li>`,
        )
        .join('')}
       
      </ul>
    `;
  }
}
