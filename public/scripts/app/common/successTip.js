/**
 * Created by Administrator on 2015/2/13.
 */

define([
    'jquery'
], function($){
    return {
        $tip : $('#successTip'),

        show : function(close) {
            var self = this;
            this.$tip.slideDown('normal', function(){
                close && self.$tip.slideUp('normal');
            });
        }
    };
});
