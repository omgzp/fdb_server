/**
 * Created by Administrator on 2017/7/24 0024.
 */
//删除数据源
var request = require("request");
var fdbSet = require("../../../public/javascripts/config.js");
/*var options = { method: 'DELETE',
    url: 'http://192.168.2.215:8040/rest/services/manageService/physicalDatasources/test1',
    qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' },
    headers:
        { 'postman-token': 'a522009b-363b-8e2d-4c21-a4a502eaabdf',
            'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});*/
exports.deleteDatasources = deleteDatasources;

function deleteDatasources(datasources) {
    for(var i = 0;i<datasources.length;i++){
        var dataUrl = encodeURI('http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/physicalDatasources/'+datasources[i]);
        var options = { method: 'DELETE',
            url: dataUrl,//'http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/physicalDatasources/'+datasources[i],
            qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' },
            headers:
                { 'postman-token': 'a522009b-363b-8e2d-4c21-a4a502eaabdf',
                    'cache-control': 'no-cache' } };
        console.log(options.url);
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });
    }

}