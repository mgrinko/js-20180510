import Component from '../../component.js';

export default class PhoneViewer extends Component {

    constructor({ element }) {
        super({ element });

        this._addEvents();
    }

    showPhone(phoneDetails) {
        this._render(phoneDetails);
        this.show();
    }

    _addEvents() {
        this.on('click', '.phone-thumbs li', (event) => {
            this._onThumbClick(event);
        });

        this.on('click', '.phone-viewer__add-to-cart', (event) => {
            this._onAddToCartClick(event);
        });

        this.on('click', '.phone-viewer__back', () => {
            this._onBackClick();
        });
    }

    _onBackClick() {
        this.trigger('back-to-catalogue', null);
    }

    _onAddToCartClick(event) {
        const phoneName = event.delegateTarget.dataset.phoneName;
        this.trigger('phone-add-to-cart', phoneName);
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
            
            <button class="phone-viewer__back">Back</button>
            <button class="phone-viewer__add-to-cart" data-phone-name="${ phone.name }">Add to basket</button>
            
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