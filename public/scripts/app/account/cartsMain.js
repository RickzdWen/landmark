/**
 * Created by Administrator on 2015/2/8.
 */

require([
    'domReady!',
    'jquery',
    'numeral',
    'lib/underscore',
    'landmark/topic',
    'app/services/cart',
    'app/common/commonRun'
], function(doc, $, numeral, _, topic, cart){
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

    $('.qty').on('change', function(){
        var value = $(this).val();
        if (isNaN(value) || value < 1) {
            value = 1;
            $(this).val(value);
        }
        onQtyChange($(this), value);
    });

    var requesting = false;
    $('.cart-remove').on('click', function(e){
        e.preventDefault();
        if (requesting) {
            return;
        }
        requesting = true;
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
        }).always(function(){
            requesting = false;
        });
    });

    var $subTotalNode = $('.js-cart-subtotal');
    var $orderTotalNode = $('.js-cart-order-total');
    function onQtyChange($node, qty) {
        var price = +$node.data('price');
        var total = +(price * qty).toFixed(2);
        var total_s = numeral(total).format('0,0.00');
        var $tr = $node.parents('tr:first');
        $tr.find('.cart-total').data('total', total).text('$' + total_s);
        $tr.find('.js-prod-qty').each(function(){
            var unit = $(this).data('unit');
            var pqty = qty * unit;
            $(this).text(pqty);
        });
        calcCartTotal();
        updateCart($node.data('id'), qty);
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
    var updateCart = _.debounce(function(id, qty) {
        cart.updateCartQty(id, qty).then(function(){
            topic.publish('getCartList');
        });
    }, 500);
});
