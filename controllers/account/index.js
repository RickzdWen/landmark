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

    router.get(/^\/wishlist(\/(\d+)?)?$/, function(req, res, next){
        try {
            if (req.query.of == 'json') {
                res._format = 'json';
            }
            var WishListService = require(ROOT_PATH + '/services/WishListService');
            var page = req.params[1];
            if (!page || isNaN(page) || page <= 0) {
                page = 1;
            }
            WishListService.listByPage(req.session.uid, page, res.lang).then(function(ret){
                if (res._format == 'json') {
                    res.successJson(ret);
                } else {
                    res.render('account/wishlist', ret);
                }
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.get(/^\/orders(\/(\d+)?)?$/, function(req, res, next){
        try {
            if (req.query.of == 'json') {
                res._format = 'json';
            }
            var OrderService = require(ROOT_PATH + '/services/OrderService');
            var page = req.params[1];
            if (!page || isNaN(page) || page <= 0) {
                page = 1;
            }
            OrderService.getOrdersByUid(req.session.uid, page).then(function(ret){
                if (res._format == 'json') {
                    res.successJson(ret);
                } else {
                    res.render('account/orders', ret);
                }
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/carts/checkout', function(req, res, next){
        try {
            var CartService = require(ROOT_PATH + '/services/CartService');
            var AddressService = require(ROOT_PATH + '/services/AddressService');
            var commonConfig = require(ROOT_PATH + '/configs/commonConfig');
            var util = require(ROOT_PATH + '/libs/util');
            var q = require('q');
            q.all([
                CartService.listUserCart(req.session.uid, res.lang),
                AddressService.getCurrentUsedAddress(req.session.uid)
            ]).then(function(ret){
                console.log(ret);
                var carts = ret[0];
                var address = ret[1] || {country : 'US'};
                var snapshot = JSON.stringify(carts);
                var crypto = require('crypto');
                var cipher = crypto.createCipher('blowfish', commonConfig.CHEKOUT_KEY + req.session.uid);
                var enciphered = cipher.update(snapshot, 'utf8', 'hex');
                enciphered += cipher.final('hex');

//                var decipher = crypto.createDecipher('blowfish', commonConfig.CHEKOUT_KEY);
//                var content = decipher.update(enciphered, 'hex', 'utf8');
//                content += decipher.final('utf8');

                res.render('account/checkout', {
                    encipherred : enciphered,
                    carts : carts,
                    address : address,
                    countries : util.countries,
                    usStates : util.usStates
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.post('/carts/place-holder', function(req, res, next){
        try {
            var data = req.body.data;
            data = JSON.parse(data);
            console.log(data);
            var enciphered = data.info;
            var crypto = require('crypto');
            var commonConfig = require(ROOT_PATH + '/configs/commonConfig');
            var decipher = crypto.createDecipher('blowfish', commonConfig.CHEKOUT_KEY + req.session.uid);
            var content = decipher.update(enciphered, 'hex', 'utf8');
            content += decipher.final('utf8');
            var carts = JSON.parse(content);

            var OrderService = require(ROOT_PATH + '/services/OrderService');
            OrderService.placePaypalOrder(req.session.uid, data, carts).then(function(ret){
                var payment = ret.payment;
                var links = payment.links;
                var approveLinks = links.filter(function(item){
                    return item.rel == 'approval_url';
                });
                if (approveLinks && approveLinks[0]) {
                    res.redirect(approveLinks[0].href);
                } else {
                    throw new CommonError('', 54004);
                }
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });
};
