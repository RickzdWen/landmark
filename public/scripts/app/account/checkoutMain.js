/**
 * Created by Administrator on 2015/3/31.
 */

require([
    'domReady!',
    'jquery',
    'app/account/CheckoutForm',
    'app/common/commonRun'
], function(doc, $, CheckoutForm){
    var aForm = new CheckoutForm({
        $wrapper : $('#addressWrapper'),
        inputNames : ['country', 'first_name', 'last_name', 'street', 'city', 'zip', 'state'],
        validateNames : ['country', 'first_name', 'last_name', 'street', 'city', 'zip', 'state']
    });
});
