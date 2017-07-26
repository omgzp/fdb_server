/**
 * Created by Administrator on 2017/7/24 0024.
 */
//发布服务
var request = require("request");
var fdbSet = require("../../public/javascripts/config.js");
var fdbServerFuns={}
fdbServerFuns.addServer =function (dataName) {
    var dataUrl = encodeURI('http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/'+dataName);
    var options = { method: 'PUT',
        url: dataUrl,//'http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/'+dataName,
        qs: { pwd: '21232f297a57a5a743894a0e4a801fc3', all: '1'  },
        headers:
            { 'postman-token': 'bf500933-7f9a-1ccc-f298-606833a5e21d',
                'cache-control': 'no-cache',
                'content-type': 'application/json' },
        body:
            { logicalDatasourceInfo:
                { name: dataName,
                    capabilities: 3,
                    resCapabilities: 3,
                    password: 'd41d8cd98f00b204e9800998ecf8427e',
                    physicalDatasourceName: dataName } },
        json: true };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}
fdbServerFuns.getServer=function(callback){
    var dataUrl = encodeURI('http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources');
    var options = { method: 'GET',
        url: dataUrl,//'http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources',
        qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' },
        headers:
            { 'postman-token': 'b8b36725-6750-18b1-8e95-1365a689bee1',
                'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var data =JSON.parse(body)

        console.log(data.logicalDatasourceNames);
        callback(data.logicalDatasourceNames);
    });
}
exports.fdbServerFuns = fdbServerFuns;