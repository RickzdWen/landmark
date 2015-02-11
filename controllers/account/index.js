/**
 * Created by rick on 2015/1/30.
 */

var CommonError = require(ROOT_PATH + '/libs/errors/CommonError');

module.exports = function(router){
    router.get('/carts', function(req, res, next){
        try {
            if (req.query.of == 'json') {
                res._format = 'json';
            }
            var CartService = require(ROOT_PATH + '/services/CartService');
            CartService.listUserCart(req.session.uid, res.lang).then(function(ret){
                if (res._format == 'json') {
                    res.successJson(ret);
                } else {
                    res.render('account/carts', ret);
                }
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/wishlist', function(req, res, next){
        try {
            if (req.query.of == 'json') {
                res._format = 'json';
            }
            var WishListService = require(ROOT_PATH + '/services/WishListService');

        } catch (err) {
            next(err);
        }
    });
};
