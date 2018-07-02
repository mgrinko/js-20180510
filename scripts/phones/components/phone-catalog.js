import Component from '../../component.js';

export default class PhoneCatalog extends Component {

    constructor({ element, phones }) {
        super({ element });

        this._phones = phones;

        this._render();
        this._addEvents();
    }

    _addEvents() {
        this.on('click', '[data-element="phone"]', (event) => {
            if (event.target.closest('[data-element="details-link"]')) {
                this._onPhoneClick(event);
            }
        });

        this.on('click', '.phones__btn-buy', (event) => {
            this._onPhoneBuyClick(event);
        });
    }

    _onPhoneBuyClick(event) {
        const phoneElement = event.delegateTarget.closest('[data-element="phone"]');
        const phoneName = phoneElement.dataset.phoneName;

        this.trigger('phone-add-to-cart', phoneName);
    }

    _onPhoneClick(event) {
        let phoneElement = event.delegateTarget;

        this.trigger('phone-selected', phoneElement.dataset.phoneId);
    }

    _render() {
        this._element.innerHTML = `
            <ul class="phones">
            ${this._phones.map(phone => `

                <li class="thumbnail""
                    data-element="phone"
                    data-phone-id="${ phone.id }"
                    data-phone-name="${ phone.name }"
                    data-phone-age="${ phone.age }">
                  
                    <a href="#!/phones/${ phone.id }" class="thumb">
                        <img data-element="details-link"
                            alt="${ phone.name }"
                            src="${ phone.imageUrl }"
                        >
                    </a>
                
                    <div class="phones__btn-buy-wrapper">
                        <a class="btn btn-success phones__btn-buy">Add</a>
                    </div>
                
                    <a href="#!/phones/${ phone.id }"
                       class="js-filter-name"
                       data-element="details-link">${ phone.name }
                    </a>
                    <p class="js-filter-description">${ phone.snippet }</p>
                </li>
            
            `).join('')}
            </ul>
        `;
    }

}