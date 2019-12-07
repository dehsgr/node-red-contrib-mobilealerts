# node-red-contrib-mobilealerts 

This provides a node for receiving Mobile Alerts status infos. node-red-contrib-mobilealerts delivers 1 node:

## Mobile Alerts Status
Mobile Alerts Status periodically polls the status from Mobile Alerts servers. The interval in seconds can be set. It returns the name of the sensor, the serial of the sensor, the active state(s) of the sensor, and all of its data.
Mobile Alerts Status will send a message per sensor. the msg.payload looks like:
`{ name: "mySensor", serial: "ABCDEF0123456789", temperature: 25.5, humidity: 54, temperature_out: 28.8, humidity_out: 45, active: true, active_out: true }`