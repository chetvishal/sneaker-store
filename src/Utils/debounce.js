const debounce = function (d) {
    let timer;
    return function (fn) {
        let context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, arguments);
        }, d);
    };
};

export { debounce };