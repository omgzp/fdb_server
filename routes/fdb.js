var express = require('express');
var router = express.Router();
var fdbFile = require('../models/fdb/fdbFile');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("get");
    //console.log(req.query.path)
    var path  = req.query.path;
    var projectName = req.query.projectName;
    fdbFile.getfiles(projectName,path,getData);
    function getData(result) {
        res.send(result)
    }
    //res.send('fdbserver_home');
});

/* POST home page. */
router.post('/', function(req, res, next) {
    console.log("post");
    //console.log(req.body.path)
    var path  = req.body.path;
    var projectName = req.body.projectName;
    fdbFile.getfiles(projectName,path,getData);
    function getData(result) {
        res.send(result);
    }
});
module.exports = router;
