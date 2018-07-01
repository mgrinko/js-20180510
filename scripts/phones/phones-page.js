import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneSort from './components/phone-sort.js';
import PhoneSearch from './components/phone-search.js';
import Component from '../component.js';

export default class PhonesPage extends Component {

    constructor({ element }) {
        super({ element });

        this._render();

        this._catalogue = new PhoneCatalog({
            element: this._element.querySelector('[data-component="phone-catalog"]'),
            phones: PhoneService.getPhones()
        });

        this._viewer = new PhoneViewer({
            element: this._element.querySelector('[data-component="phone-viewer"]'),
        });

        this._cart = new ShoppingCart({
            element: this._element.querySelector('[data-component="shopping-cart"]')
        });

        this._addEvents();
    }

    _addEvents() {
        // Sort
        this.on('change', '#sort', (event) => {
            const field = event.delegateTarget.value;

            PhoneSort.sort({
                element: this._element,
                by: field
            });
        });

        // Search
        this.on('keyup', '#search', (event) => {
            PhoneSearch.filter({
                element: this._element,
                value: event.delegateTarget.value,
                by: [
                    '.js-filter-name',
                    '.js-filter-description'
                ]
            });
        });

        // Go to detail view
        this._catalogue.on('phone-selected', (event) => {
            let phoneId = event.detail;
            let phoneDetails = PhoneService.getPhone(phoneId);

            this._catalogue.hide();
            this._viewer.showPhone(phoneDetails);
        });

        // Add to cart in catalogue
        this._catalogue.on('phone-add-to-cart', (event) => {
            let phoneName = event.detail;

            this._cart.add(phoneName);
        });

        // Add to cart in detail view
        this._viewer.on('phone-add-to-cart', (event) => {
            let phoneName = event.detail;

            this._cart.add(phoneName);
        });

        // Back to catalogue from viewer
        this._viewer.on('back-to-catalogue', () => {
            this._viewer.hide();
            this._catalogue.show();
        });
    }

    _render() {
        this._element.innerHTML = `
            <!--Sidebar-->
            <div class="col-md-2">
                <section>
                    <p>
                        <span>Search:</span>
                        <input id="search">
                    </p>
                
                    <p>
                        <span>Sort by:</span>
                        <select id="sort">
                            <option value="name">Alphabetical</option>
                            <option value="age">Newest</option>
                        </select>
                    </p>
                </section>
                
                <section data-component="shopping-cart"></section>
            </div>
            
            <!--Main content-->
            <div class="col-md-10">
                <div data-component="phone-catalog"></div>
                <div data-component="phone-viewer" class="js-hidden"></div>
            </div>
        `;
    }

}