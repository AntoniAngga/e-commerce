if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const logger = require('morgan');
const bodyParser = require('body-parser');
const url_api = '/api/v1/';
const app = express();
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Link routes Here.
// API HERE
require(`./routes${url_api}user.routes.js`)(app);
require(`./routes${url_api}auth.routes.js`)(app);
require(`./routes${url_api}account.routes.js`)(app);
require(`./routes${url_api}/ppob/pln.routes.js`)(app);

//ADMIN DASHBOARD
require('./routes/login.routes.js')(app);
require('./routes/dashboard.routes.js')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
