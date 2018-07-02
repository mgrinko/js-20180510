import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneSort from './components/phone-sort.js';
import PhoneBasket from './components/phone-basket.js';
import PhoneService from './services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._catalogue = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getPhones(),
      phonesAddedToBasket: this.phonesAddedToBasket,
    });

    this._catalogue.on('phone-selected', event => {
      let phoneId = event.detail;
      let phoneDetails = PhoneService.getPhone(phoneId);

      this._catalogue.hide();
      this._viewer.showPhone(phoneDetails);

      console.log(phoneId);
    });

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._sort = new PhoneSort({
      element: this._element.querySelector('[data-component="phone-sort"]'),
    });

    this._basket = new PhoneBasket({
      element: this._element.querySelector('[data-component="phone-basket"]'),
      phones: this.phonesAddedToBasket,
    });

    // для добавления телефонов в корзину
    this.phonesAddedToBasket = [];
    this.addToBasket = function onAddToBasket(phoneToBasket) {
      phonesAddedToBasket.push(phoneToBasket);
    };

    this._sort.on('sort-selected', event => {
      let sortBy = event.detail;

      let allPhone = PhoneService.getPhones().sort((a, b) => {
        if (a[sortBy] > b[sortBy]) return 1;
        if (a[sortBy] < b[sortBy]) return -1;
      });
      this._catalogue = new PhoneCatalog({
        element: this._element.querySelector('[data-component="phone-catalog"]'),
        phones: allPhone,
      });
      console.log(`выбранная сортировка:${sortBy}`);
    });
  }

  _render() {
    this._element.innerHTML = `
      <!--Sidebar-->
      <div class="col-md-2">
        <section>
          <div class="sidebar-elements">
            Search:
            <input>
          </div>
  
          <div class="sidebar-elements" data-component="phone-sort" />
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
