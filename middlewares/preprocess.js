/**
 * Created by rick on 2015/1/31.
 */

module.exports = function(req, res, next){
    var locale = res.getLocale();
    res.lang = locale.substr(3);
    res.successJson = function(json){
        res.json({
            code : 0,
            message : '',
            data : json
        });
    };
    res.failJson = function(err) {
        res.json({
            code : err.code || -1,
            message : (err.getMessage4Production && err.getMessage4Production()) || (err.getMessage && err.getMessage()) || err.message
        });
    };
    res.locals.logonId = req.session.id || '';
    next();
};
