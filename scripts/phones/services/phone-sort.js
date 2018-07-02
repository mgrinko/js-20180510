const PhoneSort = {

    sort(options) {
        const elems = options.element.querySelectorAll('.phones > li');
        let field = '';

        switch (options.by) {
            case 'name':
                field = 'phoneName';
                break;
            case 'age':
                field = 'phoneAge';
                break;
            default:
                field = 'phoneName';
        }

        const sorted = Array.from(elems)
            .sort( (a, b) => {
                let field1 = a.dataset[field];
                let field2 = b.dataset[field];

                if (field === 'phoneAge') {
                    return PhoneSort.sortAsNumber(field1, field2);
                }

                if (field === 'phoneName') {
                    return PhoneSort.sortAsString(field1, field2);
                }
            })
            .reduce( (prev, elem) => {
                return prev += elem.outerHTML;
            }, '');

        options.element.querySelector('.phones').innerHTML = sorted;
    },

    sortAsNumber(field1, field2) {
        return field1 - field2;
    },

    sortAsString(field1, field2) {
        const f1 = field1.toLowerCase();
        const f2 = field2.toLowerCase();

        return (f1 > f2) - (f1 < f2);
    }

};

export default PhoneSort;