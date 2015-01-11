/**
 * Created by Administrator on 2015/1/12.
 */

define([
    'jquery'
], function($){
    //	Back To Top Button
    //----------------------------------------//

    var pxShow = 600; // height on which the button will show
    var fadeInTime = 400; // how slow / fast you want the button to show
    var fadeOutTime = 400; // how slow / fast you want the button to hide
    var scrollSpeed = 400; // how slow / fast you want the button to scroll to top.

    $(window).scroll(function(){
        if($(window).scrollTop() >= pxShow){
            $('#backtotop').fadeIn(fadeInTime);
        } else {
            $('#backtotop').fadeOut(fadeOutTime);
        }
    });

    $('#backtotop a').click(function(){
        $('html, body').animate({scrollTop:0}, scrollSpeed);
        return false;
    });
});
