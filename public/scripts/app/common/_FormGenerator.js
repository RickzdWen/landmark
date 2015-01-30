/**
 * 针对登录和注册提取的form逻辑生成器
 *
 * Created by rick on 2014/12/26.
 */

define([
    'jquery',
    'landmark/declare',
    'landmark/lang'
], function($, declare, lang){
    var _FormGenerator = function(options){
        this.initOptions(options);
        this.init();
    };

    _FormGenerator.prototype.initOptions = function(options) {
        this.bindRecord = {};
        declare.mixin(this, options);
        return this;
    };

    _FormGenerator.prototype.init = function() {
//        if (this.isDynamic) {
//            this.initDynamicForm();
//        } else {
//            this.initStaticForm();
//        }
        this.initNodes();
        this.initInputs(this.inputNames);
        this.initValidLogic(this.validateNames);
        var self = this;
        this.$form.submit(function(){
            self.onSubmit();
            return false;
        });
    };

    /**
     * 动态产生的html需要做额外的操作
     */
    _FormGenerator.prototype.initDynamicForm = function() {
        var focusSelector = 'input:text,input:password';
        if ($('body').placeholder) {
            this.$wrapper.find('input').placeholder();
            this.$wrapper.find('input').placeholder().focus(function(){
                $(this).removeClass('gray01');
            }).blur(function(){
                if (!$(this).val()) {
                    $(this).addClass('gray01');
                }
            });
            this.$wrapper.find('input:text').addClass('gray01');
            this.$wrapper.find('input:password').addClass('inputTxtFocus');
            focusSelector = 'input:text';
        }
        this.$wrapper.find(focusSelector).focus(function(){
            $(this).addClass('inputTxtFocus');
        }).blur(function(){
            $(this).removeClass('inputTxtFocus');
        });
    };

    _FormGenerator.prototype.initStaticForm = function() {
        var focusSelector = 'input:text,input:password';
        if ($('body').placeholder) {
            this.$wrapper.find('input:password').addClass('inputTxtFocus');
            focusSelector = 'input:text';
        }
        this.$wrapper.find('input:text,input:password').focus(function(){
            $(this).addClass('inputTxtFocus');
        }).blur(function(){
            $(this).removeClass('inputTxtFocus');
        });
    };

    _FormGenerator.prototype.initNodes = function() {
        this.$form = this.$wrapper.find('form');
        this.$errorMsg = this.$wrapper.find('.ui-error-msg');
        this.$errorWrapper = this.$errorMsg.parents('.error');
        this.$submitWrapper = this.$form.find('.ui-submit');
        this.$submittingWrapper = this.$form.find('.ui-submitting');
    };

    _FormGenerator.prototype.initInputs = function(names) {
        names = names || [];
        var len = names.length;
        for (var i = 0; i < len; ++i) {
            var name = names[i];
            var $node = this['$' + name + 'Input'] = this.$form.find('input[name=' + name + ']');
            var $wrapper = this['$' + name + 'Wrapper'] = $node.parents('.form-row');
            this['$' + name + 'Msg'] = $wrapper.find('.ui-msg-text');
        }
    };

    _FormGenerator.prototype.initValidLogic = function(names) {
        names = names || [];
        var len = names.length;
        for (var i = 0; i < len; ++i) {
            var name = names[i];
            var cName = name.substring(0, 1).toUpperCase() + name.substr(1);
            var $input = this['$' + name + 'Input'];
            this._bindOnInput($input, name, cName, this['check' + cName]);
            this._bindOnBlur($input, name, cName);
            this._bindOnOther($input, name, cName);
            if ($input.val()) {
                this['valid' + cName]($input.val());
            }
        }
    };

    _FormGenerator.prototype._bindOnBlur = function($input, name, cName) {
        var self = this;
        $input.on('blur', function(){
            self['valid' + cName]($(this).val());
            if (!self.bindRecord[name]) {
                self._bindOnInput($input, name, cName);
            }
        });
    };

    _FormGenerator.prototype._bindOnInput = function($input, name, cName, checkFunc) {
        var self = this;
        checkFunc = checkFunc || this['valid' + cName];
        if (!('oninput' in document.body) || (lang.isIE() && lang.getIEVersion() == 10)) {
            $input[0].onpropertychange = function() {
                if (document.activeElement == this && event.propertyName.toLowerCase() == 'value') {
                    checkFunc.apply(self, [$(this).val()]);
                }
            }
        } else {
            $input.on('input', function(){
                checkFunc.apply(self, [$(this).val()]);
            });
        }
        this.bindRecord[name] = 1;
    };

    _FormGenerator.prototype._bindOnOther = function($input, name, cName){};

    _FormGenerator.prototype._check = function(name, tip) {
        var cName = name.substring(0, 1).toUpperCase() + name.substr(1);
        this['checking' + cName] = true;
//        this['$' + name + 'Wrapper'].removeClass('msgOk msgError');
        this['$' + name + 'Msg'].text(tip).show();
    };

    _FormGenerator.prototype._valid = function(value, name) {
        var cName = name.substring(0, 1).toUpperCase() + name.substr(1);
        this['checking' + cName] = false;
        var ret = this.validator['valid' + cName](value);
        var dfd = $.Deferred();
        this[name + 'Dfd'] = dfd;
        this['is' + cName + 'Valid'] = ret.result;
        if (ret.result) {
            this._displayMsg(name, '', dfd);
            dfd.resolve();
        } else {
            this._displayMsg(name, ret.message, dfd);
        }
    };

    _FormGenerator.prototype._validR = function(value, name) {
        var cName = name.substring(0, 1).toUpperCase() + name.substr(1);
        this['checking' + cName] = false;
        var ret = this.validator['valid' + cName](value);
        this['is' + cName + 'Valid'] = false;
        var dfd = $.Deferred();
        this[name + 'Dfd'] = dfd;
        var self = this;
        if (ret.result) {
            var info = {};
            info[name] = value;
            this.remoteService(info).done(function(){
                self['is' + cName + 'Valid'] = true;
                self._displayMsg(name, '', dfd);
            }).fail(function(error){
                self._displayMsg(name, error, dfd);
            });
        } else {
            this._displayMsg(name, ret.message, dfd);
        }
    };

    _FormGenerator.prototype._displayMsg = function(name, error, dfd) {
        if (error) {
            this['$' + name + 'Wrapper'].addClass('msgError').removeClass('msgOk');
            this['$' + name + 'Msg'].text(error).show();
            dfd && dfd.reject();
        } else {
            this['$' + name + 'Wrapper'].addClass('msgOk').removeClass('msgError');
            this['$' + name + 'Msg'].text('').hide();
            dfd && dfd.resolve();
        }
    };

    _FormGenerator.prototype._checkInit = function() {
        var names = this.validateNames || [];
        var ret = true;
        for (var i = 0, len = names.length; i < len; ++i) {
            var name = names[i];
            var cName = name.substring(0, 1).toUpperCase() + name.substr(1);
            if ((typeof this['is' + cName + 'Valid'] == 'undefined') && (typeof this['checking' + cName] == 'undefined')) {
                this['valid' + cName](this['$' + name + 'Input'].val());
                ret = false;
            }
            if (this['checking' + cName]) {
                this['valid' + cName](this['$' + name + 'Input'].val());
            }
        }
        return ret;
    };

    _FormGenerator.prototype.submit = $.noop;

    _FormGenerator.prototype._displaySubmitting = function(flag) {
        this.submitting = flag;
        if (flag) {
            this.$submitWrapper.hide();
            this.$submittingWrapper.show();
        } else {
            this.$submitWrapper.show();
            this.$submittingWrapper.hide();
        }
    };

    _FormGenerator.prototype._displayError = function(error) {
        if (error) {
            this.$errorMsg.text(error);
            this.$errorWrapper.show();
        } else {
            this.$errorMsg.text('');
            this.$errorWrapper.hide();
        }
    };

    _FormGenerator.prototype.onSubmit = function() {
        if (this.submitting) {
            return;
        }
        if (!this._checkInit()) {
            return;
        }
        this.submit();
    };

    return _FormGenerator;

});
