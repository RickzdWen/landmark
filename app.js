var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var RedisStore = require('connect-redis')(session);
var ejs = require('ejs');
var i18n = require('i18n');
var csrf = require('csurf');

global.ROOT_PATH = __dirname;
global.DB_CONFIG_FILE = __dirname + '/configs/dbConfig';
if (/^win/.test(process.platform)) {
    global.DATA_PATH = __dirname + '/../lm_data';
} else {
    global.DATA_PATH = '/lm_data';
}

i18n.configure({
    locales : ['en-us', 'zh-cn', 'zh-hk'],
    defaultLocale : 'en-us',
    cookie : 'lang',
    directory : __dirname + '/locales',
    extension: '.json',
    objectNotation : true
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);

app.use(session({
    name : 'lmpsess',
    store: new RedisStore({
        host: "113.10.139.120",
        port: 6379,
        pass : 'rickca-redis',
        ttl : 30 * 24 * 3600
    }),
    resave:false,
    saveUninitialized:false,
    secret: 'rick_lmp',
    cookie : { path: '/', httpOnly: true, secure: false, maxAge: null }
}));

app.use(csrf());

app.use(require(path.join(ROOT_PATH, 'middlewares/preprocess')));

require(path.join(ROOT_PATH, 'middlewares/route'))(app, {
    verbose : false
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        if (res._format == 'json') {
            res.failJson(err);
        } else {
            res.render('error', {
                message: (err.getMessage && err.getMessage()) || err.message,
                error: err
            });
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (res._format == 'json') {
        res.failJson(err);
    } else {
        res.render('error', {
            message: (err.getMessage && err.getMessage()) || err.message,
            error: err
        });
    }
});


module.exports = app;
