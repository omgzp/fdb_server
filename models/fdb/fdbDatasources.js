/**
 * Created by Administrator on 2017/7/24 0024.
 */

//request方式
//fdb数据源发布
var request = require("request");
var fdbServer = require("./fdbServer");
/*var options = { method: 'PUT',
    url: 'http://192.168.2.215:8040/rest/services/manageService/physicalDatasources/test4',
    qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' },
    headers:
        { 'postman-token': '7edb7e62-97c1-88eb-e05d-e0d83e02e2a3',
            'cache-control': 'no-cache',
            'content-type': 'application/json' },
    body:
        { physicalDatasourceInfo:
            { name: 'test4',
                type: 'Feature',
                dbType: 'FireBird',
                finalType: 'Feature',
                connectionString: 'FireBird:127.0.0.1:30502::::"C:/inetpub/wwwroot/cepSercer/MODEL_201704251519.FDB"' } },
    json: true };

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});*/
function addDatasources(params) {
    for(var i = 0;i<params.length;i++){
        console.log(params[i].name);
        var options = { method: 'PUT',
            url: 'http://192.168.2.215:8040/rest/services/manageService/physicalDatasources/'+params[i].name,
            qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' },
            headers:
                { 'postman-token': '7edb7e62-97c1-88eb-e05d-e0d83e02e2a3',
                    'cache-control': 'no-cache',
                    'content-type': 'application/json' },
            body:{ physicalDatasourceInfo:
                    params[i]
                },
            json: true };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(typeof body);
            /*if(body.addResult.success){
                fdbServer.addServer(body.addResult.name)
            }*/
            fdbServer.addServer(body.addResult.name)
        });
    }
}

exports.addDatasources = addDatasources;