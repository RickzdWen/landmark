/**
 * Created by Administrator on 2015/1/31.
 */

define([
    'landmark/xhr'
], function(xhr){
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
        }
    };
});
