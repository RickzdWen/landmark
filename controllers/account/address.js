/**
 * Created by Administrator on 2015/4/6.
 */

var AddressService = require(ROOT_PATH + '/services/AddressService');
var CommonError = require(ROOT_PATH + '/libs/errors/CommonError');

module.exports = function(router){
    router.post('/shipping', function(req, res, next){
        try {
            res._format = 'json';
            var data = req.body;
            var id = data.id;
            delete data.id;
            delete data._csrf;
            validShipping(data);
            AddressService.updateCurrentUsedAddress(data, req.session.uid, id).then(function(ret){
                res.successJson(ret);
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });
};

function validShipping(data) {
    var except = 'state_short';
    if (data.country == 'US') {
        except = 'state';
    }
    for (var i in data) {
        if (i != except && !data[i]) {
            throw new CommonError('', 53000);
        }
    }
}