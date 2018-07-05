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

export default HttpService;
