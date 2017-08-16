/**
 * Created by ascs_ps on 2017/8/16.
 */
var request = require("request");


var fdbSet = require("../../public/javascripts/config.js");

var fdbFeatureClassInfoFuns = {};
//获取地图图层属性表
fdbFeatureClassInfoFuns.getFeatureClassInfo= function (server,dataset,featureClass,callback) {
    console.log("进入获取地图图层属性表");
    var dataUrl = encodeURI('http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/featureService/datasources/'+server+'/datasets/'+dataset+'/featureClasses/'+featureClass);
    var options = { method: 'GET',
        url: dataUrl,//'http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/'+server+'/datasets/'+dataset+'/featureClasses',
        qs: { pwd: 'd41d8cd98f00b204e9800998ecf8427e' },
        headers:
            { 'postman-token': 'ef9f7198-ef89-19c1-1389-08c3defd4559',
                'cache-control': 'no-cache', } };
    console.log(options.url,1231232311231)
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        
        
        var data =JSON.parse(body)
        callback(data.featureClassInfo.alias);
    });
}

exports.fdbFeatureClassInfoFuns = fdbFeatureClassInfoFuns;
/*var options = { method: 'GET',
    url: 'http://11.23.3.102:8040/rest/services/featureService/datasources/FZ_PIPE_20170807_FDB/datasets/DataSet_GEO_Actuality/featureClasses/FC_0_c1a45d014c2083700d600000',
    qs: { pwd: 'd41d8cd98f00b204e9800998ecf8427e' },
    headers:
        { 'postman-token': 'ef9f7198-ef89-19c1-1389-08c3defd4559',
            'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    
    console.log(body);
});*/
