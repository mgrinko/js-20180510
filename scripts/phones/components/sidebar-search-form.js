import Component from '../../component.js';

export default class SidebarSearchForm extends Component {

    constructor({element}) {
        super({element});

        this._render();
    }

    _render() {
        this._element.innerHTML = `     
          <p>
            Search:
            <input class="search-form">
          </p>
  
          <p>
            Sort by:
            <select class="sort-form">
              <option value="name">Alphabetical</option>
              <option value="age" selected>Newest</option>
            </select>
          </p>       
    `;
    }
}
