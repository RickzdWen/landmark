/**
 * Created by Windows7 on 2015/2/15.
 */

require([
    'domReady!',
    'jquery',
    'app/services/consult',
    'i18n!app/nls/contact',
    'app/common/commonRun',
    'lib/jquery.gmaps.min'
], function(doc, $, consult, ci18n){
    if (typeof google != 'undefined') {
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
    }

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

    // Contact Form
    //----------------------------------------//

    $("#contactform").submit(function(e) {
        e.preventDefault();
        var $nickInput = $('#nick');
        var $emailInput = $('#email');
        var $contentInput = $('#content');
        var nick = $nickInput.val();
        var email = $emailInput.val();
        var content = $contentInput.val();

        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if(nick===""){
            $nickInput.addClass('error');
            proceed = false;
        }
        if(email===""){
            $emailInput.addClass('error');
            proceed = false;
        }
        if(content==="") {
            $contentInput.addClass('error');
            proceed = false;
        }

        //everything looks good! proceed...
        if(proceed) {
            $('.hide').fadeIn();
            $("#contactform .submit").fadeOut();
            //data to be sent to server
            var data = $('#contactform').serializeObject();
            var output = '';
            consult.submitConsult(data).then(function(){
                output = '<div class="success">'+ ci18n.success +'</div>';
                //reset values in all input fields
                $('#contact div input').val('');
                $('#contact textarea').val('');
                $('.hide').fadeOut();
                $("#contactform .submit").fadeIn().attr("disabled", "disabled").css({'backgroundColor':'#c0c0c0', 'cursor': 'default' });
            }, function(error){
                output = '<div class="error">'+ error.message +'</div>';
                $('.hide').fadeOut();
                $("#contactform .submit").fadeIn();
            }).always(function(){
                $("#result").hide().html(output).slideDown();
            });
        }
    });

    //reset previously set border colors and hide all comment on .keyup()
    $("#contactform input, #contactform textarea").keyup(function() {
        $("#contactform input, #contactform textarea").removeClass('error');
        $("#result").slideUp();
        $("#contactform .submit").removeAttr('disabled').removeAttr('style');
    });
});
