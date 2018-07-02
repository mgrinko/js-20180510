
const PhoneService = {
  getPhones({ order, query, successCallback } = {}) {

    this._sendRequest('/api/phones.json', {
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
    this._sendRequest(`/api/phones/${phoneId}.json`, {
      onSuccess: successCallback,
    })
  },

  _sendRequest(url, {
    method = 'GET',
    onSuccess = () => {},
    onError = (error) => {
      console.error(error);
    },
  }) {
    let xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.send();

    xhr.onload = ()=> {
      if (xhr.status !== 200) {
        onError(xhr.status + xhr.statusText);

        return;
      }

      let data = JSON.parse(xhr.responseText);
      onSuccess(data);
    };

    xhr.onerror = () => {
      onError(xhr.status + xhr.statusText);
    };
  },
};

export default PhoneService;
