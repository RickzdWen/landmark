/**
 * Created by Administrator on 2015/2/11.
 */

define([
    'landmark/xhr',
    'app/common/params'
], function(xhr, params){
    return {
        getCount : function(){
            return xhr({
                url : '/wishlist/count'
            });
        },

        removeItem : function(sid) {
            return xhr({
                url : '/wishlist/' + sid,
                type : 'DELETE',
                data : {
                    _csrf : params._csrf
                }
            });
        },

        addToWish : function(data) {
            data = data || {};
            data._csrf = params._csrf;
            return xhr({
                url : '/wishlist',
                type : 'POST',
                data : data
            });
        }
    };
});
