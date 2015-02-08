/**
 * Created by rick on 2015/1/8.
 */

var HomeBannerModel = require(ROOT_PATH + '/models/HomeBannerModel');
var ProductService = require(ROOT_PATH + '/services/ProductService');
var UserService = require(ROOT_PATH + '/services/UserService');
var UserModel = require(ROOT_PATH + '/models/UserModel');
var q = require('q');

module.exports = function(router){
    router.get('/', function(req, res, next){
        try {
            q.all([
                HomeBannerModel.getInstance().getAllDisplayedBanners(res.lang),
                ProductService.getHomeProductList(res.lang),
                ProductService.getLatestSpecialOffers(res.lang)
            ]).then(function(resArray){
                var banners = resArray[0];
                var products = resArray[1];
                var offers = resArray[2];
                res.render('index', {
                    banners : banners || [],
                    products : products || [],
                    offers : offers || []
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.post('/login', function(req, res, next){
        try {
            res._format = 'json';
            UserService.login(req.body).then(function(user){
                delete user.passwd;
                delete user.salt;
                req.session.uid = user.id;
                if (req.body.rememberme) {
                    req.session.cookie.maxAge = 14 * 24 * 3600 * 1000;
                }
                res.successJson(user);
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/login', function(req, res, next){
        try {
            res.render('account/loginAndReg', {
                ref : req.query.ref ? req.query.ref : '/',
                isReg : 0
            });
        } catch (err){
            next(err);
        }
    });

    router.post('/logout', function(req, res, next){
        try {
            res._format = 'json';
            req.session.destroy(function(err){
                if (err) {
                    next(err);
                } else {
                    res.successJson({});
                }
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/reg', function(req, res, next){
        try {
            res.render('account/loginAndReg', {
                ref : req.query.ref ? req.query.ref : '/',
                isReg : 1
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/reg-check', function(req, res, next){
        try {
            res._format = 'json';
            if (req.query.email) {
                UserModel.getInstance().checkEmailExist(req.query.email).then(function(ret){
                    if (ret) {
                        res.failJson(new CommonError('', 52001));
                    } else {
                        res.successJson({});
                    }
                }, function(err){
                    next(err);
                });
            } else {
                res.successJson({});
            }
        } catch (err) {
            next(err);
        }
    });

    router.post('/reg', function(req, res, next){
        try {
            res._format = 'json';
            var data = constructRegData(req.body);
            UserService.register(data).then(function(ret){
                res.successJson({
                    uid : ret.insertId
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    function constructRegData(body) {
        return {
            passwd : body.passwd,
            nick : body.nick,
            email : body.email
        };
    }
};
