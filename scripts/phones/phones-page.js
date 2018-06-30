import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import SidebarForms from './components/sidebar-search-form.js';
import SidebarShoppingList from './components/sidebar-shopping-list.js';
import Component from '../component.js';

export default class PhonesPage extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    this._catalogue = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getPhones(),
    });

    this._searchForm = new SidebarForms({
        element: this._element.querySelector('[data-component="search-form"]'),
    });

    this._shoppingList = new SidebarShoppingList({
        element: this._element.querySelector('[data-component="shopping-list"]'),
    });

    this._searchForm.on('change', '.sort-form', event => {
          this._catalogue = new PhoneCatalog({
              element: this._element.querySelector('[data-component="phone-catalog"]'),
              phones: event.delegateTarget.value === 'age' ?
                  PhoneService.getPhones() :
                  PhoneService.getPhonesSortedByName()
          });
     });

    this._searchForm.on('input', '.search-form', this.throttle(() =>
        this._catalogue = new PhoneCatalog({
            element: this._element.querySelector('[data-component="phone-catalog"]'),
            phones: PhoneService.getPhoneFromSearchEngine()
        }), 1200)
    );

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
      <div class="col-md-2">  
      <section data-component="search-form"></section>
      <section data-component="shopping-list"></section>      
      </div>
  
      <!--Main content-->
      <div class="col-md-10">
        <div data-component="phone-catalog"></div>
        <div data-component="phone-viewer" class="js-hidden"></div>
      </div>
    `;
  }
}