/**
 * Created by Administrator on 2015/1/31.
 */

define([], function(){
    return {
        validEmail : function(email) {
            var ret = {};
            if (!email) {
                ret.message = 'email is required';
            } else if (!/^((?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+)@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i.test(email)) {
                ret.message = 'invalid email address';
            }
            ret.result = ret.message ? false : true;
            return ret;
        },

        validNick : function(nick) {
            var ret = {};
            if (!nick) {
                ret.message = 'username is required';
            }
            ret.result = ret.message ? false : true;
            return ret;
        },

        validPasswd : function(pwd) {
            var ret = {};
            if (!pwd) {
                ret.message = 'password is required';
            } else if (pwd.length < 6) {
                ret.message = 'at least 6 chars';
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
                    ret.message = 'all characters are same';
                }
            }
            ret.result = ret.message ? false : true;
            return ret;
        }
    }
});
