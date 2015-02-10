/**
 * Created by rick on 2015/1/9.
 */

define([
    'jquery',
    'app/services/cart',
    'landmark/topic',
    './header',
    './footer'
], function($, cart, topic){
    $.fn.serializeObject = function(){
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    $('body').after('<i class="fa fa-shopping-cart" id="cartIcon" style="position: absolute;display: none;"></i>');
    var $cartIcon = $('#cartIcon');
    $('#wrapper').on('click', '.js-add-to-cart', function(e){
        e.preventDefault();
        $cartIcon.show();
//        $cartIcon.offset($('#cart').offset());
//        var top = $cartIcon.css('top');
//        var left = $cartIcon.css('left');
        $cartIcon.offset($(this).offset()).show();
        cart.addToCart({
            sid : $(this).data('sid'),
            pid : $(this).data('pid') || '',
            qty : $(this).data('qty')
        }).then(function(ret){
            var target = $('#cart').offset();
            $cartIcon.animate({
                top : target.top + 'px',
                left : target.left + 'px'
            }, {
                duration : 'normal',
                always : function(){
                    $('#cartIcon').hide();
                    topic.publish('getCartList');
                }
            });
        }, function(error){
            if (error && error.code == 50000) {
                window.location.href = '/login?ref=' + encodeURIComponent(window.location.href);
            }
        });
    });
});
