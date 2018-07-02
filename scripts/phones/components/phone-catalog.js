import Component from '../../component.js';

export default class PhoneCatalog extends Component {
  constructor({ element, phones }) {
    super({ element });

    this._phones = phones;

    this._render();

    this.on('click', '[data-element="phone"]', (event) => {
      this._onPhoneClick(event);
    });
    this.on('click', '.phones__btn-buy-wrapper', (event) => {
      this._phoneAdd(event);
    });
    console.log('PhoneCatalog',this);

  }

  _onPhoneClick(event) {
    let phoneElement = event.delegateTarget;
    if(event.target.classList.contains('btn')){
      this.generateEvent('phone-add', event.delegateTarget.closest('li'));
    }
    else{
      this.generateEvent('phone-selected', phoneElement.dataset.phoneId);
    }  
  }
  sortBy(param){
    console.log('sortBy')
    this._element.innerHTML = '';
    switch(param){
      case "age": this._phones.sort(); break;
      case "name": this._phones.sortByName(); break;
    }
    //this._phones.sortByName();
    this._render();
  }
  filterByName(param){
    this._element.innerHTML = '';
    this._phones = this._phones.filter((phone)=>phone.name.toLowerCase().includes(param.toLowerCase()));
    this._render();
  }


  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${this._phones.map(phone => `
          
          <li class="thumbnail"
              data-element="phone"
              data-phone-id="${ phone.id }">
              
            <a href="#!/phones/${ phone.id }" class="thumb">
              <img
                alt="${ phone.name }"
                src="${ phone.imageUrl }"
              >
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success">
                Add
              </a>
            </div>
  
            <a href="#!/phones/${ phone.id }">${ phone.name }</a>
            <p>${ phone.snippet }</p>
          </li>
        
        `).join('')}
      </ul>
    `;
  }
}