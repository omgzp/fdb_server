/**
 * Created by ascs_ps on 2017/8/16.
 */
var request = require("request");

var options = { method: 'GET',
    url: 'http://11.23.3.102:8040/rest/services/featureService/datasources/FZ_PIPE_20170807_FDB/datasets/DataSet_GEO_Actuality/featureClasses/FC_0_c1a45d014c2083700d600000',
    qs: { pwd: 'd41d8cd98f00b204e9800998ecf8427e' },
    headers:
        { 'postman-token': 'ab649b85-b7d6-7c40-8148-33359a6f6da2',
            'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var data =JSON.parse(body)
    console.log(data.featureClassInfo.alias);
});
