/**
 * Created by Administrator on 2015/1/11.
 */

var ProductCategoryModel = require(ROOT_PATH + '/models/ProductCategoryModel');
var BrandModel = require(ROOT_PATH + '/models/BrandModel');
var ProductModel = require(ROOT_PATH + '/models/ProductModel');
var ProductService = require(ROOT_PATH + '/services/ProductService');
var SalesProductModel = require(ROOT_PATH + '/models/SalesProductModel');
var SalesProductRelationModel = require(ROOT_PATH + '/models/SalesProductRelationModel');
var q = require('q');

module.exports = function(router){
    router.get('/', function(req, res, next){
        try {
            res.render('products/index');
        } catch (err) {
            next(err);
        }
    });

    router.get('/all', function(req, res, next){
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
                res.render('products/all', {
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

    router.get('/special_offers', function(req, res, next){
        try {
            var view = 'products/specialOffers';
            SalesProductModel.getInstance().getAll('special_offer=? AND published=? AND deleted=?', [1, 1, 0], 'id').then(function(rows){
                var ret = _getSqlArray(rows, 'id');
                if (!ret.length) {
                    res.render(view, {list : []});
                } else {
                    SalesProductRelationModel.getInstance().getAll('sid IN (' + ret.join(',') + ') GROUP BY pid', [], 'COUNT(*) AS count,pid').then(function(rels){
                        var rret = _getSqlArray(rels, 'pid');
                        if (!rret.length) {
                            res.render(view, {list : []});
                        } else {
                            var pModel = ProductModel.getInstance();
                            pModel.getAll('id IN (' + rret.join(',') + ')').then(function(products){
                                var map = pModel.getMap(products, 'id');
                                rels.forEach(function(rel){
                                    rel.name = map[rel.pid]['name_' + res.lang];
                                });
                                res.render(view, {list : rels});
                            }, function(err){
                                next(err);
                            });
                        }
                    }, function(err){
                        next(err);
                    });
                }
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

    router.get('/search/s', function(req, res, next){
        res._format = 'json';
        try {
            ProductService.searchSpecialOffers(req.query, res.lang).then(function(info){
                res.successJson(info);
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/certs', function(req, res, next){
        try {
            ProductService.getCertificates(res.lang).then(function(rows){
                res.render('products/certs', {
                    list : rows || []
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });
};

function _getSqlArray(rows, key) {
    rows = rows || [];
    var ret = [];
    rows.forEach(function(item){
        ret.push(item[key]);
    });
    return ret;
}
