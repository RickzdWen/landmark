/**
 * Created by Administrator on 2015/1/10.
 */

define([
    'jquery',
    'ui/combobox/TopBarDropdown',
    'lib/jquery.cookie',
    'lib/superfish'
], function($, TopBarDropdown){
    var langDropDown = new TopBarDropdown({
        node : $('.ui-language-dropdown')[0],
        onChange : function(value) {
            $.cookie('lang', value, {path : '/'});
            window.location.reload();
        }
    });

    $(document).click(function() {
        langDropDown.hideAll();
    });

    // Initialise Superfish
    //----------------------------------------//

    $('ul.menu').superfish({
        delay:       400,                    // delay on mouseout
        speed:       200,                    // faster animation speed
        speedOut:    100,                    // speed of the closing animation
        autoArrows:  true                    // disable generation of arrow mark-up
    });
});
