/**
 * Created by Windows7 on 2015/2/15.
 */

require([
    'domReady!',
    'jquery',
    'app/common/commonRun',
    'lib/jquery.gmaps.min'
], function(doc, $){
    $('#googlemaps').gMap({
        maptype: 'ROADMAP',
        scrollwheel: false,
        zoom: 13,
        markers: [
            {
                address: 'New York, 45 Park Avenue', // Your Adress Here
                html: '<strong>Our Office</strong><br>45 Park Avenue, Apt. 303 </br>New York, NY 10016 ',
                popup: true
            }
        ]
    });

    // Accordion
    //----------------------------------------//

    var $accor = $('.accordion');

    $accor.each(function() {
        $(this).addClass('ui-accordion ui-widget ui-helper-reset');
        $(this).find('h3').addClass('ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all');
        $(this).find('div').addClass('ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom');
        $(this).find("div").hide().first().show();
        $(this).find("h3").first().removeClass('ui-accordion-header-active ui-state-active ui-corner-top').addClass('ui-accordion-header-active ui-state-active ui-corner-top');
        $(this).find("span").first().addClass('ui-accordion-icon-active');
    });

    var $trigger = $accor.find('h3');

    $trigger.on('click', function(e) {
        var location = $(this).parent();

        if( $(this).next().is(':hidden') ) {
            var $triggerloc = $('h3',location);
            $triggerloc.removeClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideUp(300);
            $triggerloc.find('span').removeClass('ui-accordion-icon-active');
            $(this).find('span').addClass('ui-accordion-icon-active');
            $(this).addClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideDown(300);
        }
        e.preventDefault();
    });
});
