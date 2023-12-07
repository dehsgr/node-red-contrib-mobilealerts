# node-red-contrib-mobilealerts 

This provides a node for receiving Mobile Alerts status infos. node-red-contrib-mobilealerts delivers 1 node:

## Mobile Alerts Status
Mobile Alerts Status periodically polls the status from Mobile Alerts servers. The interval in seconds can be set. It returns the name of the sensor, the deviceid (serial) of the sensor, and all other data available via Mobile Alerts App API. All parameter values are returend as configured.

Mobile Alerts Status will send a message per sensor. the msg.payload looks like:


`{
	"deviceid":"01234567890AB",
	"devicetypeid":7,
	"name":"Erdgeschoss",
	"lang":"de",
	"lastseen":1644600775,
	"lowbattery":false,
	"alertwasactive":false,
	"oldestmeasurementt":1501200306,
	"oldestalertt":1501406190,
	"cloninginprocess":false,
	"settings":{
		"ts1loalarm":18,
		"ts1loalarmactive":false,
		"ts1hialarm":28,
		"ts1hialarmactive":false,
		"ts2loalarm":3,
		"ts2loalarmactive":false,
		"ts2hialarm":40,
		"ts2hialarmactive":false,
		"hloalarm":35,
		"hloalarmactive":true,
		"hhialarm":60,
		"hhialarmactive":true,
		"h2loalarm":20,
		"h2loalarmactive":false,
		"h2hialarm":60,
		"h2hialarmactive":false
	},
	"measurements":[
		{
			"idx":3873498,
			"ts":1644600769,
			"tx":3872,
			"c":1644600775,
			"pr":false,
			"lb":false,
			"t1":22.1,
			"t2":3.3,
			"h":40,
			"h2":74
		}
	],
	"alertevents":[
		{
			"idx":3867465,
			"idxv":"9FF4F408-4D00-4477-A0E4-D2D4C761A288",
			"idxb":"de.synertronixx.remotemonitor",
			"idxp":"987654321098",
			"ase":true,
			"ts":1642061642,
			"tx":14213,
			"c":1642061645,
			"pr":false,
			"lb":false,
			"t1":20.3,
			"t2":3.6,
			"h":36,
			"h2":86,
			"hlo":false,
			"hlose":false,
			"hloee":true,
			"hlos":35
		}
	]
}`

## Special measurement values
- If a sensor was not connected the value 43530 is returned.
- If the measurement of a sensor was out of range the value 65295 is returned.

Detailed information on special measurement values as well as some other parameters (c, tx, ts, alerts, ...) can be found in the Mobile Alerts API documentation: https://mobile-alerts.eu/info/public_server_api_documentation.pdf.
