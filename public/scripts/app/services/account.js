/**
 * Created by Administrator on 2015/1/31.
 */

define([
    'landmark/xhr',
    'app/common/params'
], function(xhr, params){
    return {
        checkReg : function(info) {
            return xhr({
                url : '/reg-check',
                data : info
            });
        },

        register : function(data) {
            return xhr({
                url : '/reg',
                type : 'POST',
                data : data
            });
        },

        login : function(data) {
            return xhr({
                url : '/login',
                type : 'POST',
                data : data
            });
        },

        logout : function() {
            return xhr({
                url : '/logout',
                type : 'POST',
                data : {
                    _csrf : params._csrf
                }
            });
        },

        updateCurrentAddress : function(data) {
            return xhr({
                url : '/account/address/shipping',
                type : 'POST',
                data : data
            });
        },

        modifyOrderAddress : function(data) {
            return xhr({
                url : '/account/order/address/' + data.id,
                type : 'PUT',
                data : data
            });
        },

        confirmReceive : function(id) {
            return xhr({
                url : '/account/order/receive/' + id,
                type : 'POST',
                data : {
                    _csrf : params._csrf
                }
            });
        },

        applyRefund : function(id, reason) {
            return xhr({
                url : '/account/order/apply-refund/' + id,
                type : 'POST',
                data : {
                    reason : reason,
                    _csrf : params._csrf
                }
            });
        },

        cancelApplyRefund : function(id) {
            return xhr({
                url : '/account/order/apply-refund/' + id,
                type : 'DELETE',
                data : {
                    _csrf : params._csrf
                }
            });
        },

        cancelOrder : function(id) {
            return xhr({
                url : '/account/order/cancel/' + id,
                type : 'POST',
                data : {
                    _csrf : params._csrf
                }
            });
        }
    };
});
