/**
 * Created by Administrator on 2017/7/24 0024.
 */
//获取服务列表
var request = require("request");
var deletefdb = require("./serverDelete")
var options = { method: 'GET',
    url: 'http://192.168.2.215:8040/rest/services/manageService/logicalDatasources',
    qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' },
    headers:
        { 'postman-token': 'b8b36725-6750-18b1-8e95-1365a689bee1',
            'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var data =JSON.parse(body)

    console.log(data);
    //注释掉删除全部服务方法，必要时候使用
    /*var servers = data.logicalDatasourceNames;
    console.log(servers);
    deletefdb.deleteServers(servers);*/
});

