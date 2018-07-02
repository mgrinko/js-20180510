import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneSort from './components/phone-sort.js';
import PhoneSearch from './components/phone-search.js';
import PhoneBasket from './components/phone-basket.js';
import PhoneService from './services/phone-service.js';
import Component from '../component.js';

export default class PhonesPage extends Component {
  constructor({ element }) {
    super({ element });
    this._element = element;
    this.listPhones = [];
    this._render();

    this._search = new PhoneSearch({
      element: this._element.querySelector('[data-component="phone-search"]'),
    });

    this._search.on(
      'input',
      '.input-search',
      this.throttle(event => {
        const serchValue = event.target.value;
        let searchPhone = [];
        if (serchValue) {
          searchPhone = PhoneService.getPhones().filter(el => {
            return el.name.toUpperCase().indexOf(serchValue.toUpperCase()) > 0;
          });
        }
        this._catalogue = new PhoneCatalog({
          element: this._element.querySelector('[data-component="phone-catalog"]'),
          phones: searchPhone.length > 0 ? searchPhone : PhoneService.getPhones(),
          addToBasket: this._basket.onAddToBasket,
        });
      }, 1100),
    );

    this._sort = new PhoneSort({
      element: this._element.querySelector('[data-component="phone-sort"]'),
    });

    this._basket = new PhoneBasket({
      element: this._element.querySelector('[data-component="phone-basket"]'),
      listPhones: this.listPhones,
    });

    //Удаление телефонов
    this._basket.on('click', '.basket-remove-item', event => {
      this._basket.onRemovePhone(event.delegateTarget.dataset.phoneItem);
    });

    this._sort.on('sort-selected', event => {
      let sortBy = event.detail;

      let allPhone = PhoneService.getPhones().sort((a, b) => {
        if (a[sortBy] > b[sortBy]) return 1;
        if (a[sortBy] < b[sortBy]) return -1;
      });

      this._catalogue = new PhoneCatalog({
        element: this._element.querySelector('[data-component="phone-catalog"]'),
        phones: allPhone,
        addToBasket: this._basket.onAddToBasket,
      });
      console.log(`выбранная сортировка:${sortBy}`);
    });

    this._catalogue = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getPhones(),
      addToBasket: this._basket.onAddToBasket,
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
  }

  _render() {
    this._element.innerHTML = `
      <!--Sidebar-->
      <div class="col-md-2">
        <section>
          <div class="sidebar-elements" data-component="phone-search" />
        </section>
        <section>
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
