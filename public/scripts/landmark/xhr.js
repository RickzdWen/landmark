/**
 * Created by Administrator on 2015/1/11.
 */

define([
    'jquery'
], function($){
    return function(reqParams){
        reqParams = $.extend({
            type : 'GET',
            dataType : 'json',
            cache : false
        }, reqParams);
        var dfd = $.Deferred();
        $.ajax(reqParams).then(function(ret){
            if (!ret.code) {
                dfd.resolve(ret.data);
            } else {
                dfd.reject(ret);
            }
        }, function(error){
            dfd.reject(error.responseJSON || error);
        });
        return dfd;
    };
});
