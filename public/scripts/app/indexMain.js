/**
 * Created by rick on 2015/1/9.
 */

require([
    'lib/jquery.themepunch.revolution.min',
    'app/common/commonRun'
], function(){
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
});
