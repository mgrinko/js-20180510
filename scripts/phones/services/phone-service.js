import HttpService from '../../common/services/http-service.js';

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

    let promise = HttpService.sendRequest('phones');

    return promise
      .then((phones) => {
        let filteredPhones = this._filter(phones, query);
        let sortedPhones = this._sort(filteredPhones, order);

        return sortedPhones;
      });
  },

  getPhone(phoneId) {
    return HttpService.sendRequest(`phones/${phoneId}`);
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

export default PhoneService;
