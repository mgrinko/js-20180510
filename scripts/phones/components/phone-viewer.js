import Component from '../../component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });
    this.on('click', '[data-element="gallery-thumbs"]', (event) => this._onGalleryClick(event));
  }

  showPhone(phoneDetails) {
    this._render(phoneDetails);
    this.show();
  }

  _onGalleryClick(event) {
    if (event.target.tagName !== 'IMG') {
      return;
    }
    let mainPicture = this._element.querySelector('[data-element="main-pic"]');
    mainPicture.src = event.target.src;
  }

  _render(phone) {
    console.log(phone);
    this._element.innerHTML = `
      <img class="phone" data-element="main-pic" src="${ phone.images[0] }">

      <button>Back</button>
      <button>Add to basket</button>
  
  
      <h1>${ phone.name }</h1>
  
      <p>${ phone.description }</p>
  
      <ul class="phone-thumbs" data-element="gallery-thumbs">
        ${ phone.images.map( image => `
            <li>
                <img src="${image}" >
            </li>
            ` ).join('') }
      </ul>
    `;
  }
}