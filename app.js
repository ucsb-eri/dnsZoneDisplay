var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var fileUtils = require('./fileUtils');

var LOGDIR = '/var/log/nodejs';
var LOGFILE = LOGDIR + '/dnsZoneDisplay.log';
var CONF = './config.json';

if ( fileUtils.fileExists(CONF) == false ) {
    // want to do some kind of error generation
    console.log('You need to copy config-default.json to config.json.');
    console.log('Then edit config.json to reflect any values specfied.');
    console.log('Most critical is the zonedir path.');
    process.exit(0);
}

var routes = require('./routes/index');
var zones = require('./routes/zones');
var users = require('./routes/users');
var apizonelist = require('./routes/apizonelist');
var apizoneshow = require('./routes/apizoneshow');
//var config = require('./routes/config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.listen(3000);

if (! fileUtils.dirExists(LOGDIR)){
    console.log('Log directory: ' + LOGDIR + ' doesnt exist.');
    process.exit(0);
}

fileUtils.canWrite(LOGFILE,function(err,success){
    if( ! success) {
        console.log('Unable to open or write to logfile: ' + LOGFILE + '.');
        process.exit(0);
    }
});

// Need to sort out using try/catch errors etc...
//try {
    //console.log('opening logfile: ' + LOGFILE );
    
    //if ( ! fileUtils.canWrite(LOGFILE)){
    //    console.log('Cant write to logfile: ' + LOGFILE + '.');
    //    process.exit(0);
    //}
///}
///catch (err){
///    console.log('Not able to open or write to logfile: ' + LOGFILE + '.');
///    process.exit(0);
///}

var accessLogStream = fs.createWriteStream(LOGFILE, {flags: 'a'});
var ret = accessLogStream.write("#### Starting new process",'utf8');
if ( ret == false) {
    console.log("initial write failed");
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined', { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
     
var conf = require(CONF);

app.use('/', routes);
app.use('/users', users);
app.use('/zone', zones);
app.use('/api/zone/list', apizonelist);
app.use('/api/zone/show', apizoneshow
    );

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
