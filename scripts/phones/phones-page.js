import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneMenu from './components/phone-menu.js';
import PhoneService from './services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._catalogue = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getPhones(),
    });

    this._catalogue.on('phone-selected', (event) => {
      let phoneId = event.detail;
      let phoneDetails = PhoneService.getPhone(phoneId);

      this._catalogue.hide();
      this._viewer.showPhone(phoneDetails);

      console.log(phoneId);
    });

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._menu = new PhoneMenu({
      element: this._element.querySelector('[data-component="phone-menu"]'),
    });

    this._menu.on('search-initiated', (event) => {
      let query = event.detail;
      let searchResult = PhoneService.search(query);
      this._viewer.hide();
      this._catalogue.show();
      this._catalogue.setPhoneList(searchResult);
    });

    this._menu.on('sort-initiated', (event) => {
      let sortBy = event.detail;
      let sortResult = PhoneService.sort(sortBy);
      this._viewer.hide();
      this._catalogue.show();
      this._catalogue.setPhoneList(sortResult);
    });
  }

  _render() {
    this._element.innerHTML = `
      <!--Sidebar-->
      <div class="col-md-2" data-component="phone-menu"></div>
  
      <!--Main content-->
      <div class="col-md-10">
        <div data-component="phone-catalog"></div>
        <div data-component="phone-viewer" class="js-hidden"></div>
      </div>
    `;
  }
}