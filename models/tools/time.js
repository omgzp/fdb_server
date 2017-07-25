/**
 * Created by Administrator on 2017/7/25 0025.
 */
var time= {}
time.getTime = function () {
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
exports.time = time;