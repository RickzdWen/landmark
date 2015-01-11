/**
 * Created by Administrator on 2015/1/10.
 */

define([
    'jquery',
    'lib/superfish'
], function($){
    // Initialise Superfish
    //----------------------------------------//

    $('ul.menu').superfish({
        delay:       400,                    // delay on mouseout
        speed:       200,                    // faster animation speed
        speedOut:    100,                    // speed of the closing animation
        autoArrows:  true                    // disable generation of arrow mark-up
    });
});
