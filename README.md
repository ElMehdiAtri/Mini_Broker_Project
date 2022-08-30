# Mini_Broker_Project
This project is an improved solution to the problem encountred in the previous project titled Mini-Connector, I tried to give the user complete control over the devices;
Creating the devices, managing their status and receiving their Data.

To run the project type in your terminal: node server.js

The communication is done via the mqtt protocol, and each message is displayed on the console (terminal).

The user can input the Device_ID to switch its state, if it's 'off', it will be switched 'on' and start sending Data and vice versa case of passive devices.
As for the active devices, they will send the data after being switched once.

I ecountred a problem of synchronising between the actual Device_ID and the input of the user (Device_ID to switch On or Off the devices), and I am still trying to improve this solution to make it universal for the user's needs.
