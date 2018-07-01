import Component from '../../component.js';

export default class PhoneSearch extends Component {

    constructor({ element }) {
        super({ element });
    
        this._render();
    
        this.on('input', (event) => {
          this.trigger('phone-searching', event.target.value);
        });
      }
    
      _render() {
        this._element.innerHTML = `
          Search:
          <input>
        `;
    }
}
