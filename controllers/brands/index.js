/**
 * Created by Administrator on 2015/3/1.
 */

module.exports = function(router){
    router.get('/', function(req, res, next){
       try {
           res.render('brand/index', {});
       } catch (err) {
           next(err);
       }
    });
};
