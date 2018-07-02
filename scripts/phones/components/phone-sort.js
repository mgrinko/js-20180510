import Component from '../../component.js';

export default class PhoneSort extends Component {
    constructor({ element, phones }) {
        super({ element });

        this._phones = phones;

        this._render();

        this.on('change', '[data-element="phone-sort"]', event => {
            this._onSelectSort(event);
        });
    }

    _onSelectSort(event) {
        let selectOptions = event.target.value;

        this.trigger('sort-selected', selectOptions);
        //    this.trigger('phone-selected', phoneElement.dataset.phoneId);
    }

    _render() {
        this._element.innerHTML = `
        Sort by:
        <select data-element="phone-sort">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
    `;
    }
}
