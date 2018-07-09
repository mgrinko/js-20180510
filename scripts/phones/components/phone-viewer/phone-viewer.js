import Component from '../../../component.js';

import templateFunction from './phone-viewer.hbs';
import './phone-viewer.css';


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
    this._element.innerHTML = templateFunction({
      phone: phone,
    });
  }
}
