import HttpService from '../../common/services/http-service.js';

const PhoneService = {
  getPhones({ order, query, successCallback } = {}) {

    HttpService.sendRequest('phones', (phones) => {
      let filteredPhones = phones;

      if (query) {
        const lowerQuery = query.toLowerCase();

        filteredPhones = filteredPhones.filter(phone => {
          return phone.name.toLowerCase().includes(lowerQuery);
        });
      }

      if (order) {
        filteredPhones = filteredPhones.sort((a, b) => {
          return a[order] > b[order] ? 1 : -1
        });
      }

      successCallback(filteredPhones);
    });

  },

  getPhone(phoneId, successCallback) {
    // HttpService.sendRequest(`phones/${phoneId}`, successCallback);
    let promise = this._sendRequest(`phones/${phoneId}`);

    promise.then(successCallback, (error) => console.error(error) );
    promise.then((data) => { console.log(data) });

    promise.catch((error) => console.error(error));
  },

  _sendRequest(url) {
    const PROMISE_STATUS_PENDING = 'pending';
    const PROMISE_STATUS_FULFILLED = 'fulfilled';
    const PROMISE_STATUS_REJECTED = 'rejected';

    let promise = {
      _status: PROMISE_STATUS_PENDING,
      _result: null,
      _successCallbacks: [],
      _errorCallbacks: [],

      then(successCallback, errorCallback) {
        if (this._status === PROMISE_STATUS_PENDING) {
          successCallback && this._successCallbacks.push(successCallback);
          errorCallback && this._errorCallbacks.push(errorCallback);
        } else if (this._status === PROMISE_STATUS_FULFILLED){
          successCallback && successCallback(this._result);
        } else {
          errorCallback && errorCallback(this._result)
        }
      },

      catch(errorCallback) {
        if (this._status === PROMISE_STATUS_PENDING) {
          this._errorCallbacks.push(errorCallback);
        } else if (this._status === PROMISE_STATUS_FULFILLED) {
          return;
        }

        errorCallback(this._result);
      },

      resolve(data) {
        this._status = PROMISE_STATUS_FULFILLED;
        this._result = data;

        this._successCallbacks.forEach((callback) => {
          callback(data);
        });
      },

      reject(error) {
        this._status = PROMISE_STATUS_REJECTED;
        this._result = error;

        this._errorCallbacks.forEach((callback) => {
          callback(error);
        });
      }
    };

    HttpService.sendRequest(url, (data) => {
      promise.resolve(data);
    });

    return promise;
  }
};

export default PhoneService;
