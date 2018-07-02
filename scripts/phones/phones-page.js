import PhoneService from './services/phone-service.js';

import PhoneFilters from './components/phone-filters.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';


export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initFilters();
    this._initShoppingCart();
  }

  _initCatalog() {
    this._catalogue = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getPhones(),
    });

    this._catalogue.on('phone-selected', (event) => {
      this._handlePhoneSelection(event);
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.on('back', () => {
      this._catalogue.show();
      this._viewer.hide();
    });
  }

  _initFilters() {
    this._filters = new PhoneFilters({
      element: this._element.querySelector('[data-component="phone-filters"]'),
    });

    this._filters.on('search', (data) => {
      console.log(data);
    });
  }

  _initShoppingCart() {
    this._shoppingCart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _handlePhoneSelection(event) {
    let phoneId = event.detail;
    let phoneDetails = PhoneService.getPhone(phoneId);

    this._catalogue.hide();
    this._viewer.showPhone(phoneDetails);
  }

  _render() {
    this._element.innerHTML = `
      <!--Sidebar-->
      <div class="col-md-2">
        <section>
          <div data-component="phone-filters"></div>  
        </section>
  
        <section>
          <div data-component="shopping-cart"></div>  
        </section>
      </div>
  
      <!--Main content-->
      <div class="col-md-10">
        <div data-component="phone-catalog"></div>
        <div data-component="phone-viewer" class="js-hidden"></div>
      </div>
    `;
  }
}
