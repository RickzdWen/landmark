/**
 * Created by Administrator on 2015/3/8.
 */

var CartService = require(ROOT_PATH + '/services/CartService');
var paypal_sdk = require('paypal-rest-sdk');

paypal_sdk.configure({
    'host': 'api.sandbox.paypal.com',
    'client_id': 'ATPW5jxAISD1e_RQ5c9ngoZjDI6QoMJujlgt8zvC0yawLCkF35xzKCbPWSM_gwK7Y8b0vYGcGXDRg2iX',
    'client_secret': 'EDA_tSLZRaR6mRmGsUEEgaMP_m0DDvTOuryaabFkyf0-CviVL6_hnm_DO0ntGjqsoXTtp8NpPD6zSGto' });

module.exports = function(router) {
    router.get('/pay', function(req, res, next){
        try {
            res._format = 'json';
            var uid = req.session.uid;
            CartService.listUserCart(uid, res.lang).then(function(cart){
                var total = cart.totalPrice;
                var subtotal = total;
                var shipping = 0;
                var payment_details = {
                    intent : 'sale',
                    payer : {
                        payment_method : 'paypal'
                    },
                    transactions : [{
                        amount : {
                            total : total,
                            currency : 'USD',
                            details : {
                                subtotal : subtotal,
                                shipping : shipping
                            }
                        },
                        description : 'landmark test payment'
                    }],
                    redirect_urls : {
                        return_url : 'http://localhost:3000/account/paypal/return',
                        cancel_url : 'http://localhost:3000/account/paypal/return_cancel'
                    }
                };
                console.log(payment_details.payer.transactions);
                paypal_sdk.payment.create(payment_details, function(error, payment){
                    if(error){
                        console.error(error);
                        next(error);
                    } else {
                        console.log(payment);
                        res.successJson(payment);
                    }
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/return', function(req, res, next){
        try {
            var paymentId = req.query.paymentId;
            var token = req.query.token;
            var payerId = req.query.PayerID;
            var execute_payment_details = {
                payer_id : payerId
            };
            paypal_sdk.payment.execute(paymentId, execute_payment_details, function(error, payment){
                if(error){
                    console.error(error);
                    next(error);
                } else {
                    console.log(payment);
                    res.render('account/paypal_return', payment);
                }
            });
        } catch (err) {
            next(err);
        }
    });
};
