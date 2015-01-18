/**
 * Created by Administrator on 2015/1/11.
 */

require([
    'jquery',
    'app/common/commonRun',
    'lib/jquery.pureparallax'
], function($){
    // Parallax Banner
    //----------------------------------------//
    $(".parallax-banner").pureparallax({
        overlayBackgroundColor: '#000',
        overlayOpacity : '0.45',
        timeout: 100
    });

    $(".parallax-titlebar").pureparallax({
        timeout: 100
    });
});
