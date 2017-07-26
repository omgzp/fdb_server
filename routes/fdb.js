var express = require('express');
var router = express.Router();
var fdbFile = require('../models/fdb/fdbFile');
var fdbServer = require('../models/fdb/fdbServer');
var configFile = require('../models/fdb/configFile');
/* GET users listing. */

//批量发布fdb文件
router.get('/addDataSources', function(req, res, next) {
    console.log("get");
    var path  = req.query.path;
    var projectName = req.query.projectName;
    fdbFile.getfiles(projectName,path,getData);
    function getData(result) {
        res.send(result)
    }
});
//获取fdb列表
router.get('/getFdbList', function(req, res, next) {
    console.log("get");

    fdbServer.fdbServerFuns.getServer(getData);
    function getData(result) {
        res.send(result)
    }
});
/* POST home page. */
router.post('/getConfigFile', function(req, res, next) {
    console.log("post");

    var servers = req.body.servers;
    function getData(result) {
        res.send(result)
    }
    configFile.configFilefs.getDataSets(servers,getData);
});
module.exports = router;
