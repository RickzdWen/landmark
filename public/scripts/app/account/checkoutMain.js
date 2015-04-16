/**
 * Created by Administrator on 2015/3/31.
 */

require([
    'domReady!',
    'jquery',
    'app/account/AddressForm',
    'app/services/account',
    'lib/underscore',
    'lib/numeral',
    'app/common/params',
    'app/common/commonRun'
], function(doc, $, AddressForm, account, _, numeral, params){
    var $aWrapper = $('#addressWrapper');
    var $dWrapper = $('#devliveryWrapper');
    var $pWrapper = $('#paymentWrapper');
    var $addressReview = $aWrapper.find('.address-review');
    var reviewTemplate = _.template($('#addressReviewTpl').html());
    var aForm = new AddressForm({
        $wrapper : $aWrapper,
        cb : toStepDelivery
    });

    $('#addressSubmitBtn').on('click', function(e){
        e.preventDefault();
        aForm.$form.submit();
    });

    $aWrapper.find('.js-edit-icon').on('click', function(){
        toEditAddress();
    });

    $('#deliverySubmitBtn').on('click', function(e){
        e.preventDefault();
        toStepPayment();
    });

    $dWrapper.find('.js-edit-icon').on('click', function(){
        toEditDelivery();
    });

    var shipping = 0;
    var total = 0;
    var expressType = 1;
    $('input[name=shipping-price]').on('change', function(){
        var price = $(this).val();
        expressType = $(this).data('type');
        shipping = numeral(price).format('0.00');
        $('#shippingPrice').text('$' + shipping).data('price', price);
        var subTotal = $('#subTotalPrice').data('price');
        total = numeral(+price + +subTotal).format('0.00');
        $('#totalPrice').text('$' + total);
        $('#deliveryContent').html($(this).next().html()).find('span').addClass('delivery-summary');
    });
    $('input[name=shipping-price]:checked').change();

    function toStepDelivery(data) {
        $aWrapper.find('a.js-title').show().siblings('.js-title').hide();
        renderAddressReview(data);
        aForm.$form.hide().siblings('.checkout-content').show();
        $dWrapper.find('a.js-title').hide();
        $dWrapper.find('.active').show();
        $dWrapper.find('.js-inactive').hide();
    }

    function toEditAddress() {
        $aWrapper.find('a.js-title').hide().siblings('.js-title').show();
        aForm.$form.show().siblings('.checkout-content').hide();
        $dWrapper.find('a.js-title').show();
        $dWrapper.find('.js-edit-icon').hide();
        $dWrapper.find('.active').hide();
        $dWrapper.find('.js-inactive').hide();
        $pWrapper.find('.js-title').show().siblings().hide();
    }

    function renderAddressReview(data) {
        if (data.country == 'US') {
            var state = aForm.$state_shortInput.children(':selected').text();
            data.state = state;
        }
        data.country = aForm.$countryInput.children(':selected').text();
        $addressReview.html(reviewTemplate(data));
    }

    function toStepPayment() {
        $dWrapper.find('a.js-title').show();
        $dWrapper.find('.js-edit-icon').show();
        $dWrapper.find('.active').hide();
        $dWrapper.find('.js-inactive').show();
        $pWrapper.find('.js-title').hide().siblings().show();
    }

    function toEditDelivery(){
        $dWrapper.find('a.js-title').hide();
        $dWrapper.find('.js-edit-icon').hide();
        $dWrapper.find('.active').show();
        $dWrapper.find('.js-inactive').hide();
        $pWrapper.find('.js-title').show().siblings().hide();
    }

    // place order
    var submitting = false;
    $('#paymentSubmit').on('click', function(e){
        e.preventDefault();
        if (submitting) {
            return false;
        }
        var address = aForm.$form.serializeObject();
        var data = {
            info : params.encipherred,
            shipping_fee : shipping,
            amount : total,
            express_type : expressType
        };
        $.extend(data, address);
        console.log(data);
    });
});
