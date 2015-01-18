/**
 * Created by Administrator on 2015/1/10.
 */

define([
    'jquery',
    'ui/combobox/TopBarDropdown',
    'lib/jquery.cookie',
    'lib/superfish',
    'lib/jquery.jpanelmenu'
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

    // Mobile Navigation
    //----------------------------------------//

    var jPanelMenu = $.jPanelMenu({
        menu: '#responsive',
        animated: false,
        keyboardShortcuts: true
    });
    jPanelMenu.on();

    $(document).on('click',jPanelMenu.menu + ' li a',function(e){
        if ( jPanelMenu.isOpen() && $(e.target).attr('href').substring(0,1) === '#' ) { jPanelMenu.close(); }
    });

    $(document).on('touchend','.menu-trigger',function(e){
        jPanelMenu.triggerMenu();
        e.preventDefault();
        return false;
    });

    // Removes SuperFish Styles
    $('#jPanelMenu-menu').removeClass('menu');
    $('ul#jPanelMenu-menu li').removeClass('dropdown');
    $('ul#jPanelMenu-menu li ul').removeAttr('style');
    $('ul#jPanelMenu-menu li div').removeClass('mega');
    $('ul#jPanelMenu-menu li div').removeAttr('style');
    $('ul#jPanelMenu-menu li div div').removeClass('mega-container');


    $(window).resize(function (){
        var winWidth = $(window).width();
        if(winWidth>767) {
            jPanelMenu.close();
        }
    });
});
