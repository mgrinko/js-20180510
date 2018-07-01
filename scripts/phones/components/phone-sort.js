import Component from '../../component.js';

export default class PhoneSort extends Component {

    constructor({ element }) {
        super({ element });

        this._render();

        this.on('change', (event) => {
            this.trigger('phone-sorting', event.target.value);
        });
    }

    _render() {
        this._element.innerHTML = `
        <p>
        Sort by:
            <select>
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
            </select>
        </p>
        `;
    }
}
