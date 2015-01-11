/**
 * Created by Administrator on 2015/1/11.
 */

var ProductCategoryModel = require(ROOT_PATH + '/models/ProductCategoryModel');
var BrandModel = require(ROOT_PATH + '/models/BrandModel');
var ProductModel = require(ROOT_PATH + '/models/ProductModel');
var ProductService = require(ROOT_PATH + '/services/ProductService');
var q = require('q');

module.exports = function(router){
    router.get('/', function(req, res, next){
        try {
            q.all([
                ProductCategoryModel.getInstance().getAll(),
                BrandModel.getInstance().getAll(),
                ProductModel.getInstance().getNumberByCategory(),
                ProductModel.getInstance().getNumberByBrand()
            ]).then(function(resArray){
                var categories = resArray[0];
                var brands = resArray[1];
                var cinfo = resArray[2];
                var binfo = resArray[3];
                categories.forEach(function(cat){
                    cat.name = cat['name_' + res.lang];
                    cat.qty = cinfo[cat.id] || 0;
                });
                brands.forEach(function(brand){
                    brand.name = brand['name_' + res.lang];
                    brand.qty = binfo[brand.id] || 0;
                });
                res.render('products/index', {
                    categories : categories,
                    brands : brands
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/search', function(req, res, next){
        res._format = 'json';
        try {
            ProductService.searchProducts(req.query, res.lang).then(function(info){
                res.successJson(info);
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });
};
