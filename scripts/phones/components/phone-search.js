export default class PhoneSearch {

    static filter(options) {
        options.element.querySelectorAll('.phones > li').forEach( item => {
            let found = false;

            options.by.forEach( elem => {
                const searchPlace = item.querySelector(elem).textContent.toLowerCase();
                const searchText = options.value.toLowerCase();

                if (searchPlace.includes(searchText)) {
                    found = true;
                }
            });

            if (!found) {
                item.classList.add('hidden');
            } else {
                item.classList.remove('hidden');
            }
        });
    }

}