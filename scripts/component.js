export default class Component {
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

  generateEvent(eventName, detail) {
    let event = new CustomEvent(eventName, { detail });

    this._element.dispatchEvent(event);
  }

  sortByName(a,b){
    return a.name - b.name;
  }
}