const mqtt = require('mqtt');
var Time = require('./Time');
var Create_Device = require('./Create_Device');

//const mqttClient = mqtt.connect('ws://localhost:8083/mqtt', { username: $USERNAME, password: $PASSWORD });
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');
const ServerTopic = 'Topic_In';
const ClientTopic = 'Topic_Out'
const Command = 'Topic_Querry';
const Response = 'Topic_Response';
var number = 0;
var Stamp;
var i = 0;
var j = 0;
let Devices = [];
var Device_Type = [];
var ID = 0;
var Data;
var Unique_ID = ' ';
var Device_State = [];

mqttClient.on('connect', function () {
    console.log('Client connected to Mqtt broker' );
    mqttClient.subscribe(ServerTopic);
    mqttClient.subscribe(Command);
    //mqttClient.publish('obj', OutTopic);

});

// On receiving message from any client
mqttClient.on('message', function (topic, message) {
    console.log('Received Data from server: -', message.toString());
    //var obj = JSON.stringify(message.toString());
    //console.log(objectValue.Device_Type[0]);
    if (topic === ServerTopic){
      var objectValue = JSON.parse(message.toString());
      number = objectValue.Device_Number;
      /*console.log('The number of devices is: ' + objectValue.Device_Number);
      console.log('The Type of devices is: ' + objectValue.Device_Type);
      console.log('The State of devices is: ' + objectValue.Device_State);*/
      for (var i = 0; i < number; i++)
      {Devices.push(Create_Device(i,objectValue.Device_Type[i],objectValue.Device_State[i]));}
    console.log('The created Devices are going to be published into the server:');
    mqttClient.publish(ClientTopic, JSON.stringify(Devices));
    //console.log('published!');
  }
    if (topic === Command){
      var object = JSON.parse(message.toString());
      //console.log(object);
      for (i = 0; i < number; i++){
        var obj = Devices[i];
        //console.log(obj);
        //console.log(object.Device_ID);
        if ((parseInt(object.Device_ID) == obj.Device_ID) && (obj.Device_State.toLowerCase() == "on")){
          //console.log('Gotchaa!');
          //console.log(obj.Device_State)
          Devices[i].Device_State = "off";
          //console.log('first');
          //console.log(Devices[i]);
          }
          else if ((parseInt(object.Device_ID) == obj.Device_ID) && (obj.Device_State.toLowerCase() == "off")){
          Devices[i].Device_State = "on";
          //console.log('second');
          //console.log(Devices[i]);
          }
          //Testfunction();
        }
      }
      //Testfunction();
        /*

        console.log('the state has changed');
        }
      }*/
      //mqttClient.publish(Response, 'The state has changed'));

      Testfunction();

});


//Testfunction();
function Testfunction(){
  for (i = 0; i < Devices.length; i++)
    {
    dev = Devices[i];
    //console.log(dev);
    if ((dev.Device_Type.toLowerCase() === 'passive') && (dev.Device_State.toLowerCase() === 'on'))
    { //console.log('The Device with the ID: ' + dev.Device_ID + ' is preparing to send Data' + '\n');
      setInterval(intervalFunc,3000);}

    else if ((dev.Device_Type.toLowerCase() === 'active') && (dev.Device_State.toLowerCase() === 'on'))
    {setTimeout(ActiveFunc, 1000);}

    else if (dev.Device_State.toLowerCase() ==! 'on')
    {console.log('The Device with the ID: ' + dev.Device_ID + ' isn t operating at the moment.' + '\n');}
  }
}

function intervalFunc()
{
  process.stdout.write("\n"+"Preparing to send Data..."+"\n");
  dev.Data = Number(Math.floor(Math.random() * 10));
  //var device = {Device_ID: ID[i], Device_Type: Device_Type[i] , Data_ID: Unique_ID, Device_State: State, Time_Stamp: Stamp, Data: 'Data'};
  dev.Time_Stamp = Time();
  var objtest = JSON.stringify(dev);
  mqttClient.publish(Response, objtest);
}
function ActiveFunc()
{
  process.stdout.write("\n"+"Preparing to send Data..."+"\n");
  dev.Data = Number(Math.floor(Math.random() * 20));
  //var device = {Device_ID: ID[i], Device_Type: Device_Type[i] , Data_ID: Unique_ID, Device_State: State, Time_Stamp: Stamp, Data: 'Data'};
  dev.Time_Stamp = Time();
  var objtest = JSON.stringify(dev);
  console.log('The Device with the ID: ' + dev.Device_ID + ' is preparing to send Data' + '\n');
  mqttClient.publish(Response, objtest);
}
