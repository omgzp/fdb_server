/**
 * Created by Administrator on 2017/7/26 0026.
 */
//数据集
var request = require("request");
var fdbSet = require("../../public/javascripts/config.js");

var fdbDataSetFuns = {};
fdbDataSetFuns.getDataSet = function(server,getDatasetCallback,callback) {
    console.log(server);
    var dataUrl = encodeURI('http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/'+server+'/datasets');
    var options = { method: 'GET',
        url: dataUrl,//'http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/'+server+'/datasets',
        qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' },
        headers:
            { 'postman-token': '6cd467e8-a71c-4dad-8db0-6e50d10952ba',
                'cache-control': 'no-cache',
                'content-type': 'application/json' } };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(3);
        console.log(options.url);
        var data =JSON.parse(body);
        console.log(data);
        getFeatureClass(server,data.logicalDatasetNames[0]);
        getDatasetCallback(data.logicalDatasetNames,server,callback);

    });
}
exports.fdbDataSetFuns = fdbDataSetFuns;
