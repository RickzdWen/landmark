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
    'app/common/commonRun'
], function(doc, $, AddressForm, account, _, numeral){
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

    $('input[name=shipping-price]').on('change', function(){
        var price = $(this).val();
        $('#shippingPrice').text('$' + numeral(price).format('0.00')).data('price', price);
        var subTotal = $('#subTotalPrice').data('price');
        var total = +price + +subTotal;
        $('#totalPrice').text('$' + numeral(total).format('0.00'));
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
});
