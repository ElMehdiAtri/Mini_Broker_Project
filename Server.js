var generateString = require('./Obj_Json')
const mqtt = require('mqtt');
const { exec } = require('child_process');
const ps = require("prompt-sync")
const prompt = ps();
const ServerTopic = 'Topic_In';
const ClientTopic = 'Topic_Out'
const Command = 'Topic_Querry';
const Response = 'Topic_Response';
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');
let client = exec('node Client.js');
client.stdout.on('data', (data) => {
  console.log(data);
});
var Device_Type = [];
var Device_State = [];
var Device_Number = [];
var Device_Create = [];
let Number = prompt('Enter the number of devices :');
Device_Number = Number.toString().trim();
for (i = 0; i< Device_Number; i++){

let type = prompt('Enter the' +i+ 'device type (Passive/Active) :');
Device_Type.push(type.toString().trim());

let State = prompt('Enter the' +i+ 'device State (On/Off) :');
Device_State.push(State.toString().trim());
}
//let Devices_Create = generateString(Device_Number, Device_Type, Device_State);
Device_Create = generateString(Device_Number, Device_Type, Device_State);
var obj = JSON.stringify(Device_Create);
//console.log(obj);
mqttClient.publish(ServerTopic, obj);

//process.stdout.write('Press (Done) to configure devices and send Data' + "\n");
let input;
process.stdout.write('Send Data to the client: ' + "\n");
process.stdout.write('Enter the ID of the Device to change its State ' + "\n");
process.stdin.on('readable', () => {
    while ((input = process.stdin.read()) !== null) {
      var object = {Device_ID : input.toString().trim()};
      mqttClient.publish(Command, JSON.stringify(object));
    }
});

mqttClient.on('connect', function () {
    console.log('Server connected to Mqtt broker' );
    mqttClient.subscribe(ClientTopic);
    mqttClient.subscribe(Response);
});

// On receiving message from any client
mqttClient.on('message', function (topic, message) {
    console.log('Received Data from client: -', message.toString());
});
