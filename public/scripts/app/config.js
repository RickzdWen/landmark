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
        require.config.i18n = {
            locale : locale
        };
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
        moment : 'lib/moment',
        numeral : 'lib/numeral',
        domReady : 'lib/domReady',
        text : 'lib/text',
        i18n : 'lib/i18n'
    },
    shim : {
        'lib/underscore' : {
            init:function(){
                this._.templateSettings = {
                    evaluate:    /\{%([\s\S]+?)%\}/g,
                    interpolate: /\{%=([\s\S]+?)%\}/g,
                    escape: /\{%-([\s\S]+?)%\}/g
                };
                return this._;
            }
        },
        'backbone' : ['jquery', 'lib/underscore'],
        'lib/jquery.cookie' : ['jquery'],
        'lib/jquery.themepunch.plugins.min' : ['jquery'],
        'lib/jquery.themepunch.revolution.min' : ['jquery', 'lib/jquery.themepunch.plugins.min'],
        'lib/jquery.themepunch.showbizpro.min' : ['jquery', 'lib/jquery.themepunch.plugins.min'],
        'lib/jquery.selectric.min' : ['jquery'],
        'lib/jquery.pricefilter' : ['jquery'],
        'lib/jquery.pureparallax' : ['jquery'],
        'lib/jquery.royalslider.min' : ['jquery'],
        'lib/jquery.jpanelmenu' : ['jquery'],
        'lib/jquery.md5' : ['jquery'],
        'lib/superfish' : ['jquery']
    }
};
