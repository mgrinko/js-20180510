import Component from '../../component.js';

export default class PhoneViewer extends Component {

  showPhone(phoneDetails) {
    this._render(phoneDetails);
    this.show();

    this.on('click', '.phone-thumbs li', (event) => {
        this._onThumbClick(event);
    });
  }

  _onThumbClick(event) {
      const thumb = event.delegateTarget.querySelector('img');
      const bigPicture = this._element.querySelector('.phone');
      const src = thumb.getAttribute('src');

      bigPicture.setAttribute('src', src);
  }

  _render(phone) {
    this._element.innerHTML = `
      <img class="phone" src="${ phone.images[0] }">

      <button>Back</button>
      <button>Add to basket</button>
  
      <h1>${ phone.name }</h1>
      <p>${ phone.description }</p>
  
      <ul class="phone-thumbs">
        ${ phone.images.map(imageUrl => `
            <li><img src="${ imageUrl }"></li>`
        ).join('')}
      </ul>
    `;
  }
}