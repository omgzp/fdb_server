/**
 * Created by Administrator on 2017/7/24 0024.
 */
var request = require("request");
var deletefdb = require("./datasourcesDelete")
var fdbSet = require("../../../public/javascripts/config.js");
var options = { method: 'GET',
    url: 'http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/physicalDatasources',
    qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' },
    headers:
        { 'postman-token': '013e94ef-3821-0988-4633-2cde797157f3',
            'cache-control': 'no-cache',
            'content-type': 'application/json' } };

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    var data =JSON.parse(body)

    console.log(data.physicalDatasourceNames);
    //注释掉删除全部数据源方法，必要时候使用
    /*var datasources = data.physicalDatasourceNames;
     console.log(datasources);
     deletefdb.deleteDatasources(datasources);*/
});
