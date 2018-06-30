import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import Component from '../component.js';

export default class PhonesPage extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    this._sortControl = this._element.querySelector('#sort');
    this._sortField = this._sortControl.value;

    this._sort(this._sortField);

    this.on('change', '#sort', (event) => {
        this._sort(event.delegateTarget.value);
    });

    this._catalogue.on('phone-selected', (event) => {
      let phoneId = event.detail;
      let phoneDetails = PhoneService.getPhone(phoneId);

      this._catalogue.hide();
      this._viewer.showPhone(phoneDetails);
    });

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });
  }

  _sort(field) {
    this._catalogue = new PhoneCatalog({
        element: this._element.querySelector('[data-component="phone-catalog"]'),
        phones: PhoneService.getPhones({
            sort: field
        }),
    });
  }

  _render() {
    this._element.innerHTML = `
      <!--Sidebar-->
      <div class="col-md-2">
        <section>
          <p>
            Search:
            <input>
          </p>
  
          <p>
            Sort by:
            <select id="sort">
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
            </select>
          </p>
        </section>
  
        <section>
          <p>Shopping Cart</p>
          <ul>
            <li>Phone 1</li>
            <li>Phone 2</li>
            <li>Phone 3</li>
          </ul>
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