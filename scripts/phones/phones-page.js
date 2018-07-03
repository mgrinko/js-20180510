import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneFilters from './components/phone-filters.js';
import PhoneBasket from './components/phone-basket.js';

import PhoneService from './services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initFilters();
    this._initBasket();
  }

  _initCatalog() {
    this._catalogue = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });

    this._catalogue.on('phone-selected', event => {
      let phoneId = event.detail;

      // для просмотра конкретного телефона
      PhoneService.getPhone(phoneId, phoneDetails => {
        this._catalogue.hide();
        this._viewer.showPhone(phoneDetails);
      });
    });

    this._catalogue.on('add', event => {
      let phoneId = event.detail;

      this._basket.onAddToBasket(phoneId);
    });

    // для получения всего списка телефонов
    PhoneService.getPhones({
      successCallback: phones => {
        this._catalogue.showPhones(phones);
      },
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

    this._viewer.on('add', event => {
      let phoneId = event.detail;
      this._basket.onAddToBasket(phoneId);
    });
  }

  _initFilters() {
    this._filters = new PhoneFilters({
      element: this._element.querySelector('[data-component="phone-filters"]'),
    });

    this._filters.on('sort', event => {
      let sortedPhones = PhoneService.getPhones({ order: event.detail });

      this._catalogue.showPhones(sortedPhones);
    });

    this._filters.on('search', event => {
      let sortedPhones = PhoneService.getPhones({ query: event.detail });

      this._catalogue.showPhones(sortedPhones);
    });
  }

  _initBasket() {
    this._basket = new PhoneBasket({
      element: this._element.querySelector('[data-component="phone-basket"]'),
    });
  }

  _render() {
    this._element.innerHTML = `
      <!--Sidebar-->
      <div class="col-md-2">
        <section >
          <div class="sidebar-elements" data-component="phone-filters" />
        </section>
        
        <section>
          <div class="sidebar-elements" data-component="phone-basket" />
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
