/**
 * Created by Administrator on 2015/5/19.
 */

var CommonError = require(ROOT_PATH + '/libs/errors/CommonError');

module.exports = function(router) {
    router.get('/:id', function(req, res, next){
        try {
            
        } catch (err) {
            next(err);
        }
    });
};
