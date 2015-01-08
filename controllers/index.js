/**
 * Created by rick on 2015/1/8.
 */

module.exports = function(router){
    router.get('/', function(req, res, next){
        res.render('index', {
            title : 'Rick'
        });
    });
};
