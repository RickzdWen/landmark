/**
 * Created by Administrator on 2015/1/30.
 */

define([
    'jquery',
    'landmark/declare',
    'app/common/_FormGenerator',
    './accountValidator',
    'app/services/account',
    'lib/jquery.md5',
    'i18n!app/nls/account'
], function($, declare, _FormGenerator, accountValidator, account, md5, ai18n){
    return declare([_FormGenerator], {
        inputNames : ['email', 'nick', 'passwd', 'repasswd'],
        validateNames : ['email', 'nick', 'passwd', 'repasswd'],
        validator : accountValidator,
        remoteService : account.checkReg,

        init : function(){
            var self = this;
            this.validator.validRepasswd = function(repasswd) {
                var ret = {};
                if (!repasswd) {
                    ret.message = ai18n.repeatPasswordRequired;
                } else {
                    var pwd = self.$passwdInput.val();
                    if (pwd && pwd != repasswd) {
                        ret.message = ai18n.pwdNotSame;
                    }
                }
                ret.result = ret.message ? false : true;
                return ret;
            };
            this.inherited(arguments);
        },

//        _bindOnInput : $.noop,

        checkEmail : function(email) {
            var ret = this.validator.validEmail(email);
            if (ret.result) {
                this._displayMsg('email', '');
            } else {
                this._displayMsg('email', ret.message);
            }
        },

        validEmail : function(email) {
            this._validR(email, 'email');
        },

        validNick : function(nick) {
            this._valid(nick, 'nick');
        },

        validPasswd : function(passwd) {
            this._valid(passwd, 'passwd');
            if (this.$repasswdInput.val()) {
                this.$repasswdInput.blur();
            }
        },

        validRepasswd : function(repasswd) {
            this._valid(repasswd, 'repasswd');
        },

        submit : function() {
            var self = this;
            $.when(this.emailDfd, this.nickDfd, this.passwdDfd, this.repasswdDfd).done(function(){
                var data = self.$form.serializeObject();
                data.passwd = md5(data.passwd);
                data.repasswd = '';
                self._displaySubmitting(true);
                account.register(data).done(function(ret){
                    alert(ret.uid);
                }).fail(function(error){
                    self._displayError(error.message);
                }).always(function(){
                    self._displaySubmitting(false);
                });
            });
        }
    });
});
