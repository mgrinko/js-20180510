import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import PhoneSearch from './components/phone-search.js';
import PhoneSort from './components/phone-sort.js';
import ShoppingCart from './components/shopping-cart.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    //каталог    
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getPhones(),
    });

    this._catalog.on('phone-selected', (event) => {
      let phoneId = event.detail;
      let phoneDetails = PhoneService.getPhone(phoneId);

      this._catalog.hide();
      this._viewer.showPhone(phoneDetails);

      console.log(phoneId);
    });

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    //фильтр
    this._search = new PhoneSearch({
      element: this._element.querySelector('[data-component="phone-search"]'),
    });

    this._search.on('phone-searching', (event) => {
      this._catalog.updatePhones(PhoneService.getMatchedPhones(event.detail));
    });

    //сортировка
    this._sort = new PhoneSort({
      element: this._element.querySelector('[data-component="phone-sort"]'),
    });

    //TODO это просится в отдельную ф-цию
    this._catalog.sortPhones("name");

    this._sort.on('phone-sorting', (event) => {
      this._catalog.sortPhones(event.detail);
    });

    //корзина
    this._cart = new ShoppingCart({ 
      element: this._element.querySelector('[data-component="shopping-cart"]') 
    });
  }

  _render() {
    this._element.innerHTML = `
      <!--Sidebar-->
      <div class="col-md-2">
        <section>
          <div data-component="phone-search"></div>
          <div data-component="phone-sort"></div>
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