export default class Component {
    constructor({element}) {
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
        let event = new CustomEvent(eventName, {detail});

        this._element.dispatchEvent(event);
    }


    throttle(func, ms) {

        let isThrottled = false,
            savedArgs,
            savedThis;

        function wrapper() {

            if (isThrottled) { // (2)
                savedArgs = arguments;
                savedThis = this;
                return;
            }

            func.apply(this, arguments); // (1)

            isThrottled = true;

            setTimeout(function () {
                isThrottled = false; // (3)
                if (savedArgs) {
                    wrapper.apply(savedThis, savedArgs);
                    savedArgs = savedThis = null;
                }
            }, ms);
        }

        return wrapper;
    }
}