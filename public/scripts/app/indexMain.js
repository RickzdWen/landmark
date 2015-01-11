/**
 * Created by rick on 2015/1/9.
 */

require([
    'domReady!',
    'jquery',
    'lib/jquery.themepunch.revolution.min',
    'lib/jquery.themepunch.showbizpro.min',
    'app/common/commonRun'
], function(doc, $){
    // Revolution Slider
    //----------------------------------------//

    $('.tp-banner').revolution({
        delay:9000,
        startwidth:1290,
        startheight:480,
        hideThumbs:10,
        hideTimerBar:'on',
        onHoverStop: 'on',
        navigationType: 'none',
        soloArrowLeftHOffset:0,
        soloArrowLeftVOffset:0,
        soloArrowRightHOffset:0,
        soloArrowRightVOffset:0
    });

    // ShowBiz Carousel
    //----------------------------------------//
    $('#new-arrivals').showbizpro({
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
