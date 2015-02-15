/**
 * Created by Administrator on 2015/2/16.
 */

module.exports = function(router) {
    router.get('/', function(req, res, next){
        try {
            res.render('faq/index', {});
        } catch (err) {
            next(err);
        }
    });
};
