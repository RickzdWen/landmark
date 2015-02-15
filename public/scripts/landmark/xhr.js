/**
 * Created by Administrator on 2015/1/11.
 */

define([
    'jquery',
    'app/common/params'
], function($, params){
    return function(reqParams){
        reqParams = $.extend({
            type : 'GET',
            dataType : 'json',
            cache : false
        }, reqParams);
        var type = reqParams.type;
        if (/(post|put|delete)/i.test(type) && (!reqParams.data || !reqParams.data._csrf)) {
            reqParams.data = reqParams.data || {};
            reqParams.data._csrf = params._csrf;
        }
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
