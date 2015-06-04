/**
 * Created by Administrator on 2015/4/18.
 */

var CommonError = require(ROOT_PATH + '/libs/errors/CommonError');

module.exports = function(router) {
    router.get('/return', function(req, res, next){
        try {
            var OrderService = require(ROOT_PATH + '/services/OrderService');
            var payerId = req.query.PayerID;
            var paymentId = req.query.paymentId;
            OrderService.executePaypalPayment(req.session.uid, payerId, paymentId).then(function(payment){
                console.log(payment);
                res.render('account/paypalReturn');
            }, function(err){
                next(err);
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    });
};
