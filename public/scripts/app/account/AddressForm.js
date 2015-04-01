/**
 * Created by Windows7 on 2015/3/31.
 */

define([
    'jquery',
    'landmark/declare',
    './CheckoutForm'
], function($, declare, CheckoutForm){
    return declare([CheckoutForm], {
        inputNames : ['country', 'first_name', 'last_name', 'street', 'city', 'zip', 'state', 'state_short', 'phone'],
        validateNames : ['country', 'first_name', 'last_name', 'street', 'city', 'zip', 'state', 'state_short', 'phone'],

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
        },

        submit : function() {
            var self = this;
            $.when(this.countryDfd, this.first_nameDfd, this.last_nameDfd, this.streetDfd, this.cityDfd, this.zipDfd,
                this.stateDfd, this.state_shortDfd).done(function(){
                var data = self.$form.serializeObject();
                console.log(data);
            });
        }
    });
});
