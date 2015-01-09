/**
 * Created by rick on 2015/1/9.
 */

define([
    'jquery',
    'ui/combobox/TopBarDropdown',
    'lib/jquery.cookie'
], function($, TopBarDropdown){

    var langDropDown = new TopBarDropdown({
        node : $('.ui-language-dropdown')[0],
        onChange : function(value) {
            $.cookie('lang', value, {path : '/'});
            window.location.reload();
        }
    });
});
