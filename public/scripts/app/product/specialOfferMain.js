/**
 * Created by Administrator on 2015/1/18.
 */

require([
    'domReady!',
    'jquery',
    'app/common/commonRun',
    'lib/jquery.themepunch.showbizpro.min'
], function(doc, $){

    // Product Quantity
    //----------------------------------------//
    var thisrowfield;
    $('.qtyplus').click(function(e){
        e.preventDefault();
        thisrowfield = $(this).parent().parent().parent().find('.qty');

        var currentVal = parseInt(thisrowfield.val());
        if (!isNaN(currentVal)) {
            thisrowfield.val(currentVal + 1).trigger('change');
        } else {
            thisrowfield.val(1).trigger('change');
        }
    });

    $(".qtyminus").click(function(e) {
        e.preventDefault();
        thisrowfield = $(this).parent().parent().parent().find('.qty');
        var currentVal = parseInt(thisrowfield.val());
        if (!isNaN(currentVal) && currentVal > 1) {
            thisrowfield.val(currentVal - 1).trigger('change');
        } else {
            thisrowfield.val(1).trigger('change');
        }
    });
    $('#quantity').on('change', function(){
        $('#addToCartBtn').data('qty', $(this).val());
    });
});
