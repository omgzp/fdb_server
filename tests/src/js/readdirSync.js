/**
 * Created by Administrator on 2017/7/24 0024.
 */
//读取指定文件夹的文件
var fs = require("fs");

console.log("查看 /tmp 目录");

var dir  = "C:/inetpub/wwwroot/cepSercer/bim20170719";
var projectName = "fz";
fs.readdir(dir,function(err, files){
    if (err) {
        return console.error(err);
    }
    files.forEach( function (file){
        var fdbObj  = checkFdb(file,'fdb');
        if(fdbObj.flag){
            var fdbParams = {
                "physicalDatasourceInfo": {
                    "name": projectName+"_"+fdbObj.name+"_"+fdbObj.time+"_"+fdbObj.postfix,
                    "type": "Feature",
                    "dbType": "FireBird",
                    "finalType": "Feature",
                    "connectionString": "FireBird:127.0.0.1:30502::::\""+dir+"/"+file+"\""
                }
            }
            console.log( fdbParams.physicalDatasourceInfo.name );
            console.log( fdbParams.physicalDatasourceInfo.connectionString );
        }

    });
});


function checkFdb(str,suf){
    var strRegex = "(." + suf.split(',').join('|.') + ")$";
    var re=new RegExp(strRegex);
    if (re.test(str.toLowerCase())){
        var index = str.toLowerCase().indexOf("."+suf);
        var name = str.substring(0,index);
        var nowDate = new Date();
        var time = nowDate.getFullYear().toString()+nowDate.getMonth()+1
        var obj ={
            flag:true,
            name:name,
            postfix:suf.toUpperCase(),
            time:getTime()
        }
        //console.log(newStr);
        return obj;
    } else{
        console.log("文件名不合法，支持的后缀名为" + suf);
        return {flag:false};
    }
}
function getTime() {
    var date  = new Date();
    var year,month,day,hour,miniut,sec;
    year = date.getFullYear();
    month = date.getMonth()+1;
    if(month<10){
        month = '0'+month;
    }
    day = date.getDate();
    if(day<10){
        day = '0'+day;
    }
    hour = date.getHours();
    miniut = date.getMinutes();
    var time = ""+year+month+day+hour+miniut;
    return time;
}
