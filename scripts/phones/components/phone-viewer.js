import Component from '../../component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });
    this.on('click', '[data-element="phone-thumbs"]', event => this._onClickImage(event));
  }

  showPhone(phoneDetails) {
    this._render(phoneDetails);
    this.show();
  }

  _onClickImage(event) {
    if (event.target.tagName !== 'IMG') {
      return;
    }
    let phoneImg = this._element.querySelector('[data-element="phone-img"]');
    phoneImg.src = event.target.src;
  }

  _render(phone) {
    console.log(phone);
    this._element.innerHTML = `
      <img class="phone" src="${phone.images[0]}" data-element="phone-img">

      <button>Back</button>
      <button>Add to basket</button>
  
  
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
