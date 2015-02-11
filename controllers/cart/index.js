/**
 * Created by Administrator on 2015/2/8.
 */

var CartService = require(ROOT_PATH + '/services/CartService');
var CommonError = require(ROOT_PATH + '/libs/errors/CommonError');

module.exports = function(router){
    router.post('/', function(req, res, next){
        try {
            res._format = 'json';
            if (!req.session.uid) {
                throw new CommonError('', 50000);
            } else {
                CartService.addToCart(req.body.sid, req.body.pid, req.session.uid, req.body.qty).then(function(ret){
                    res.successJson(ret);
                }, function(err){
                    next(err);
                });
            }
        } catch (err) {
            next(err);
        }
    });

    router.delete('/:id', function(req, res, next){
        try {
            res._format = 'json';
            if (!req.session.uid) {
                throw new CommonError('', 50000);
            } else {
                CartService.removeCartItem(req.params.id, req.session.uid).then(function(){
                    res.successJson({});
                }, function(err){
                    next(err);
                });
            }
        } catch (err) {
            next(err);
        }
    });

    router.put('/qty/:id', function(req, res, next){
        try {
            res._format = 'json';
            if (!req.session.uid) {
                throw new CommonError('', 50000);
            } else {
                CartService.updateCartQty(req.params.id, req.session.uid, req.body.qty).then(function(){
                    res.successJson({});
                }, function(err){
                    next(err);
                });
            }
        } catch (err) {
            next(err);
        }
    });
};
