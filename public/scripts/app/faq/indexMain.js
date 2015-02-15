/**
 * Created by Administrator on 2015/2/16.
 */

require([
    'domReady!',
    'jquery',
    'app/common/commonRun',
    'lib/jquery-migrate'
], function(doc, $){

    // Toggles
    //----------------------------------------//
    $(".toggle-container").hide();
    $(".trigger").toggle(function(){
        $(this).addClass("active");
    }, function () {
        $(this).removeClass("active");
    });
    $(".trigger").click(function(){
        $(this).next(".toggle-container").slideToggle();
    });

    $(".trigger.opened").toggle(function(){
        $(this).removeClass("active");
    }, function () {
        $(this).addClass("active");
    });

    $(".trigger.opened").addClass("active").next(".toggle-container").show();
//    $('.toggl')
});
