import Component from '../../component.js';

export default class serviceOptions extends Component {
  constructor({ element, phones }) {
    super({ element });

    /*this._phones = phones;*/
    console.log("--->",this);
    this._render();

    /*this.on('click', '[data-element="phone"]', (event) => {
      this._onPhoneClick(event);
    });*/
    this.on('change', '[data-sort-by]', (event) => {
     // console.log("sort")
      this._sortPhones(event);
    });
    this.on('input', '[data-filter]', (event) => {
      //console.log("filter")
      this._filterPhones(event);
    });

  }
  
  _render() {
    this._element.innerHTML = `
      <section>
        <p>
          Search:
          <input data-filter>
        </p>
  
        <p>
          Sort by:
          <select data-sort-by>
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
          </select>
        </p>
      </section>
  
      <section>
        <p>Shopping Cart</p>
        <ul data-shopping-cart>
          <li>Phone 1</li>
          <li>Phone 2</li>
          <li>Phone 3</li>
        </ul>
      </section>
    `;
  }
  _sortPhones(event){
    console.log(event.target.value);
    this.generateEvent('phone-sorted', event.target.value);

  }
  _filterPhones(event){
    //console.log(event.target);
    console.log(event.target.value);
    this.generateEvent('phone-filtered', event.target.value);

  }
  getShoppingCart(){
    console.log(this.querySelector('[data-shopping-cart]'));  
    return this.querySelector('[data-shopping-cart]') || null;
  }
}