/**
 * Created by Administrator on 2015/3/1.
 */

require([
    'jquery',
    'app/common/commonRun',
    'lib/jquery.themepunch.showbizpro.min'
], function($){
    $('#our-clients').showbizpro({
        dragAndScroll:"off",
        visibleElementsArray:[2],
        carousel:"off",
        entrySizeOffset:0,
        allEntryAtOnce:"on"
    });
});
