/**
 * Created by Windows7 on 2015/2/11.
 */

var WishListService = require(ROOT_PATH + '/services/WishListService');
var CommonError = require(ROOT_PATH + '/libs/errors/CommonError');

module.exports = function(router) {
    router.post('/', function(req, res, next){
        try {
            res._format = 'json';
            if (!req.session.uid) {
                throw new CommonError('', 50000);
            } else {
                WishListService.addToWishList(req.session.uid, req.body.sid, req.body.pid).then(function(){
                    res.successJson({});
                }, function(err){
                    next(err);
                });
            }
        } catch (err) {
            next(err);
        }
    });

    router.get('/count', function(req, res, next){
        try {
            res._format = 'json';
            if (!req.session.uid) {
                throw new CommonError('', 50000);
            } else {
                WishListService.getListNum(req.session.uid).then(function(count){
                    res.successJson({
                        count : count
                    });
                }, function(err){
                    next(err);
                });
            }
        } catch (err) {
            next(err);
        }
    });

    router.delete('/:sid', function(req, res, next){
        try {
            res._format = 'json';
            if (!req.session.uid) {
                throw new CommonError('', 50000);
            } else {
                WishListService.delete(req.params.sid, req.session.uid).then(function(){
                    res.successJson({});
                }, function(err){
                    next(err);
                });
            }
        } catch (err) {
            next(err);
        }
    });
};
