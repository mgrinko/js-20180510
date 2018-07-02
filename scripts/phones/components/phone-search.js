import Component from '../../component.js';

export default class PhoneSearch extends Component {
  constructor({ element }) {
    super({ element });

    this._element = element;
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      Search:
      <input class="input-search" data-element="phone-search-value" >
    `;
  }
}
