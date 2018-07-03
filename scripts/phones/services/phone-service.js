import HttpService from '../../common/services/http-service.js';

const PhoneService = {
  getPhones({ order, query, successCallback } = {}) {

    HttpService.sendRequest('/phones', {
      onSuccess: (phones) => {
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
      }
    });

  },

  getPhone(phoneId, successCallback) {
    HttpService.sendRequest(`/phones/${phoneId}`, {
      onSuccess: successCallback,
    })
  },
};

export default PhoneService;
