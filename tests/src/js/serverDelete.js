/**
 * Created by Administrator on 2017/7/24 0024.
 */
//删除服务
var request = require("request");
var fdbSet = require("../../../public/javascripts/config.js");
/*var options = { method: 'DELETE',
    url: 'http://192.168.2.215:8040/rest/services/manageService/logicalDatasources/test1',
    qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' },
    headers:
        { 'postman-token': '317a2248-ab4b-28f8-41c1-99b160a0f48d',
            'cache-control': 'no-cache',
            'content-type': 'application/json' } };

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});*/

exports.deleteServers = deleteServers;

function deleteServers(servers) {
    for(var i = 0;i<servers.length;i++){
        var options = { method: 'DELETE',
            url: 'http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/'+servers[i],
            qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' },
            headers:
                { 'postman-token': '317a2248-ab4b-28f8-41c1-99b160a0f48d',
                    'cache-control': 'no-cache',
                    'content-type': 'application/json' } };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });
    }

}