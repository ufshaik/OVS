var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//var flash = require('connect-flash');
var session = require('express-session');
var $ = require('jquery');

//ovs2 mongodb://reaper:starwars@ds259305.mlab.com:59305/ovs2
//ovs mongodb://reaper:starwars@ds119476.mlab.com:19476/ovs

mongoose.connect('mongodb://reaper:starwars@ds259305.mlab.com:59305/ovs2')
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));






var index = require('./routes/index')
var voter = require('./routes/voter');
var em = require('./routes/em');
var candidates = require('./routes/candidates')
var elections = require('./routes/elections')
var party = require('./routes/party')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
//app.use(flash(app));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'Vader',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 2020
  }
}));

app.use('/', index)
app.use('/voters', voter);
app.use('/em', em);
app.use('/candidates', candidates);
app.use('/party', party);
app.use('/elections', elections);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
