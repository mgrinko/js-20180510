import Component from '../../component.js';

export default class PhoneFilters extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    window.handlePhonesSort = (event) => {
      this.trigger('sort', event.target.value);
    };

    window.handlePhonesSearch = (event) => {
      this.trigger('search', event.target.value);
    };
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input
          oninput="window.handlePhonesSearch(event)"
          type="text"
        >
      </p>

      <p>
        Sort by:
        <select onchange="window.handlePhonesSort(event)">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}