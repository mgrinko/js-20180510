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
    });

    this._catalogue.on('phone-selected', (event) => {
      let phoneId = event.detail;

      this.onPhoneSelected(phoneId);
    });

    this._catalogue.on('add', (event) => {
      let phoneId = event.detail;

      this._shoppingCart.addItem(phoneId);
    });

    PhoneService.getPhones()
      .then((phones) => {
        this._catalogue.showPhones(phones);
      });
  }

  onPhoneSelected(phoneId) {
    let loadPhonePromise = PhoneService.getPhone(phoneId);
    let rightClickPromise = new Promise((resolve, reject) => {
      document.addEventListener('contextmenu', resolve);
    });

    // Promise.all([loadPhonePromise, rightClickPromise])

    rightClickPromise
      .then(() => loadPhonePromise)
      .then((phoneDetails) => {
        this._catalogue.hide();
        this._viewer.showPhone(phoneDetails);
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

    this._viewer.on('add', (event) => {
      let phoneId = event.detail;

      this._shoppingCart.addItem(phoneId);
    });
  }

  _initFilters() {
    this._filters = new PhoneFilters({
      element: this._element.querySelector('[data-component="phone-filters"]'),
    });

    this._filters.on('sort', (event) => {
      PhoneService.getPhones({ order: event.detail })
        .then((sortedPhones) => {
          this._catalogue.showPhones(sortedPhones);
        });
    });

    this._filters.on('search', (event) => {
      PhoneService.getPhones({ query: event.detail })
        .then((sortedPhones) => {
          this._catalogue.showPhones(sortedPhones);
        });
    });
  }

  _initShoppingCart() {
    this._shoppingCart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });
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
