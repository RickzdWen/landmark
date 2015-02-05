/**
 * Created by rick on 14-5-29.
 */

define([
], function(){
    var efficient = function(obj, offset, startWith){
        return (startWith||[]).concat(Array.prototype.slice.call(obj, offset||0));
    };

    var lang = {
        hitch : function(scope, method){
            if(arguments.length > 2){
                return lang._hitchArgs.apply(this, arguments); // Function
            }

            if(!method){
                method = scope;
                scope = null;
            }
            if(lang.isString(method)){
                scope = scope || window;
                if(!scope[method]){ throw(['lang.hitch: scope["', method, '"] is null (scope="', scope, '")'].join('')); }
                return function(){ return scope[method].apply(scope, arguments || []); }; // Function
            }
            return !scope ? method : function(){ return method.apply(scope, arguments || []); }; // Function
        },

        _hitchArgs: function(scope, method){
            var pre = lang._toArray(arguments, 2);
            var named = lang.isString(method);
            return function(){
                // arrayify arguments
                var args = lang._toArray(arguments);
                // locate our method
                var f = named ? (scope||window)[method] : method;
                // invoke with collected args
                return f && f.apply(scope || this, pre.concat(args)); // mixed
            }; // Function
        },

        _toArray: /msie/.test(navigator.userAgent.toLowerCase()) ?
            (function(){
                function slow(obj, offset, startWith){
                    var arr = startWith||[];
                    for(var x = offset || 0; x < obj.length; x++){
                        arr.push(obj[x]);
                    }
                    return arr;
                }
                return function(obj){
                    return ((obj.item) ? slow : efficient).apply(this, arguments);
                };
            })() : efficient,

        isIE : function() {
            return /msie/.test(navigator.userAgent.toLowerCase()) || this.isAfterIE11();
        },

        isAfterIE11 : function() {
            return Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject;
        },

        getIEVersion : function() {
            if (this.isIE()) {
                var rv = null;
                if (navigator.appName == 'Microsoft Internet Explorer') {
                    var ua = navigator.userAgent;
                    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                    if (re.exec(ua) != null) {
                        rv = parseFloat( RegExp.$1 );
                    }
                }
                else if (navigator.appName == 'Netscape') {
                    var ua = navigator.userAgent;
                    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
                    if (re.exec(ua) != null) {
                        rv = parseFloat( RegExp.$1 );
                    }
                }
                return rv;
            }
            return null;
        },

        isString: function(it){
            return (typeof it == "string" || it instanceof String); // Boolean
        }
    };
    return lang;
});
