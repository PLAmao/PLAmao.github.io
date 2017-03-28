(function (w) {
    function Observer() {
        this.callbackList = {};
    }
    util.extend(Observer.prototype, {
        add: function (type, callback) {
            (this.callbackList[type] || (this.callbackList[type] = [])).push(callback);
        },
        trigger: function (type) {
            (this.callbackList[type] || []).forEach(function (fn, i) {
                fn();
            });
        },
        off: function (type) {
            this.callbackList[type] = [];
        }
    });
    w.Observer = Observer;
})(window);