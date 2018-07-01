import Component from '../../component.js';

export default class PhoneViewer extends Component {
  showPhone(phoneDetails) {
    this._render(phoneDetails);
    this.show();
  }

  _render(phone) {
    console.log(phone);
    this._element.innerHTML = `
      <img class="phone" src="${phone.images[0]}">

      <button>Back</button>
      <button>Add to basket</button>
  
  
      <h1>${phone.name}</h1>
  
      <p>${phone.description}</p>
  
      <ul class="phone-thumbs">
          
      ${phone.images
        .map(
          img => `
        <li>
          <img src="${img}">
        </li>`,
        )
        .join('')}
       
      </ul>
    `;
  }
}
