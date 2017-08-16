/**
 * Created by Administrator on 2017/7/26 0026.
 */

var request = require("request");
var fdbSet = require("../../public/javascripts/config.js");

var fdbFeatureClassFuns = {};
//获得地图图层
fdbFeatureClassFuns.getFeatureClass= function (server,dataset,callback) {
    var dataUrl = encodeURI('http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/'+server+'/datasets/'+dataset+'/featureClasses');
    var options = { method: 'GET',
        url: dataUrl,//'http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/'+server+'/datasets/'+dataset+'/featureClasses',
        qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' },
        headers:
            { 'postman-token': '1b7dc63f-e164-a5ba-b050-bcb3fed83566',
                'cache-control': 'no-cache',
                'content-type': 'application/json' } };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var data =JSON.parse(body)
        callback(data.logicalFeatureClassNames);
    });
}

exports.fdbFeatureClassFuns = fdbFeatureClassFuns;