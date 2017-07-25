/**
 * Created by Administrator on 2017/7/25 0025.
 */
//获取逻辑数据集
var request = require("request");
var fdbSet = require("../../../public/javascripts/config.js");

var options = { method: 'GET',
    url: 'http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/ps_MODEL_20170725105_FDB/datasets',
    qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' },
    headers:
        { 'postman-token': '6cd467e8-a71c-4dad-8db0-6e50d10952ba',
            'cache-control': 'no-cache',
            'content-type': 'application/json' } };
request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var data =JSON.parse(body)
    console.log(data.logicalDatasetNames);

});

