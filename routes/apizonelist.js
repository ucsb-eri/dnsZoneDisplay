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
    // for now lets just set status to true
    res.send( { 'type' : 'zonelist', 'status' : true, 'filelist' : files});
});
module.exports = router;
