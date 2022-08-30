/*var Device_Number = ' ';
var Device_Type = ['Passive', 'Active'];
var Device_State = ['Off', 'On'];*/
function generateString(Device_Number, Device_Type, Device_State) {
    let result = {
      Device_Number: Device_Number,
      Device_Type: Device_Type,
      Device_State: Device_State};
    //var obj = JSON.stringify(result);
    //Device = result;
    return (result);
    };

//var json_obj = generateString(Device_Number, Device_Type, Device_State);
//console.log(Device);
module.exports = generateString;
