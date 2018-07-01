import Component from '../../component.js';

export default class SidebarShoppingList extends Component {

    constructor({element}) {
        super({element});
        this.orders = [];
        this._render();
    }

    addItemToCart(phoneOrder) {
        this.orders.push({name: phoneOrder});
        this._render();
    }

    removePhone(phoneIndex) {
        this.orders.splice(phoneIndex, 1);
        this._render();
    }

    _render() {
        this._element.innerHTML = `       
          <p>Shopping Cart</p>
          <ul class="shopping-list">
          
            ${this.orders.map((order, index) => 
                `<li>
                <div class="text">${order.name}</div>
                <div class="icon remove-item" data-order-item="${index}"></div>
            </li>`
            ).join('')}            
          </ul>
    `;
    }
}