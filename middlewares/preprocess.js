/**
 * Created by rick on 2015/1/31.
 */

module.exports = function(req, res, next){
    var locale = res.getLocale();
    res.lang = locale.substr(3);
    res.locals.lang = res.lang;
    res.successJson = function(json){
        res.json({
            code : 0,
            message : '',
            data : json
        });
    };
    res.failJson = function(err, lang) {
        lang = lang || res.lang;
        res.json({
            code : err.code || -1,
            message : (err.getMessage4Production && err.getMessage4Production(lang)) || (err.getMessage && err.getMessage()) || err.message
        });
    };
    res.locals.logonId = req.session.uid || '';
    res.locals._csrf = req.csrfToken();
    if (!req.session.uid && /^\/account/i.test(req.path)) {
        var ref = req.originalUrl;
        res.redirect('/login?ref=' + encodeURIComponent(ref));
    } else {
        next();
    }
};
