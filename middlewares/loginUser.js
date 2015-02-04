/**
 * Created by Administrator on 2015/2/5.
 */

var UserService = require(ROOT_PATH + '/services/UserService');

module.exports = function(req, res, next){
    if (req.session.uid) {
        UserService.getLoginUser(req.session.uid).then(function(user){
            res.locals.user = user;
            next();
        }, function(err){
            next(err);
        });
    } else {
        next();
    }
};
