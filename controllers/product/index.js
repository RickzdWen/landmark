/**
 * Created by Administrator on 2015/1/15.
 */

var ProductService = require(ROOT_PATH + '/services/ProductService');
var q = require('q');

module.exports = function(router){
    router.get('/:id', function(req, res, next){
        try {
            var view = 'product/index';
            q.all([
                ProductService.getOneProductInfo(req.params.id, res.lang),
                ProductService.getRelatedSpecialOffers(req.params.id, res.lang)
            ]).then(function(resArray){
                var product = resArray[0];
                var offers = resArray[1];
                res.render(view, {
                    product : product,
                    offers : offers
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });
};
