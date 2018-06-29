import Component from '../../component.js';

export default class PhoneViewer extends Component {

    showPhone(phoneDetails) {
        this._render(phoneDetails);
        this.show();
        this.on('click', '.phone-thumbnail', (event) => {
            this._currentImage = this._element.querySelector('.phone');
            this._currentImage.setAttribute('src', event.delegateTarget.dataset.image)
        })
    }

    _render(phone) {
        this._element.innerHTML = `
      <img class="phone" src="${phone.images[0]}">
      
      <button onclick="document.location.reload()">Back</button>
      <button>Add to basket</button>    
      
      <h1>${phone.name}</h1>  
      <p>${phone.description}</p>  
      
      <ul class="phone-thumbs">      
      ${phone.images.map(image => `
        <li class="phone-thumbnail" data-image="${image}">
            <img src="${image}">
        </li>
      `).join('')}        
      </ul>
    `;
    }
}