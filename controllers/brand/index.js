/**
 * Created by Administrator on 2015/3/1.
 */

var BrandModel = require(ROOT_PATH + '/models/BrandModel');

module.exports = function(router){
    router.get('/:id', function(req, res, next){
        try {
            BrandModel.getInstance().getOne('id=?', [req.params.id]).then(function(brand){
                brand.name = brand['name_' + res.lang];
                brand.desc = brand['desc_' + res.lang];
                res.render('brand/desc', {
                    brand : brand
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });
};
