/**
 * Created by Administrator on 2015/1/31.
 */

define([
    'jquery',
    'landmark/declare',
    'app/common/_FormGenerator',
    'app/services/account',
    'lib/jquery.md5'
], function($, declare, _FormGenerator, account, md5){
    return declare([_FormGenerator], {
        inputNames : ['email', 'passwd'],
        validateNames : ['email', 'passwd'],
        validator : {
            validEmail : function(email){
                var ret = {};
                if (!email) {
                    ret.message = 'email is required';
                }
                ret.result = ret.message ? false : true;
                return ret;
            },
            validPasswd : function(passwd) {
                var ret = {};
                if (!passwd) {
                    ret.message = 'password is required';
                }
                ret.result = ret.message ? false : true;
                return ret;
            }
        },

        validEmail : function(email) {
            this._valid(email, 'email');
        },

        validPasswd : function(passwd) {
            this._valid(passwd, 'passwd');
        },

        submit : function() {
            var self = this;
            $.when(this.emailDfd, this.passwdDfd).done(function(){
                var data = self.$form.serializeObject();
                data.passwd = md5(data.passwd);
                self._displaySubmitting(true);
                account.login(data).done(function(user){
                    console.log(user);
                }).fail(function(error){
                    self._displayError(error.message);
                }).always(function(){
                    self._displaySubmitting(false);
                });
            });
        }
    });
});
