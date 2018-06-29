import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import Sidebar from './components/sidebar.js';
import Component from '../component.js';

export default class PhonesPage extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    this._catalogue = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getPhones(),
    });

    this._sidebar = new Sidebar({
        element: this._element.querySelector('[data-component="sidebar"]'),
    });

    this._sidebar.on('change', '.sort-form', (event) => {
          this._catalogue = new PhoneCatalog({
              element: this._element.querySelector('[data-component="phone-catalog"]'),
              phones: event.delegateTarget.value === 'age' ?
                  PhoneService.getPhones() :
                  PhoneService.getPhonesSortedByName()
          });
     });

    this._catalogue.on('phone-selected', (event) => {
        console.log(event);
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
      <div class="col-md-2" data-component="sidebar">        
      </div>
  
      <!--Main content-->
      <div class="col-md-10">
        <div data-component="phone-catalog"></div>
        <div data-component="phone-viewer" class="js-hidden"></div>
      </div>
    `;
  }
}