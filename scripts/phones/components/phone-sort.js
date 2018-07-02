import Component from '../../component.js';

export default class PhoneSort extends Component {
  constructor({ element }) {
    super({ element });
    this._element = element;
    this._render();

    this.on('change', '[data-element="phone-sort"]', event => {
      this._onSelectSort(event);
    });
  }

  _onSelectSort(event) {
    let selectOptions = event.target.value;

    this.trigger('sort-selected', selectOptions);
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
