/**
 * Created by Administrator on 2015/1/10.
 */

define([
    'jquery',
    'lib/underscore',
    'landmark/topic',
    'ui/combobox/TopBarDropdown',
    'app/services/account',
    'app/services/cart',
    'app/services/wishlist',
    'app/common/params',
    'lib/jquery.cookie',
    'lib/superfish',
    'lib/jquery.jpanelmenu',
    'lib/hoverIntent'
], function($, _, topic, TopBarDropdown, account, cart, wishlist, params){
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

    // logout
    $('#logout').on('click', function(e){
        e.preventDefault();
        account.logout().then(function(){
            window.location.href = '/';
        });
    });

    // cart
    var cartInfo = {};
    var $cartWrapper = $('#cart');
    var $cartListWrapper = $cartWrapper.find('ul');
    var $cartTotalNode = $cartWrapper.find('.adc');
    var $cartListLenNode = $cartWrapper.find('.js-cart-list-len');
    var cartListTemplate = _.template($('#cartListTpl').html());
    $("#cart").hoverIntent({
        sensitivity: 3,
        interval: 60,
        over: function () {
            if (cartInfo.list && cartInfo.list.length) {
                $('.cart-list', this).fadeIn(200);
                $('.cart-btn a.button', this).addClass('hovered');
            }
        },
        timeout: 220,
        out: function () {
            $('.cart-list', this).fadeOut(100);
            $('.cart-btn a.button', this).removeClass('hovered');
        }
    });
    topic.subscribe('getCartList', function(){
        cart.getCartList().then(function(ret){
            $cartTotalNode.text('$' + ret.totalPrice_s);
            $cartListLenNode.text(ret.list.length);
            $cartListWrapper.html(cartListTemplate(ret.list));
            cartInfo = ret;
        });
    });
    topic.subscribe('getWishCount', function(){
        wishlist.getCount().then(function(ret){
            $('#wishCount').text('(' + ret.count + ')');
        });
    });
    if (params.uid) {
        topic.publish('getCartList');
        topic.publish('getWishCount');
    }
});
