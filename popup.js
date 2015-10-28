(function ($) {
    function Popup(option) {

        this.option = $.extend({
            target: $('<div></div>'),
            isFixed: true, //随屏幕滚动
            isMask: true,  //遮罩
            maskClick: false
        }, option || {});

    }

    Popup.prototype = {

        dom: function () {
            return this.option.target;
        },

        show: function (fn) {
            var ml,
                mt;

            if (this.option.isMask) {
                this.option.mask
                    .show()
                    .css({
                        opacity: '.5'
                    });
            }

            this.option.target.show();

            ml = -this.option.target.width() / 2;
            mt = -this.option.target.height() / 2;

            if (this.option.isFixed) {
                this.option.target.css('position', 'fixed');
            } else {
                mt += document.getElementsByTagName('body')[0].scrollTop;

            }
            this.option.target.css({
                marginLeft: ml,
                marginTop: mt
            });

            if (typeof fn === 'function') {
                fn();
            }
        },

        hide: function (fn) {

            this.option.target.hide();
            this.option.mask.hide();

            if (typeof fn === 'function') {
                fn();
            }
        },
        basic: function () {

            var self = this,
                body = $('body');

            this.option.target
                .hide()
                .css({
                    left: '50%',
                    top: '50%',
                    zIndex: 999
                });

            body.append(this.option.target);

            if (this.option.isMask) {
                self.option.mask = $('<div></div>');
                self.option.mask
                    .hide()
                    .addClass('popupMask')
                    .css({
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#000',
                        zIndex: 998,
                        position: 'fixed'
                    });
                body.append(self.option.mask);
            }

            this.dom().find('*').each(function () {
                if ($(this).attr('data-lightbox') === 'close') {
                    $(this).bind('click', function () {
                        self.hide();
                    })
                }
            });

            if (self.option.maskClick) {
                self.option.mask.on('click', function () {
                    self.hide();
                });
            }
        }
    };

    window.Popup = Popup;

})(Zepto || jQuery);

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