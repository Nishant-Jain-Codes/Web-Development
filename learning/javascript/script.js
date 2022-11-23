function cart() {
    let items = 0;
    return {
       addItem: function () {
            items++;
        },
        getItem: function () {
            return items;
        }
    };
}

const closure = cart();
closure.addItem();
closure.addItem();
closure.addItem();
console.log(closure.getItem());