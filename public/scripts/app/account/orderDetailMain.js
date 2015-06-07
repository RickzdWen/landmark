/**
 * Created by Administrator on 2015/5/30.
 */

require([
    'domReady!',
    'jquery',
    'lib/underscore',
    'app/account/OrderAddressForm',
    'app/account/RefundReasonForm',
    'app/services/account',
    'app/common/params',
    'app/common/commonRun'
], function(doc, $, _, OrderAddressForm, RefundReasonForm, account, params){
    var $aWrapper = $('#addressWrapper');
    var $rWrapper = $('#refundWrapper');
    var $eWrapper = $('#errorWrapper');
    var $reasonNode = $rWrapper.find('textarea');
    var $errorNode = $eWrapper.find('.ui-error-msg');
    var $addressReview = $aWrapper.find('.address-review');
    var reviewTemplate = _.template($('#addressReviewTpl').html());
    if (params.status < 2) {
        var aForm = new OrderAddressForm({
            $wrapper : $aWrapper,
            cb : finishAddress
        });

        $('#addressSubmitBtn').on('click', function(e){
            e.preventDefault();
            aForm.$form.submit();
        });
    }

    $aWrapper.find('.js-edit-icon').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        toEditAddress();
    });

    var requesting = false;
    $('#confirmReceiveBtn').on('click', function(e){
        e.preventDefault();
        if (requesting) {
            return;
        }
        requesting = true;
        account.confirmReceive(params.id).then(function(){
            $('.js-operate').hide();
            window.location.reload(true).replace();
        }, function(error){
            alert(error.message);
        }).always(function(){
            requesting = false;
        });
    });

    $('#applyRefundBtn').on('click', function(e){
        e.preventDefault();
        $rWrapper.show();
        $('.js-operate').hide();
        $('#cancelRefundBtn').show();
        $('#applyRefundBtn2').show();
    });

    if ($rWrapper.length) {
        var rForm = new RefundReasonForm({
            $wrapper : $rWrapper,
            cb : finishApply,
            orderId : params.id
        });

        $('#applyRefundBtn2').on('click', function(e){
            e.preventDefault();
            rForm.$form.submit();
        });
    }

    $('#cancelRefundBtn').on('click', function(e){
        e.preventDefault();
        if (params.status == 1) {
            $rWrapper.hide();
            $('.js-operate').hide();
            $('#confirmReceiveBtn').show();
            $('#applyRefundBtn').show();
        } else if (params.status == 5) {
            account.cancelApplyRefund(params.id).then(function(){
                hideError();
                window.location.reload(true).replace();
            }, function(error){
                showError(error.message);
            });
        }
    });

    $('#cancelOrderBtn').on('click', function(e){
        e.preventDefault();
        if (requesting) {
            return;
        }
        requesting = true;
        account.cancelOrder(params.id).then(function(){
            window.location.reload(true).replace();
        }, function(error){
            showError(error.message);
        }).always(function(){
            requesting = false;
        });
    });

    $eWrapper.on('click', '.close', function(e){
        e.preventDefault();
        hideError();
    });

    function toEditAddress() {
        $aWrapper.find('a.js-title').hide().siblings('.js-title').show();
        aForm.$form.show().siblings('.checkout-content').hide();
    }

    function finishAddress(data){
        $aWrapper.find('a.js-title').show().siblings('.js-title').hide();
        renderAddressReview(data);
        aForm.$form.hide().siblings('.checkout-content').show();
    }

    function renderAddressReview(data) {
        if (data.country == 'US') {
            var state = aForm.$state_shortInput.children(':selected').text();
            data.state = state;
        }
        data.country = aForm.$countryInput.children(':selected').text();
        $addressReview.html(reviewTemplate(data));
    }

    function finishApply() {
        $rWrapper.hide();
        window.location.reload(true).replace();
    }

    function showError(msg) {
        $errorNode.text(msg);
        $eWrapper.show();
    }

    function hideError() {
        $errorNode.text('');
        $eWrapper.slideUp();
    }
});
