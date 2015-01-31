/**
 * Created by rick on 2015/1/8.
 */

var HomeBannerModel = require(ROOT_PATH + '/models/HomeBannerModel');
var ProductService = require(ROOT_PATH + '/services/ProductService');
var UserService = require(ROOT_PATH + '/services/UserService');
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
                req.session.cookie.maxAge = 14 * 24 * 3600 * 1000;
                res.successJson(user);
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });
};
