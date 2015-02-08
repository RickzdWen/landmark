/**
 * Created by Administrator on 2015/2/8.
 */

require([
    'domReady!',
    'jquery',
    'numeral',
    'landmark/topic',
    'app/services/cart',
    'app/common/commonRun'
], function(doc, $, numeral, topic, cart){
    var thisrowfield;
    $('.qtyplus').click(function(e){
        e.preventDefault();
        thisrowfield = $(this).parent().parent().parent().find('.qty');

        var currentVal = parseInt(thisrowfield.val());
        if (!isNaN(currentVal)) {
            onQtyChange(thisrowfield, currentVal + 1);
            thisrowfield.val(currentVal + 1);
        }
    });

    $('.qtyminus').click(function(e) {
        e.preventDefault();
        thisrowfield = $(this).parent().parent().parent().find('.qty');
        var currentVal = parseInt(thisrowfield.val());
        if (!isNaN(currentVal) && currentVal > 1) {
            onQtyChange(thisrowfield, currentVal - 1);
            thisrowfield.val(currentVal - 1);
        }
    });

    $('.cart-remove').on('click', function(e){
        e.preventDefault();
        var id = $(this).data('id');
        var $tr = $(this).parents('tr:first');
        cart.removeCartItem(id).then(function(){
            $tr.remove();
            calcCartTotal();
            topic.publish('getCartList');
        }, function(error){
            if (error && error.code == 50000) {
                window.location.href = '/login?ref=' + encodeURIComponent(window.location.href);
            }
        });
    });

    var $subTotalNode = $('.js-cart-subtotal');
    var $orderTotalNode = $('.js-cart-order-total');
    function onQtyChange($node, qty) {
        var price = +$node.data('price');
        var total = +(price * qty).toFixed(2);
        var total_s = numeral(total).format('0,0.00');
        $node.parents('tr:first').find('.cart-total').data('total', total).text('$' + total_s);
        calcCartTotal();
    }
    function calcCartTotal() {
        var subTotal = 0;
        $('.cart-total').each(function(index, node){
            subTotal += +$(node).data('total');
        });
        var subTotal_s = numeral(subTotal).format('0,0.00');
        $subTotalNode.text('$' + subTotal_s);
        $orderTotalNode.text('$' + subTotal_s);
    }
});
