import Component from '../../component.js';

export default class Sidebar extends Component {

    constructor({element}) {
        super({element});

        this._render();
    }

    _render() {
        this._element.innerHTML = `
      <section>
          <p>
            Search:
            <input>
          </p>
  
          <p>
            Sort by:
            <select class="sort-form">
              <option value="name">Alphabetical</option>
              <option value="age" selected>Newest</option>
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
    `;
    }
}