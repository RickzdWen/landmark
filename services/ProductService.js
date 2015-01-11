/**
 * Created by Administrator on 2015/1/10.
 */

var ProductModel = require('../models/ProductModel');
var SalesProductModel = require('../models/SalesProductModel');
var SalesProductRelationModel = require('../models/SalesProductRelationModel');
var BrandModel = require(ROOT_PATH + '/models/BrandModel');
var q = require('q');
var numeral = require('numeral');

exports.getHomeProductList = function(lang) {
    lang = lang || 'us';
    var defer = q.defer();
    q.all([
        ProductModel.getInstance().getByPage('published=? AND deleted=? ORDER BY updated DESC', [1, 0], '*', 1, 8),
        BrandModel.getInstance().getAllMap()
    ]).then(function(resArray){
        var products = resArray[0].result;
        var brands = resArray[1];
        defer.resolve(mergeProductAndBrand(products, brands, lang));
    }, function(err){
        defer.reject(err);
    });
    return defer.promise;
};

exports.getLatestSpecialOffers = function(lang) {
    lang = lang || 'us';
    var defer = q.defer();
    SalesProductModel.getInstance().getByPage('special_offer=? AND deleted=? AND published=? ORDER BY updated DESC', [1, 0, 1], '*', 1, 8).
        then(function(res){
            var offers = res.result || [];
            offers.forEach(function(offer){
                offer.price = numeral(offer.price / 1000).format('0.00');
                offer.title = offer['title_' + lang];
            });
            defer.resolve(offers);
        }, function(err){
            defer.reject(err);
        });
    return defer.promise;
};

exports.searchProducts = function(query, lang) {
    var page = query.page || 1;
    var cid = query.cid;
    var bid = query.bid;
    var sortBy = query.sort_by;
    var sortDirect = query.sort_direct;
    var priceLeft = query.price_left;
    var priceRight = query.price_right;

    switch (sortBy) {
        case 'p' :
            sortBy = 'price';
            break;
        default :
            sortBy = 'created';
            break;
    }

    if (sortDirect) {
        sortDirect = 'ASC';
    } else {
        sortDirect = 'DESC';
    }

    var sql = 'published=? AND deleted=?';
    var cond = [1, 0];
    if (cid) {
        sql += ' AND cid=?';
        cond.push(cid);
    }
    if (bid) {
        sql += ' AND bid=?';
        cond.push(bid);
    }
    if (!isNaN(priceLeft) && !isNaN(priceRight)) {
        sql += ' AND price BETWEEN ? AND ?';
        cond.push(priceLeft * 1000);
        cond.push(priceRight * 1000);
    }
    sql += ' ORDER BY ' + sortBy + ' ' + sortDirect;
    var defer = q.defer();
    q.all([
        ProductModel.getInstance().getByPage(sql, cond, '*', page, 15),
        BrandModel.getInstance().getAllMap()
    ]).then(function(resArray){
        var info = resArray[0];
        var productsList = info.result;
        var brands = resArray[1];
        var list = mergeProductAndBrand(productsList, brands, lang);
        info.result = list;
        defer.resolve(info);
    }, function(err){
        defer.reject(err);
    });
    return defer.promise;
};

function mergeProductAndBrand(products, brands, lang) {
    var ret = [];
    products = products || [];
    products.forEach(function(product){
        var obj = {};
        obj.name = product['name_' + lang];
        var brand = product.bid && brands[product.bid];
        if (brand) {
            obj.brand = brand['name_' + lang];
        }
        obj.price = numeral(product.price / 1000).format('0.00');
        obj.id = product.id;
        obj.img_version = product.img_version;
        obj.cid = product.cid;
        obj.bid = product.bid;
        obj.qty = product.qty;
        ret.push(obj);
    });
    return ret;
}
