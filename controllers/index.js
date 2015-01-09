/**
 * Created by rick on 2015/1/8.
 */

var HomeBannerModel = require(ROOT_PATH + '/models/HomeBannerModel');

module.exports = function(router){
    router.get('/', function(req, res, next){
        try {
            console.log(res.lang);
            HomeBannerModel.getInstance().getAllDisplayedBanners(res.lang).then(function(rows){
                console.log(rows);
                res.render('index', {
                    banners : rows || []
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });
};
