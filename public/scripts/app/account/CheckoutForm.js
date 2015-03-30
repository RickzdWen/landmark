/**
 * Created by Administrator on 2015/3/31.
 */

define([
    'jquery',
    'landmark/declare',
    'app/common/_FormGenerator'
], function($, declare, _FormGenerator){
    return declare([_FormGenerator], {
        initInputs : function(names) {
            this._initValidator(names);
            this.inherited(arguments);
        },

        _initValidator : function(names) {
            this.validator = {};
            var self = this;
            for (var i = 0, len = names.length; i < len; ++i) {
                var name = names[i];
                var cName = name.substring(0, 1).toUpperCase() + name.substr(1);
                this.validator['valid' + cName] = this._validRequired;
                this['valid' + cName] = (function(n){
                    return function(value){
                        self._valid(value, n);
                    }
                })(name);
            }
        },

        _validRequired : function(value) {
            var ret = {};
            if (!value) {
                ret.message = 'value is required';
            }
            ret.result = ret.message ? false : true;
            return ret;
        },

        _displayMsg : function(name, error, dfd) {
            if (error) {
                this['$' + name + 'Input'].addClass('required-error');
                dfd && dfd.reject();
            } else {
                this['$' + name + 'Input'].removeClass('required-error');
                dfd && dfd.resolve();
            }
        }
    });
});
