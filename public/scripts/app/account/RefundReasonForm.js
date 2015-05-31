/**
 * Created by Administrator on 2015/5/31.
 */

define([
    'jquery',
    'landmark/declare',
    'app/services/account',
    './CheckoutForm'
], function($, declare, account, CheckoutForm){
    return declare([CheckoutForm], {
        inputNames : ['reason'],
        validateNames : ['reason'],

        cb : $.noop,

        service : account.applyRefund,

        orderId : '',

        submit : function() {
            if (!this.orderId) {
                return;
            }
            var self = this;
            $.when(this.reasonDfd).done(function(){
                var data = self.$form.serializeObject();
                self._displaySubmitting(true);
                self.service(self.orderId, data.reason).then(function(ret){
                    self.cb(ret);
                }, function(error){
                    self._displayError(error.message);
                }).always(function(){
                    self._displaySubmitting(false);
                });
            });
        }
    });
});
