import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import ServiceOptions from './components/service-options.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._catalogue = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getPhones(),
    });
    this._serviceOptions = new ServiceOptions({
      element: this._element.querySelector('[data-component="service-options"]'),
      //shoppingCart: this.getShoppingCart()
    });

    this._catalogue.on('phone-selected', (event) => {
      let phoneId = event.detail;
      let phoneDetails = PhoneService.getPhone(phoneId);

      this._catalogue.hide();
      this._viewer.showPhone(phoneDetails);

      console.log(phoneId);
    });

    this._serviceOptions.on('phone-sorted', (event) => {
      let sortParam = event.detail;
      PhoneCatalog.prototype.sortBy(sortParam);
      console.log(sortParam);
    });
    this._serviceOptions.on('phone-filtered', (event) => {
      let filterParam = event.detail;
      PhoneCatalog.filterByName(filterParam);
      console.log(filter,'<-fi');
    });

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

  }

  _render() {
    this._element.innerHTML = `
      <!--Sidebar-->
      <div class="col-md-2" data-component="service-options">      
      </div>
  
      <!--Main content-->
      <div class="col-md-10">
        <div data-component="phone-catalog"></div>
        <div data-component="phone-viewer" class="js-hidden"></div>
      </div>
    `;
  }
  yell(){
    this._serviceOptions.getShoppingCart();
  }  

}