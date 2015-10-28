# popup

实例：
var lightBox1 = function () {

    var lightbox = new Popup({
        target: $('.popup').clone(),
        isMask: true,
        isFixed: true,
        maskClick: true
    });
    lightbox.basic();

    return {
        show: function (callback) {
            lightbox.show(callback);
        },
        hide: function (callback) {
            lightbox.hide(callback);
        },
        dom: function () {
            return lightbox.dom();
        }
    }
}();