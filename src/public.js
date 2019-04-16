// 防抖
export function _debounce(fn, delay) {
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(th, args);
        }, delay || 200);
    };
}
// 节流
export function _throttle(fn, interval) {
    var last;
    var timer;
    var time = interval || 200;
    return function () {
        var th = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < time) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, time);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }
}