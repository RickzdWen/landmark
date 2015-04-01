/**
 * Created by Administrator on 2015/3/31.
 */

require([
    'domReady!',
    'jquery',
    'app/account/AddressForm',
    'app/common/commonRun'
], function(doc, $, AddressForm){
    var aForm = new AddressForm({
        $wrapper : $('#addressWrapper')
    });
    $('#addressSubmitBtn').on('click', function(e){
        e.preventDefault();
        aForm.$form.submit();
    });
});
