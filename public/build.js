/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _phones_phones_page_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


new _phones_phones_page_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  element: document.querySelector('[data-page-container]')
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhonesPage; });
/* harmony import */ var _services_phone_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _components_phone_filters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _components_shopping_cart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _components_phone_catalog_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _components_phone_viewer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);








class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initFilters();
    this._initShoppingCart();
  }

  _initCatalog() {
    this._catalogue = new _components_phone_catalog_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });

    this._catalogue.on('phone-selected', (event) => {
      let phoneId = event.detail;

      this.onPhoneSelected(phoneId);
    });

    this._catalogue.on('add', (event) => {
      let phoneId = event.detail;

      this._shoppingCart.addItem(phoneId);
    });

    _services_phone_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].getPhones()
      .then((phones) => {
        this._catalogue.showPhones(phones);
      });
  }

  async onPhoneSelected(phoneId) {
    let phoneDetails = await _services_phone_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].getPhone(phoneId);

    this._catalogue.hide();
    this._viewer.showPhone(phoneDetails);
  }

  _initViewer() {
    this._viewer = new _components_phone_viewer_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.on('back', () => {
      this._catalogue.show();
      this._viewer.hide();
    });

    this._viewer.on('add', (event) => {
      let phoneId = event.detail;

      this._shoppingCart.addItem(phoneId);
    });
  }

  _initFilters() {
    this._filters = new _components_phone_filters_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      element: this._element.querySelector('[data-component="phone-filters"]'),
    });

    this._filters.on('sort', async (event) => {
      let sortedPhones = await _services_phone_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].getPhones({ order: event.detail });

      this._catalogue.showPhones(sortedPhones);
    });

    this._filters.on('search', (event) => {
      _services_phone_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].getPhones({ query: event.detail })
        .then((sortedPhones) => {
          this._catalogue.showPhones(sortedPhones);
        });
    });
  }

  _initShoppingCart() {
    this._shoppingCart = new _components_shopping_cart_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _render() {
    this._element.innerHTML = `
      <!--Sidebar-->
      <div class="col-md-2">
        <section>
          <div data-component="phone-filters"></div>  
        </section>
  
        <section>
          <div data-component="shopping-cart"></div>  
        </section>
      </div>
  
      <!--Main content-->
      <div class="col-md-10">
        <div data-component="phone-catalog"></div>
        <div data-component="phone-viewer" class="js-hidden"></div>
      </div>
    `;
  }
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_services_http_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


const PROMISE_STATUS_PENDING = 'pending';
const PROMISE_STATUS_FULFILLED = 'fulfilled';
const PROMISE_STATUS_REJECTED = 'rejected';

class MyPromise {

  constructor(behaviorFunction) {
    this._status = PROMISE_STATUS_PENDING;
    this._result = null;
    this._successCallbacks = [];
    this._errorCallbacks = [];

    behaviorFunction(this._resolve.bind(this), this._reject.bind(this));
  }

  then(successCallback, errorCallback) {
    if (this._status === PROMISE_STATUS_PENDING) {
      successCallback && this._successCallbacks.push(successCallback);
      errorCallback && this._errorCallbacks.push(errorCallback);
    } else if (this._status === PROMISE_STATUS_FULFILLED){
      successCallback && successCallback(this._result);
    } else {
      errorCallback && errorCallback(this._result)
    }
  }

  catch(errorCallback) {
    if (this._status === PROMISE_STATUS_PENDING) {
      this._errorCallbacks.push(errorCallback);
    } else if (this._status === PROMISE_STATUS_FULFILLED) {
      return;
    }

    errorCallback(this._result);
  }

  _resolve(data) {
    this._status = PROMISE_STATUS_FULFILLED;
    this._result = data;

    this._successCallbacks.forEach((callback) => {
      callback(data);
    });
  }

  _reject(error) {
    this._status = PROMISE_STATUS_REJECTED;
    this._result = error;

    this._errorCallbacks.forEach((callback) => {
      callback(error);
    });
  }
}

const PhoneService = {
  getPhones({ order, query } = {}) {

    let promise = _common_services_http_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].sendRequest('phones');

    return promise
      .then((phones) => {
        let filteredPhones = this._filter(phones, query);
        let sortedPhones = this._sort(filteredPhones, order);

        return sortedPhones;
      });
  },

  getPhone(phoneId) {
    return _common_services_http_service_js__WEBPACK_IMPORTED_MODULE_0__["default"].sendRequest(`phones/${phoneId}`);
  },

  _filter(phones, query) {
    if (!query) {
      return phones;
    }

    const lowerQuery = query.toLowerCase();

    return phones.filter(phone => {
      return phone.name.toLowerCase().includes(lowerQuery);
    });
  },

  _sort(phones, order) {
    if (!order) {
      return phones;
    }

    return phones.sort((a, b) => {
      return a[order] > b[order] ? 1 : -1
    });
  }
};

