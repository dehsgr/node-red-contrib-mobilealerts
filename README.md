# node-red-contrib-mobilealerts 

This provides a node for receiving Mobile Alerts status infos. node-red-contrib-mobilealerts delivers 1 node:

## Mobile Alerts Status
Mobile Alerts Status periodically polls the status from Mobile Alerts servers. The interval in seconds can be set. It returns the name of the sensor, the ID (serial) of the sensor, and all other data available on https://measurements.mobile-alerts.eu. All payloads are build with their localized parameter names. All parameter values in numeric format (such as temperature and humidity) are returend as object consisting of their value and unit.

Mobile Alerts Status will send a message per sensor. the msg.payload looks like:


`{
	Name: "mySensor",
	ID: "ABCDEF01234",
	Time: "2020/02/22 22:00:24",
	Temperature_In: {
		Value: 22.5,
		Unit: "C"
	}, 
	Humidity_In: {
		Value: "45",
		Unit: "%"
	},
	Temperature_Out: {
		Value: 7.8,
		Unit: "C"
	}, 
	Humidity_Out: {
		Value: "83",
		Unit: "%"
	}
}`