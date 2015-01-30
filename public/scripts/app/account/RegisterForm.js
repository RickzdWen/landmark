/**
 * Created by Administrator on 2015/1/30.
 */

define([
    'jquery',
    'landmark/declare',
    'app/common/_FormGenerator',
    './accountValidator',
    'app/services/account'
], function($, declare, _FormGenerator, accountValidator, account){
    return declare([_FormGenerator], {
        inputNames : ['email', 'nick', 'passwd', 'repasswd'],
        validateNames : ['email', 'nick', 'passwd', 'repasswd'],
        validator : accountValidator,
        remoteService : account.checkReg,

        init : function(){
            this.validator.validRepasswd = function(repasswd) {
                var ret = {};
                if (!repasswd) {
                    ret.result = 1;
                    ret.message = 'repeat password is required';
                } else {
                    var pwd = this.$passwdInput.val();
                    if (pwd && pwd != repasswd) {
                        ret.result = 2;
                        ret.message = 'two password are not the same';
                    }
                }
                return ret;
            };
            this.inherited(arguments);
        },

        _bindOnInput : $.noop,

        validEmail : function(email) {
            this._validR(email, 'email');
        },

        validNick : function(nick) {
            this._valid(nick, 'nick');
        },

        validPasswd : function(passwd) {
            this._valid(passwd, 'passwd');
            this.$repasswdInput.blur();
        },

        validRepasswd : function(repasswd) {
            this._valid(repasswd, 'repasswd');
        },

        submit : function() {

        }
    });
});
