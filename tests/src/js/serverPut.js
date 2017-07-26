/**
 * Created by Administrator on 2017/7/24 0024.
 */
//发布服务
var request = require("request");
var fdbSet = require("../../../public/javascripts/config.js");
var dataSet = encodeURI('http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/test1');
var options = { method: 'PUT',
    url: dataSet,//'http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/test1',
    qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' , all: '1' },
    headers:
        { 'postman-token': 'bf500933-7f9a-1ccc-f298-606833a5e21d',
            'cache-control': 'no-cache',
            'content-type': 'application/json' },
    body:
        { logicalDatasourceInfo:
            { name: 'test1',
                capabilities: 3,
                resCapabilities: 3,
                password: 'd41d8cd98f00b204e9800998ecf8427e',
                physicalDatasourceName: 'MODEL_201704251519.FDB' } },
    json: true };

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
