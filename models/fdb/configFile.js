/**
 * Created by Administrator on 2017/7/25 0025.
 */
var configFilefs ={};
var request = require("request");
var async = require('async');
var fdbSet = require("../../public/javascripts/config");
var fdbFeatureClass = require("./fdbFeatureClass");
var fdbDataSet = require("./fdbDataSet");

configFilefs.getDataSets=function(servers,callback){
    var datas =[], tasks = [];
    //数据集的回调函数，使用async模块
    function getDatasetCallback(dataset,server,callback) {
        /*var item = {
            serverName:server,
            datasets:dataset
        }*/
        datas.push(dataset);
        callback(null,server);
    }

    //async的回调方法
    function asyncCall(err, results) {
        callback(datas);
    }
    //async参数列表，为函数对象数组
    //获得数据集-------------------------------
    for(let i = 0;i<servers.length;i++){
        var task = function (callback) {
            var FeatureDataSetPromise = new Promise(function(resolve, reject){
                fdbDataSet.fdbDataSetFuns.getDataSet(servers[i],resolve); //代码正常执行！
            });
            FeatureDataSetPromise.then(function(data){
                //获得图层---------------------
                var fcDatas =[],fcTasks=[];
                for(let j =0;j<data.length;j++){
                    var fctack = function (fcCallback) {
                        var fcPromise = new Promise(function(resolve, reject){
                            fdbFeatureClass.fdbFeatureClassFuns.getFeatureClass(servers[i],data[j],resolve); //代码正常执行！
                        });
                        fcPromise.then(function(fcdata){
                            var item = {
                                serverName:servers[i],
                                datasetName:data[j],
                                featureClass:fcdata
                            }
                            fcDatas.push(item);
                            fcCallback(null,servers[i]+"-"+data[j])
                        })
                    }
                    fcTasks.push(fctack);
                }
                function fcAsyncCall(err, results) {
                    console.log(results);
                    getDatasetCallback(fcDatas,servers[i],callback)
                }
                async.series(fcTasks,fcAsyncCall);
                //获得图层结束-----------------------------
            });
        }
        tasks.push(task);
    }
    async.series(tasks,asyncCall);


}

/*function DataSetPromise() {
    var myDataSetPromise = new Promise(function(resolve, reject){
        fdbDataSet.fdbDataSetFuns.getDataSet(servers[i],resolve); //代码正常执行！
    });
    myDataSetPromise.then(function(data){

        getDatasetCallback(data,servers[i],callback)
    });
}*/
/*function getDataSet(server,getDatasetCallback,callback) {
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
        var FeatureClassPromise = new Promise(function(resolve, reject){
            fdbFeatureClass.fdbFeatureClassFuns.getFeatureClass(server,data.logicalDatasetNames[0],resolve); //代码正常执行！
        });
        FeatureClassPromise.then(function(successMessage){
            //successMessage的值是上面调用resolve(...)方法传入的值.
            //successMessage参数不一定非要是字符串类型，这里只是举个例子
            console.log("Yay! " ,successMessage);
        });

        getDatasetCallback(data.logicalDatasetNames,server,callback);

    });
}*/

exports.configFilefs = configFilefs;
