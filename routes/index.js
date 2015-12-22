var express = require('express');
var router = express.Router();
var conf = require('../config.json');

var glob = require('glob-fs')({ gitignore: true });
var prevwd = process.cwd();
// should verify that conf.zonedir exists
process.chdir(conf.zonedir);
var files = glob.readdirSync('zone.*');
process.chdir(prevwd);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ERI Managed - DNS Zones Display', conf: conf, files: files });
});

module.exports = router;
