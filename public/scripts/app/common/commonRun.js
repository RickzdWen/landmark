/**
 * Created by rick on 2015/1/9.
 */

define([
    'jquery',
    'app/services/cart',
    'app/services/wishlist',
    'landmark/topic',
    './successTip',
    './header',
    './footer'
], function($, cart, wishlist, topic, successTip){
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

    $('#wrapper').on('click', '.js-add-to-cart', function(e){
        e.preventDefault();
        cart.addToCart({
            sid : $(this).data('sid'),
            pid : $(this).data('pid') || '',
            qty : $(this).data('qty')
        }).then(function(ret){
            successTip.show(true);
            topic.publish('getCartList');
        }, function(error){
            if (error && error.code == 50000) {
                window.location.href = '/login?ref=' + encodeURIComponent(window.location.href);
            }
        });
    });

    $('#wrapper').on('click', '.js-add-to-wishlist', function(e){
        e.preventDefault();
        wishlist.addToWish({
            sid : $(this).data('sid'),
            pid : $(this).data('pid') || ''
        }).then(function(ret){
            successTip.show(true);
            topic.publish('getWishCount');
        }, function(error){
            if (error && error.code == 50000) {
                window.location.href = '/login?ref=' + encodeURIComponent(window.location.href);
            }
        });
    });
});
