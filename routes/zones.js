var express = require('express');
var router = express.Router();
var conf = require('../config.json');
var fs = require('fs');

var glob = require('glob-fs')({ gitignore: true });
var prevwd = process.cwd();
// should verify that conf.zonedir exists
process.chdir(conf.zonedir);
var files = glob.readdirSync('zone.*');
process.chdir(prevwd);
/* GET home page. */
/* Ideally need to check the path we are given and verify that its in the file list we just acquired */
router.get('/zone.*', function(req, res, next) {
  //res.send("<p>Hey There</p>"+req.path);
  var valid = false;
  for (file of files){
      if ( req.path == '/'+file ){
          valid = true;
          var which = file;
          //var fd = fs.openSync(conf.zonedir+'/'+file,'r');
          var contents = fs.readFileSync(conf.zonedir+'/'+file);
      }
  }
  if ( valid == true ){
      res.render('zone', { title: 'dnsZoneDisplay Zone', conf: conf, file: which, contents : contents });
  }
  else {
      res.send('Having issues finding the zone file'+req.path);
  }
});

module.exports = router;
