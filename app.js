/* global settings,allowOnly*/
/********************************
 * 
 * Global Settings
 * 
 ********************************/
// global.settings = require('./.settings');
// global.db = require('knex')(require('./knexfile'));
// global.allowOnly = require('./lib/permission.js').allowOnly;

/********************************
 * 
 * Required Packages
 * 
 ********************************/
const
    express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MySQLStore = require('express-mysql-session')(session),
    csurf = require('csurf'),
    logger = require('morgan'),
    helmet = require('helmet'),
    compress = require('compression'),
    passport = require('passport'),
    expressValidator = require('express-validator'),
    favicon = require('serve-favicon'),
    settings = require('./config/application'),
    dbconfig = require('./config/database')
    ;

/********************************
 * 
 * Application Settings
 * 
 ********************************/

/* Session */
app.use(session({
    resave: true,
    secret: settings.session_secret,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    saveUninitialized: true,
    store: new MySQLStore({
        port: 3306,
        host: dbconfig.host,
        user: dbconfig.username,
        password: dbconfig.password,
        database: dbconfig.database
    })
}));

/* Body parser
* parse application/x-www-form-urlencoded
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Passport */
app.use(passport.initialize());
app.use(passport.session()); //Persistent login sessions

/* Console logging */
app.use(logger(settings.logger.level));
// if (settings.logger.enabled && !settings.logger.showOnErrors) {
//     app.use(logger(settings.logger.level));
// } else if (settings.logger.enabled && settings.logger.showOnErrors) {
//     app.use(logger(settings.logger.level, {
//         skip: function (req, res) { return res.statusCode < 400; }
//     }));
// }

/* Helps secure Express with various HTTP Headers */
app.use(helmet());

/* Express Messages Middleware */
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});



/* Express Validator Middleware */
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

/* 
* Compress traffic
* Allow only the first proxy
* Cache all views
*/
// if (settings.mode === 'prod') {
//     app.use(compress());
//     app.set('trust proxy', 1);
//     app.enable('view cache');
// }

/*
* Set CSRF token for all get requests
* csrfToken: req.body._csrf
*/
app.use(csurf());
app.get('*', function (req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
});

/********************************
 * 
 * View Engine Settings
 * 
 ********************************/
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/static')));
app.use(favicon(path.join(__dirname, 'static/img', 'favicon.ico')));

/********************************
 * 
 * Routes
 * 
 ********************************/
app.use(require('./routes/route'));
// app.use('/users', require('./routes/users'));

/********************************
 * 
 * Listening Port
 * 
 ********************************/
app.listen(settings.port, settings.ip, function () {
    console.log(`Application now running on ${settings.ip}:${settings.port}`);
});

