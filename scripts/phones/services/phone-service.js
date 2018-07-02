
const PhoneService = {
  getPhones({ order, query } = {}) {

    let xhr = new XMLHttpRequest();

    xhr.open('GET', '/phones/phones.json', false);
    xhr.send();

    let filteredPhones = JSON.parse(xhr.responseText);

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

    return filteredPhones;
  },

  getPhone(phoneId) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `/phones/${phoneId}.json`, false);
    xhr.send();

    return JSON.parse(xhr.responseText);
  },
};

export default PhoneService;
