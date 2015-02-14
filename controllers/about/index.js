/**
 * Created by Windows7 on 2015/2/14.
 */

var WebsiteInfoModel = require(ROOT_PATH + '/models/WebsiteInfoModel');

module.exports = function(router){
    router.get('/', function(req, res, next){
        try {
            WebsiteInfoModel.getInstance().getAboutDesc(res.lang).then(function(content){
                res.render('about/index', {
                    content : content
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });
};
