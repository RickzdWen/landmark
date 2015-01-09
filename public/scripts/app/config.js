/**
 * Created by Administrator on 2015/1/8.
 */

var _params = function(params){
    if(window.require && typeof require === 'object'){
        if(!require.config){
            require.config = {};
        }
        var p = require.config['app/common/params'];
        if (!p) {
            require.config['app/common/params'] = params;
        } else {
            for (var key in params) {
                p[key] = params[key];
            }
        }
    }
};

var _i18n = function(locale) {
    if(window.require && typeof require === 'object'){
        if(!require.config){
            require.config = {};
        }
        require.config.i18n = locale;
    }
};

var _version = '{version}';

var require = {
    baseUrl:/\{version\}/.test(_version) ? '/scripts/':'/scripts-build/',
    waitSeconds:15,
    urlArgs:_version,
    paths : {
        jquery : 'lib/jquery',
        backbone : 'lib/backbone',
        underscore : 'lib/underscore',
        moment : 'lib/moment',
        numeral : 'lib/numeral',
        domReady : 'lib/domReady',
        text : 'lib/text',
        i18n : 'lib/i18n'
    },
    shim : {
        'backbone' : ['jquery', 'underscore'],
        'lib/jquery.cookie' : ['jquery']
    }
};
