export default class Component {
  constructor({ element }) {
    this._element = element;
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
}