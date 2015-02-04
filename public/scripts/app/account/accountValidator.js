/**
 * Created by Administrator on 2015/1/31.
 */

define([
    'i18n!app/nls/account'
], function(ai18n){
    return {
        validEmail : function(email) {
            var ret = {};
            if (!email) {
                ret.message = ai18n.emailRequired;
            } else if (!/^((?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+)@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i.test(email)) {
                ret.message = ai18n.invalidEmail;
            }
            ret.result = ret.message ? false : true;
            return ret;
        },

        validNick : function(nick) {
            var ret = {};
            if (!nick) {
                ret.message = ai18n.usernameRequired;
            }
            ret.result = ret.message ? false : true;
            return ret;
        },

        validPasswd : function(pwd) {
            var ret = {};
            if (!pwd) {
                ret.message = ai18n.pwdRequired;
            } else if (pwd.length < 6) {
                ret.message = ai18n.pwdTooShort;
            } else {
                var badPass = 1;
                var firstChar = pwd.charAt(0);
                for (var i = 1, len = pwd.length; i < len; ++i) {
                    if (firstChar != pwd.charAt(i)) {
                        badPass = 0;
                        break;
                    }
                }
                if (badPass) {
                    ret.message = ai18n.allCharsSame;
                }
            }
            ret.result = ret.message ? false : true;
            return ret;
        }
    }
});
