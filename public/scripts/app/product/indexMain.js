/**
 * Created by Administrator on 2015/1/16.
 */

require([
    'domReady!',
    'jquery',
    'app/common/commonRun',
    'lib/jquery.themepunch.showbizpro.min'
], function(doc, $){

    // Tabs
    //----------------------------------------//
    var $tabsNav    = $('.tabs-nav'),
        $tabsNavLis = $tabsNav.children('li');
    // $tabContent = $('.tab-content');

    $tabsNav.each(function() {
        var $this = $(this);

        $this.next().children('.tab-content').stop(true,true).hide()
            .first().show();

        $this.children('li').first().addClass('active').stop(true,true).show();
    });

    $tabsNavLis.on('click', function(e) {
        var $this = $(this);

        $this.siblings().removeClass('active').end()
            .addClass('active');

        $this.parent().next().children('.tab-content').stop(true,true).hide()
            .siblings( $this.find('a').attr('href') ).fadeIn();

        e.preventDefault();
    });

    // Product Quantity
    //----------------------------------------//
    var thisrowfield;
    $('.qtyplus').click(function(e){
        e.preventDefault();
        thisrowfield = $(this).parent().parent().parent().find('.qty');

        var currentVal = parseInt(thisrowfield.val());
        if (!isNaN(currentVal)) {
            thisrowfield.val(currentVal + 1);
        } else {
            thisrowfield.val(0);
        }
    });

    $(".qtyminus").click(function(e) {
        e.preventDefault();
        thisrowfield = $(this).parent().parent().parent().find('.qty');
        var currentVal = parseInt(thisrowfield.val());
        if (!isNaN(currentVal) && currentVal > 0) {
            thisrowfield.val(currentVal - 1);
        } else {
            thisrowfield.val(0);
        }
    });

    $('#special-offers').showbizpro({
        dragAndScroll:"off",
        visibleElementsArray:[4,4,3,1],
        carousel:"off",
        entrySizeOffset:0,
        allEntryAtOnce:"off",
        rewindFromEnd:"off",
        autoPlay:"off",
        delay:2000,
        speed:400,
        easing:'Back.easeOut'
    });
});
