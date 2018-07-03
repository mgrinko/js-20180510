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

    this.on('click', '[data-element="small-image"]', (event) => {
      let smallImage = event.delegateTarget;
      let largeImage = this._element.querySelector('[data-element="large-image"]');

      largeImage.src = smallImage.src;
    })
  }

  showPhone(phoneDetails) {
    this._phone = phoneDetails;
    this._render(this._phone);
    this.show();
  }

  _render(phone) {
    this._element.innerHTML = `
      <img
        data-element="large-image"
        class="phone"
        src="${ phone.images[0] }"
      >

      <button data-element="back-button">Back</button>
      <button data-element="add-button">Add to basket</button>
  
  
      <h1>${ phone.name }</h1>
  
      <p>${ phone.description }</p>
  
      <ul class="phone-thumbs">
        ${ phone.images.map(imageUrl => `

          <li>
            <img
              src="${ imageUrl }"
              data-element="small-image"
            >
          </li>
        
        `).join('')}
      </ul>
    `;
  }
}