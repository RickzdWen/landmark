/**
 * Created by Administrator on 2015/5/19.
 */

var CommonError = require(ROOT_PATH + '/libs/errors/CommonError');
var OrderService = require(ROOT_PATH + '/services/OrderService');

module.exports = function(router) {
    router.get('/:id', function(req, res, next){
        try {
            OrderService.getOrderDetail(req.params.id, req.session.uid).then(function(data){
                var util = require(ROOT_PATH + '/libs/util');
                if (data) {
                    data.id = req.params.id;
                    data.countries = util.countries;
                    data.usStates = util.usStates;
                }
                res.render('account/order', data);
            }, function(err){
                next(err);
            })
        } catch (err) {
            next(err);
        }
    });
};
