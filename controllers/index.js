/**
 * Created by rick on 2015/1/8.
 */

var HomeBannerModel = require(ROOT_PATH + '/models/HomeBannerModel');
var ProductService = require(ROOT_PATH + '/services/ProductService');
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
};
