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

    router.get('/payment', function(req, res, next){
        try {
            WebsiteInfoModel.getInstance().getPaymentDesc(res.lang).then(function(content){
                res.render('about/payment', {
                    content : content
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/delivery', function(req, res, next){
        try {
            WebsiteInfoModel.getInstance().getDeliveryDesc(res.lang).then(function(content){
                res.render('about/delivery', {
                    content : content
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/privacy', function(req, res, next){
        try {
            WebsiteInfoModel.getInstance().getPrivacyDesc(res.lang).then(function(content){
                res.render('about/privacy', {
                    content : content
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/terms', function(req, res, next){
        try {
            WebsiteInfoModel.getInstance().getTermsDesc(res.lang).then(function(content){
                res.render('about/terms', {
                    content : content
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/contact', function(req, res, next){
        try {
            res.render('about/contact', {});
        } catch (err) {
            next(err);
        }
    });

    router.post('/consult', function(req, res, next){
        try {
            var ConsultModel = require(ROOT_PATH + '/models/ConsultModel');
            res._format = 'json';
            if (!req.body.email || !req.body.content || !req.body.nick) {
                throw new CommonError('', 50002);
            }
            ConsultModel.getInstance().addNewOne(constructConsult(req.body)).then(function(ret){
                res.successJson(ret);
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    function constructConsult(body) {
        return {
            nick : body.nick,
            email : body.email,
            content : body.content,
            uid : body.uid
        };
    }
};
