/**
 * Created by Administrator on 2015/1/18.
 */

var ProductService = require(ROOT_PATH + '/services/ProductService');
var q = require('q');

module.exports = function(router){
    router.get('/:id', function(req, res, next){
        try {
            var id = req.params.id;
            var view = 'product/specialOffer';
            q.all([
                ProductService.getOneSpecialOfferInfo(id, res.lang),
                ProductService.getRelatedProducts(id, res.lang)
            ]).then(function(resArray){
                var offer = resArray[0];
                var products = resArray[1];
                res.render(view, {
                    offer : offer,
                    products : products
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });
};