/* harmony default export */ __webpack_exports__["default"] = (PhoneService);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const BASE_URL = 'https://mgrinko.github.io/js-20180510/api/';
// const BASE_URL = 'http://localhost:3000/api/';

const HttpService = {
  sendRequest(url) {
    return new Promise((resolve, reject) => {

      let xhr = new XMLHttpRequest();
      let fullUrl = `${BASE_URL}${url}.json`;

      xhr.open('GET', fullUrl , true);
      xhr.send();

      xhr.onload = ()=> {
        if (xhr.status !== 200) {
          reject(xhr.status + xhr.statusText);

          return;
        }

        try {
          let data = JSON.parse(xhr.responseText);
          resolve(data);
        } catch (e) {
          reject(e);
        }
      };

      xhr.onerror = () => {
        reject(xhr.status + xhr.statusText);
      };

    });
  },
};

/* harmony default export */ __webpack_exports__["default"] = (HttpService);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhoneFilters; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


class PhoneFilters extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
class Component {
  constructor({ element }) {
    this._element = element;
  }

  show() {
    this._element.classList.remove('js-hidden');
  }

  hide() {
    this._element.classList.add('js-hidden');
  }

  on(eventName, selector, handler) {
    if (!handler) {
      this._element.addEventListener(eventName, selector);

      return;
    }

    this._element.addEventListener(eventName, (event) => {
      let delegateTarget = event.target.closest(selector);

      if (!delegateTarget || !this._element.contains(delegateTarget)) {
        return;
      }

      event.delegateTarget = delegateTarget;

      handler(event);
    });
  }

  trigger(eventName, detail) {
    let event = new CustomEvent(eventName, { detail });

    this._element.dispatchEvent(event);
  }
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShoppingCart; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


class ShoppingCart extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({ element }) {
    super({ element });

    this._items = ['1', '2', '3'];

    this._render();

    this.on('click', '[data-element="item-remover"]', (event) => {
      const itemToRemove = event.delegateTarget.dataset.item;
      this.removeItem(itemToRemove);
    });
  }

  addItem(itemToAdd) {
    this._items.push(itemToAdd);
    this._render();
  }

  removeItem(itemToRemove) {
    this._items = this._items.filter(item => itemToRemove !== item);
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        ${ this._items.map(item => `

          <li>
            ${ item }
            <button
              data-element="item-remover"
              data-item="${item}"
            >
              x
            </button>
          </li>
          
        `).join('') }
      </ul>
    `;
  }
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhoneCatalog; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


class PhoneCatalog extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({ element }) {
    super({ element });

    this._phones = [];

    this._render();

    this.on('click', '[data-element="details-link"]', (event) => {
      let phoneElement = event.delegateTarget.closest('[data-element="phone"]');

      this.trigger('phone-selected', phoneElement.dataset.phoneId);
    });

    this.on('click', '[data-element="add-button"]', (event) => {
      let phoneElement = event.delegateTarget.closest('[data-element="phone"]');

      this.trigger('add', phoneElement.dataset.phoneId);
    });
  }

  showPhones(phones) {
    this._phones = phones;
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${this._phones.map(phone => `
          
          <li class="thumbnail"
              data-element="phone"
              data-phone-id="${ phone.id }">
              
            <a
              data-element="details-link"
              href="#!/phones/${ phone.id }"
              class="thumb"
            >
              <img
                alt="${ phone.name }"
                src="${ phone.imageUrl }"
              >
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a
                data-element="add-button"
                class="btn btn-success"
              >
                Add
              </a>
            </div>
  
            <a
              href="#!/phones/${ phone.id }"
              data-element="details-link"
            >
              ${ phone.name }
            </a>
            
            <p>${ phone.snippet }</p>
          </li>
        
        `).join('')}
      </ul>
    `;
  }
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhoneViewer; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


class PhoneViewer extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {

  constructor({ element }) {
    super({ element });

    this.on('click', '[data-element="back-button"]', () => {
      this.trigger('back');
    });

    this.on('click', '[data-element="add-button"]', () => {
      this.trigger('add', this._phone.id);
    });

    this.on('click', '[data-element="small-image"]', (event) => {
      let smallImage = event.delegateTarget;
      let largeImage = this._element.querySelector('[data-element="large-image"]');

      largeImage.src = smallImage.src;
    })
  }

  showPhone(phoneDetails) {
    this._phone = phoneDetails;
    this._render(this._phone);
    this.show();
  }

  _render(phone) {
    this._element.innerHTML = `
      <img
        data-element="large-image"
        class="phone"
        src="${ phone.images[0] }"
      >

      <button data-element="back-button">Back</button>
      <button data-element="add-button">Add to basket</button>
  
  
      <h1>${ phone.name }</h1>
  
      <p>${ phone.description }</p>
  
      <ul class="phone-thumbs">
        ${ phone.images.map(imageUrl => `

          <li>
            <img
              src="${ imageUrl }"
              data-element="small-image"
            >
          </li>
        
        `).join('')}
      </ul>
    `;
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map