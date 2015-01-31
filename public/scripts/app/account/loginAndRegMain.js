/**
 * Created by rick on 2015/1/30.
 */

require([
    'domReady!',
    'jquery',
    'app/account/RegisterForm',
    'app/common/commonRun'
], function(doc, $, RegisterForm){
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

    var regForm = new RegisterForm({
        $wrapper : $('#tab2')
    });
});
