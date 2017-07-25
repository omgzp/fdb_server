/**
 * Created by Administrator on 2017/7/25 0025.
 */
var async = require('async');
/*var task1 =function(callback){

    console.log("task1");
    callback(null,"task1")
}

var task2 =function(callback){

    console.log("task2");
    callback("err","task2")
}

var task3 =function(callback){

    console.log("task3");
    callback(null,"task3")
}*/
function say(i,callback) {
    console.log("task"+i);
    callback(null,"task3")
};
function callback(err,result) {
    console.log("series");

    if (err) {
        console.log(err);
    }

    console.log(result);
}
var tacks = [];
for(let i = 0;i<3;i++){
    var task = function(callback){
        say(i,callback)
    };
    tacks.push(task);
}
/*async.series([task1,task2,task3],function(err,result){

    console.log("series");

    if (err) {
        console.log(err);
    }

    console.log(result);
})*/
async.series(tacks,callback);
