/**
 * Created by rick on 2015/1/30.
 */

var UserService = require(ROOT_PATH + '/services/UserService');

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
