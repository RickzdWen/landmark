/**
 * Created by rick on 2015/1/30.
 */

var UserService = require(ROOT_PATH + '/services/UserService');
var UserModel = require(ROOT_PATH + '/models/UserModel');
var CommonError = require(ROOT_PATH + '/libs/errors/CommonError');

module.exports = function(router){
    router.get('/login', function(req, res, next){
        try {
            res.render('account/loginAndReg', {
                ref : req.query.ref ? decodeURIComponent(req.query.ref) : '/'
            });
        } catch (err){
            next(err);
        }
    });

    router.get('/reg', function(req, res, next){
        try {
            res.render('account/loginAndReg', {
                isReg : true
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/reg-check', function(req, res, next){
        try {
            res._format = 'json';
            if (req.query.email) {
                UserModel.getInstance().checkEmailExist(req.query.email).then(function(ret){
                    if (ret) {
                        res.failJson(new CommonError('', 52001));
                    } else {
                        res.successJson({});
                    }
                }, function(err){
                    next(err);
                });
            } else {
                res.successJson({});
            }
        } catch (err) {
            next(err);
        }
    });

    router.post('/reg', function(req, res, next){
        try {
            res._format = 'json';
            var data = constructRegData(req.body);
            UserService.register(data).then(function(ret){
                res.successJson({
                    uid : ret.insertId
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });

    function constructRegData(body) {
        return {
            passwd : body.passwd,
            nick : body.nick,
            email : body.email
        };
    }
};
