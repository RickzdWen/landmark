/**
 * Created by Administrator on 2015/2/12.
 */

require([
    'domReady!',
    'jquery',
    'app/services/wishlist',
    'landmark/topic',
    'app/common/commonRun'
], function(doc, $, wishlist, topic){
    var requesting = false;
    $('.cart-table').on('click', '.cart-remove', function(e){
        e.preventDefault();
        if (requesting) {
            return;
        }
        requesting = true;
        var $tr = $(this).parents('tr:first');
        wishlist.removeItem($(this).data('sid')).then(function(){
            $tr.remove();
            topic.publish('getWishCount');
        }, function(error){
            if (error && error.code == 50000) {
                window.location.href = '/login?ref=' + encodeURIComponent(window.location.href);
            }
        }).always(function(){
            requesting = false;
        });
    });
});
