/**
 * Created by Administrator on 2017/7/25 0025.
 */
//图层路径配置

const fs = require('fs');

let files = []
var str ="";

function ScanDir(dir) {

    try {
        str ="aa";
        write(str);

    } catch (e) {
    }
}
function write(data){
    fs.writeFile('fdb.txt', data,  function(err) {
        if (err) {
            return console.error(err);
        }

        fs.readFile('fdb.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("异步读取文件数据: " + data.toString());
        });
    });
}
ScanDir();
console.log(files)