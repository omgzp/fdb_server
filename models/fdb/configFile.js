/**
 * Created by Administrator on 2017/7/25 0025.
 */
var configFilefs ={};
var request = require("request");
var async = require('async');
var fdbSet = require("../../public/javascripts/config");
var fdbFeatureClass = require("./fdbFeatureClass");
var fdbFeatureClassInfo = require("./fdbFeatureClassInfo");
var fdbDataSet = require("./fdbDataSet");

configFilefs.getDataSets=function(servers,callback){
    var datas =[], tasks = [],configDatas = [];
    //数据集的回调函数，使用async模块
    function getDatasetCallback(dataset,server,callback) {
        var item = {
            serverName:server,
            datasets:dataset
        }
        datas.push(item);
        callback(null,server);
    }

    //async的回调方法
    function asyncCall(err, results) {
        var data ={
            fdbdata:datas,
            configdata:configDatas
        }
        callback(data);
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
                                //serverName:servers[i],
                                datasetName:data[j],
                                featureClass:fcdata
                            }
                            fcDatas.push(item);
                            //获得图层属性表信息
                            var fcInfoDatas =[],fcInfoTasks=[];
                            for(let k =0;k < fcdata.length;k++){
                                var fcInfoPromise = new Promise(function(resolve, reject){
                                    fdbFeatureClassInfo.fdbFeatureClassInfoFuns.getFeatureClassInfo(servers[i],data[j],fcdata[k],resolve); //代码正常执行！
                                });
                                fcInfoPromise.then(function(fcInfodata){
                                    var configdata = {
                                        name: fcInfodata,
                                        aliceName: fcInfodata,
                                        dataSet: data[j],
                                        featureClassName: fcdata[k],
                                        service: servers[i],
                                        geoName: "Geometry",
                                        visible: true,
                                        password: "",
                                        ConnectionType: "gviConnectionCms7Http",
                                    }
                                    configDatas.push(configdata);
                                    fcCallback(null,servers[i]+"-"+data[j])
                                })
                                /*var fcInfotack = function (fcInfoCallback) {
                                    var fcInfoPromise = new Promise(function(resolve, reject){
                                        fdbFeatureClassInfo.fdbFeatureClassInfoFuns.getFeatureClassInfo(servers[i],data[j],fcdata[k],resolve); //代码正常执行！
                                    });
                                    fcInfoPromise.then(function(fcInfodata){
                                        var configdata = {
                                            name: fcInfodata.alias,
                                            aliceName: fcInfodata.alias,
                                            dataSet: data[j],
                                            featureClassName: fcdata[k],
                                            service: servers[i],
                                            geoName: "Geometry",
                                            visible: true,
                                            password: "",
                                            ConnectionType: "gviConnectionCms7Http",
                                        }
                                        configDatas.push(configdata);
                                    })
                                    fcInfoCallback(null,servers[i]+"-"+data[j]+"-"+fcdata[k])
                                };
                                fcInfoTasks.push(fcInfotack);*/
                                
                               /* var configdata = {
                                    name: fcdata[k],
                                    aliceName: fcdata[k],
                                    dataSet: data[j],
                                    featureClassName: fcdata[k],
                                    service: servers[i],
                                    geoName: "Geometry",
                                    visible: true,
                                    password: "",
                                    ConnectionType: "gviConnectionCms7Http",
                                }
                                configDatas.push(configdata);*/
                            }
                            /*function fcInfoAsyncCall(err, results) {
                                console.log(results);
                            }
                            async.series(fcTasks,fcInfoAsyncCall);*/
                            
                        })
                    }
                    fcTasks.push(fctack);
                }
                function fcAsyncCall(err, results) {
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



exports.configFilefs = configFilefs;
