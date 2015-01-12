/**
 * Created by Administrator on 2015/1/11.
 */

define([
    'jquery',
    'landmark/xhr'
], function($, xhr){
    var products = {};

    products.search = function(cond, page) {
        cond = cond || {};
        page && (cond.page = page);
        return xhr({
            url : '/products/search',
            data : cond
        });
    };

    products.searchSpecialOffers = function(cond, page) {
        cond = cond || {};
        page && (cond.page = page);
        return xhr({
            url : '/products/search/s',
            data : cond
        });
    };

    return products;
});
