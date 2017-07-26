/**
 * Created by Administrator on 2017/7/25 0025.
 */
var configFilefs ={};
var request = require("request");
var async = require('async');
var fdbSet = require("../../public/javascripts/config");
var fdbFeatureClass = require("./fdbFeatureClass");

configFilefs.getDataSets=function(servers,callback){
    var datas =[], tasks = [];

    function getDatasetCallback(dataset,server,callback) {

        var item = {
            server:server,
            dataset:dataset
        }
        datas.push(item);
        callback(null,server);

    }
    function asyncCall(err, results) {
        console.log(results);
        console.log(6);
        callback(datas);
    }
    //servers.map(ser => task.push(getDataSet(servers, callback)));
    for(let i = 0;i<servers.length;i++){


        var task = function (callback) {
            console.log(servers[i]);
            getDataSet(servers[i],getDatasetCallback,callback)
        }
        tasks.push(task);
    }
    async.series(tasks,asyncCall);


}


function getDataSet(server,getDatasetCallback,callback) {
    console.log(server);
    var dataUrl = encodeURI('http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/'+server+'/datasets');
    var options = { method: 'GET',
        url: dataUrl,//'http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/'+server+'/datasets',
        qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' },
        headers:
            { 'postman-token': '6cd467e8-a71c-4dad-8db0-6e50d10952ba',
                'cache-control': 'no-cache',
                'content-type': 'application/json' } };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(3);
        console.log(options.url);
        var data =JSON.parse(body);
        console.log(data);
        var a  = fdbFeatureClass.fdbFeatureClassFuns.getFeatureClass(server,data.logicalDatasetNames[0]);
        console.log(a,123456);
        getDatasetCallback(data.logicalDatasetNames,server,callback);

    });
}
/*function getFeatureClass(server,dataset,callback) {
    var dataUrl = encodeURI('http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/'+server+'/datasets/'+dataset+'/featureClasses');
    var options = { method: 'GET',
        url: dataUrl,//'http://'+fdbSet.fdbConfig.ip+':'+fdbSet.fdbConfig.port+'/rest/services/manageService/logicalDatasources/'+server+'/datasets/'+dataset+'/featureClasses',
        qs: { pwd: '21232f297a57a5a743894a0e4a801fc3' },
        headers:
            { 'postman-token': '1b7dc63f-e164-a5ba-b050-bcb3fed83566',
                'cache-control': 'no-cache',
                'content-type': 'application/json' } };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(options.url)

        var data =JSON.parse(body)
        console.log(data.logicalFeatureClassNames)
    });
}*/


exports.configFilefs = configFilefs;
