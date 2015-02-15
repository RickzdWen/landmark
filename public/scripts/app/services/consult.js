/**
 * Created by Administrator on 2015/2/15.
 */

define([
    'landmark/xhr'
], function(xhr){
    return {
        submitConsult : function(data) {
            return xhr({
                url : '/about/consult',
                type : 'POST',
                data : data
            });
        }
    };
});
