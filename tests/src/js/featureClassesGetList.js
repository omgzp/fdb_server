/**
 * Created by Administrator on 2017/7/25 0025.
 */
//获取逻辑特征类
var request = require("request");
var fdbSet = require("../../../public/javascripts/config.js");
var dataUrl = encodeURI('http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/ps_MODEL_20170725105_FDB/datasets/building/featureClasses');
var options = { method: 'GET',
    url:dataUrl,//'http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/ps_MODEL_20170725105_FDB/datasets/building/featureClasses',
    qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' },
    headers:
        { 'postman-token': '1b7dc63f-e164-a5ba-b050-bcb3fed83566',
            'cache-control': 'no-cache',
            'content-type': 'application/json' } };

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    var data =JSON.parse(body)
    console.log(data.logicalFeatureClassNames)
});
