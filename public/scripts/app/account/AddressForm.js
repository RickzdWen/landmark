/**
 * Created by Windows7 on 2015/3/31.
 */

define([
    'jquery',
    'landmark/declare',
    './CheckoutForm',
    'app/services/account'
], function($, declare, CheckoutForm, account){
    return declare([CheckoutForm], {
        inputNames : ['id', 'country', 'first_name', 'last_name', 'street', 'city', 'zip', 'state', 'state_short', 'phone'],
        validateNames : ['country', 'first_name', 'last_name', 'street', 'city', 'zip', 'state', 'state_short', 'phone'],

        cb : $.noop,

        _initValidator : function() {
            this.inherited(arguments);
            var validator = this.validator;
            var self = this;
            validator.validState_short = function(value){
                if (self.$countryInput.val() != 'US') {
                    value = 1;
                }
                return self._validRequired(value);
            };
            validator.validState = function(value) {
                if (self.$countryInput.val() == 'US') {
                    value = 1;
                }
                return self._validRequired(value);
            };
        },

        init : function() {
            this.inherited(arguments);
            var self = this;
            this.$stateShortWrapper = $('#stateShortWrapper');
            this.$stateWrapper = $('#stateWrapper');
            this.$countryInput.on('change', function(){
                var value = $(this).val();
                if (value == 'US') {
                    self.checkingState_short = true;
                    self.$stateShortWrapper.show();
                    self.$stateWrapper.hide();
                } else {
                    self.checkingState = true;
                    self.$stateShortWrapper.hide();
                    self.$stateWrapper.show();
                }
            });
            if (this.$countryInput.val() == 'US') {
                this.validState('');
            } else {
                this.validState_short('');
            }
        },

        submit : function() {
            var self = this;
            $.when(this.countryDfd, this.first_nameDfd, this.last_nameDfd, this.streetDfd, this.cityDfd, this.zipDfd,
                this.stateDfd, this.state_shortDfd).done(function(){
                    var data = self.$form.serializeObject();
                    self._displaySubmitting(true);
                    account.updateCurrentAddress(data).then(function(ret){
                        if (ret.insertId) {
                            self.$idInput.val(ret.insertId);
                        }
                        self.cb(data);
                    }, function(error){
                        self._displayError(error.message);
                    }).always(function(){
                        self._displaySubmitting(false);
                    });
            });
        }
    });
});
