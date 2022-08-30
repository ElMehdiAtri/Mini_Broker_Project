var random = require('./Random_Str');

var Device_Number = ' ';
var Device_Type = ' ';
var Device_State = ' ';

var Stamp;
var i = 0;
let Devices = [];
var ID = 0;
var Data;
var Unique_ID = ' ';
var Number = 2;
var Device_Number = 2;
var Device_State = ["On","Off"];
var Device_Type = ["Passive", "Active"];

/*
var Device_Number = 1;
var Device_State = ["On"];
var Device_Type = ["Passive"];
*/
var json_obj = [];

var Create_Device = function create_device(id, Type, State){
      ID = id;
      Type = Type;
      State = State;
      Unique_ID = random(10);
      var Device = {Device_ID: ID, Device_Type: Type , Data_ID: Unique_ID, Device_State: State};
      //var obj = JSON.stringify(Device);
      //Devices.push(Device);
      //console.log('the' +i+ 'Device is: ')
      //console.log(Devices + '\n');
      //var obj = JSON.stringify(Device);
      return (Device);
      }

//json_obj = Create_Device(Device_Number, Device_Type, Device_State);
//console.log(json_obj);
module.exports = Create_Device;
