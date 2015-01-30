/**
 * Created by Administrator on 2015/1/31.
 */

define([], function(){
    return {
        validEmail : function(email) {
            var ret = {
                result : 0,
                message : ''
            };
            if (!email) {
                ret.result = 1;
                ret.message = 'email is required';
            } else if (!/^((?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+)@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i.test(email)) {
                ret.result = 2;
                ret.message = 'invalid email address';
            }
            return ret;
        },

        validNick : function(nick) {
            var ret = {
                result : 0,
                message : ''
            };
            if (!nick) {
                ret.result = 1;
                ret.message = 'username is required';
            }
            return ret;
        },

        validPasswd : function(pwd) {
            var ret = {
                result : 0,
                message : ''
            };
            if (!pwd) {
                ret.result = 1;
                ret.message = 'password is required';
            } else if (pwd.length < 6) {
                ret.result = 2;
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
                    ret.result = 3;
                    ret.message = 'all characters are same';
                }
            }
            return ret;
        }
    }
});
