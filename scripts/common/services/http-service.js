const BASE_URL = 'https://mgrinko.github.io/js-20180510/api/';
// const BASE_URL = 'http://localhost:3000/api/';

const HttpService = {
  sendRequest(
    url,
    onSuccess = () => {},
    onError = (error) => {
      console.error(error);
    }
  ) {
    let xhr = new XMLHttpRequest();
    let fullUrl = `${BASE_URL}${url}.json`;

    xhr.open('GET', fullUrl , true);
    xhr.send();

    xhr.onload = ()=> {
      if (xhr.status !== 200) {
        onError(xhr.status + xhr.statusText);

        return;
      }

      try {
        let data = JSON.parse(xhr.responseText);
        onSuccess(data);
      } catch (e) {
        onError(e);
      }
    };

    xhr.onerror = () => {
      onError(xhr.status + xhr.statusText);
    };
  },
};

export default HttpService;
