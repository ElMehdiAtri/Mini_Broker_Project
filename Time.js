//var Timestamp = Date.now();
//var date = new Date(Timestamp);
var Time_Stamp = function generateTime() {
    let result = ' ';
    let date = new Date();
        result =(date.getDate()+
                  "/"+(date.getMonth()+1)+
                  "/"+date.getFullYear()+
                  " "+date.getHours()+
                  ":"+date.getMinutes()+
                  ":"+date.getSeconds());
        return result;
}
//var Time = Time_Stamp();
//console.log(Time);
module.exports = Time_Stamp;
