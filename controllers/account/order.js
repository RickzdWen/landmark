/**
 * Created by Administrator on 2015/5/19.
 */

var CommonError = require(ROOT_PATH + '/libs/errors/CommonError');
var OrderService = require(ROOT_PATH + '/services/OrderService');

module.exports = function(router) {
    router.get('/:id', function(req, res, next){
        try {
            OrderService.getOrderDetail(req.params.id, req.session.uid).then(function(data){
                var util = require(ROOT_PATH + '/libs/util');
                if (data) {
                    data.id = req.params.id;
                    data.countries = util.countries;
                    data.usStates = util.usStates;
                }
                res.render('account/order', data);
            }, function(err){
                next(err);
            })
        } catch (err) {
            next(err);
        }
    });

    router.put('/address/:id', function(req, res, next){
        try {
            res._format = 'json';
            OrderService.modifyOrderAddress(req.session.uid, req.params.id, req.body).then(function(){
                res.successJson({});
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.post('/receive/:id', function(req, res, next){
        try {
            res._format = 'json';
            OrderService.confirmReceive(req.session.uid, req.params.id).then(function(){
                res.successJson({});
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.post('/apply-refund/:id', function(req, res, next){
        try {
            res._format = 'json';
            if (!req.body.reason) {
                throw new CommonError('', 54003);
            }
            OrderService.applyPaypalRefund(req.session.uid, req.params.id, req.body.reason).then(function(){
                res.successJson({});
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.delete('/apply-refund/:id', function(req, res, next){
        try {
            res._format = 'json';
            OrderService.cancelPaypalRefund(req.session.uid, req.params.id).then(function(){
                res.successJson({});
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.put('/apply-refund/reason/:id', function(req, res, next){
        try {
            res._format = 'json';
            if (!req.body.reason) {
                throw new CommonError('', 54003);
            }
            OrderService.modifyRefundReason(req.session.uid, req.params.id, req.body.reason).then(function(){
                res.successJson({});
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/pay/:id', function(req, res, next){
        try {
            res._format = 'json';
            OrderService.payAgain(req.session.uid, req.params.id).then(function(payment){
                res.successJson(payment);
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });
};
