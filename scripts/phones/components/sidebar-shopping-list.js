import Component from '../../component.js';

export default class SidebarShoppingList extends Component {

    constructor({element, orders}) {
        super({element});

        this._orders = orders;
        this._orders = [{name: 'testPhin1'},{name: 'testPhin2'}];
        this._render();
    }

    _render() {
        console.log(this._orders);
        this._element.innerHTML = `       
          <p>Shopping Cart</p>
          <ul class="shopping-list">
          
            ${this._orders.map(order => 
                `<li>
                <span class="text">${order.name}</span>
                <div class="icon"></div>
            </li>`
            ).join('')}            
          </ul>
    `;
    }
}
