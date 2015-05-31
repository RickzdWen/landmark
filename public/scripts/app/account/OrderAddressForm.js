/**
 * Created by Administrator on 2015/5/30.
 */

define([
    'jquery',
    'landmark/declare',
    './AddressForm',
    'app/services/account'
], function($, declare, AddressForm, account){
    return declare([AddressForm], {
        service : account.modifyOrderAddress,

        _submitCb : function(ret, data) {
            this.cb(data);
        }
    });
});
