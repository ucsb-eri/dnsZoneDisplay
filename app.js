var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

function fileExists(filePath)
{
    try
    {
        return fs.statSync(filePath).isFile();
    }
    catch (err)
    {
        return false;
    }
}
if ( ! fileExists('./config.json')) {
    // want to do some kind of error generation
    console.log('You need to copy config-default.json to config.json\nThen edit config.json to reflect any values specfied.\nMost critical is the zonedir path.');
    return "Error String";
    exit ;
}

var routes = require('./routes/index');
var zones = require('./routes/zones');
var users = require('./routes/users');
//var config = require('./routes/config');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(3001,'fablio-mini');

var accessLogStream = fs.createWriteStream('/var/log/nodejs/dnsZoneDisplay.log', {flags: 'a'})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined', { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

        
var conf = require('./config.json');

app.use('/', routes);
app.use('/users', users);
app.use('/zone', zones);


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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
