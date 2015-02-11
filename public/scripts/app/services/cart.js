/**
 * Created by Administrator on 2015/2/8.
 */

define([
    'landmark/xhr',
    'app/common/params'
], function(xhr, params){
    return {
        addToCart : function(data) {
            data = data || {};
            data._csrf = params._csrf;
            return xhr({
                url : '/cart',
                type : 'POST',
                data : data
            });
        },

        getCartList : function() {
            return xhr({
                url : '/account/carts',
                data : {
                    of : 'json'
                }
            });
        },

        removeCartItem : function(id) {
            return xhr({
                url : '/cart/' + id,
                type : 'DELETE',
                data : {
                    _csrf : params._csrf
                }
            });
        },

        updateCartQty : function(id, qty) {
            return xhr({
                url : '/cart/qty/' + id,
                type : 'PUT',
                data : {
                    qty : qty,
                    _csrf : params._csrf
                }
            });
        }
    };
});
