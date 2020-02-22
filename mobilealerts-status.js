// ~~~ constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var SENSOR_DATA	= '(<div class="panel panel-default">.*)<hr \\/>';
var SENSOR_ITEM = '<div class="panel panel-default">.*?<\\/div>\\s*?<\\/div>\\s*?<\\/div>\\s*?<\\/div>';
var SENSOR_NAME	= '<a.*?>(.*?)<';
var SENSOR_PART = '<div class="sensor-component">.*?<h5>(.*?)<\\/h5>.*?<h4>(.*?)<\\/h4>.*?<\\/div>';

// ~~~ leagcy constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var MA10006_TEMPERATURE_INSIDE = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10006_TEMPERATURE_OUTSIDE = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10006_HUMIDITY_INSIDE = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10006_HUMIDITY_OUTSIDE = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10100_TEMPERATURE = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10120_TEMPERATURE_INSIDE = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10120_TEMPERATURE_OUTSIDE = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10200_TEMPERATURE = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10200_HUMIDITY = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10320_TEMPERATURE = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10320_TEMPERATURE_CABLE = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10320_HUMIDITY = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10350_TEMPERATURE = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10350_HUMIDITY = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10350_LEAK = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)<\\/h4>';
var MA10421_TEMPERATURE = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10421_TEMPERATURE_1 = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10421_TEMPERATURE_2 = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10421_TEMPERATURE_3 = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10421_HUMIDITY = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10421_HUMIDITY_1 = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10421_HUMIDITY_2 = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10421_HUMIDITY_3 = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10650_RAIN = '.*?(<h4>%SERIAL%<\\/h4>)[\\s\\S]*?<h4>(.*?)<\\/h4>[\\s\\S]*?<h4>(.*?) mm<\\/h4>';
var MA10660_WIND = '.*?(<h4>%SERIAL%<\\/h4>)[\\s\\S]*?<h4>(.*?)<\\/h4>[\\s\\S]*?<h4>(.*?) [k]?m\\/[sh]<\\/h4>[\\s\\S]*?<h4>(.*?) [k]?m\\/[sh]<\\/h4>[\\s\\S]*?<h4>(.*?)<\\/h4>';
var MA10700_TEMPERATURE = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10700_TEMPERATURE_CABLE = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10700_HUMIDITY = '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';

module.exports = function(RED) {
	'use strict';

	// ~~~ constructor / destructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function MobileAlerts(myNode)
	{
		RED.nodes.createNode(this, myNode);

		var Platform = this;
		var Loop;
	
		this.mobilealertsid = myNode.mobilealertsid;
		this.interval = parseInt(myNode.interval);
		this.legacy = myNode.legacy;

		function publishStates()
		{
			Platform.fetchData('http://measurements.mobile-alerts.eu/Home/SensorsOverview?phoneid=' + Platform.mobilealertsid);
		}

		publishStates();

		Loop = setInterval(function() {
			publishStates();
		}, Platform.interval * 1000);   // trigger every defined secs

		Platform.on("close", function() {
			if (Loop) {
				clearInterval(Loop);
			}
		});
	}

	RED.nodes.registerType('mobilealerts-status', MobileAlerts);

	// ~~~ legacy enums ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	MobileAlerts.prototype.DeviceTypes = { MA10120: 1, MA10100: 2, MA10200: 3, MA10350: 4, MA10700: 6, MA10006: 7, MA10650: 8, MA10320: 9, MA10660: 11, MA10230: 12, MA10421: 17, MA10232: 18 };
	MobileAlerts.prototype.MatchTypes = { Name: 1, Serial: 2 };

	// ~~~ functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	MobileAlerts.prototype.fetchData = function(myURL) {
		var Platform = this;
		var r;

		Platform.log('Fetching Data...');

		require('request')({
			method: 'GET',
			url: myURL,
			headers: {}
		}, function(myError, myResponse) {
			if(myError) {
				Platform.warn('There was an Error requesting initial Data for Sensor-Matching: ' + myError);
			} else {
				if (!Platform.legacy) {
					Platform.parseSensorData(myResponse.body);
				} else {
					if (Platform.legacy) {
						Platform.warn('You\'ve activated legacy Mode for parsing and returning your Mobile Alerts Data. This Function is deprecated and will be removed later. So you should switch to new Mode as soon as possible!');
					}

					Platform.parseSensorDataLegacy(myResponse.body);
				}
			}
		});
	}

	MobileAlerts.prototype.parseSensorData = function(myData)
	{
		var Platform = this;

		var dt;		// data
		var it;		// item
		var id;		// item data
		var pt;		// part
		var pd;		// part data
		var pl;		// payload
		var m;		// matches

		Platform.log('Parsing Sensor Data...');

		dt = new RegExp(SENSOR_DATA, 'gis').exec(myData)[1];
		it = new RegExp(SENSOR_ITEM, 'gis');
		id = it.exec(dt);
		while(id !== null) {
			id = id[0];

			pl = { Name: new RegExp(SENSOR_NAME, 'gis').exec(id)[1] };

			pt = new RegExp(SENSOR_PART, 'gis');
			pd = pt.exec(id)
			while (pd !== null) {
				m = /(\d+[,.]*\d+)\s*([CF%]|mm|km\/h|mph|kph)/gis.exec(pd[2]);
				pl[Platform.cleanName(pd[1])] = m ?
					{
						Value: parseFloat(m[1].replace(/,/, '.')),
						Unit: m[2]
					} :
					pd[2];
				pd = pt.exec(id)
			}

			Platform.send({ payload: pl });

			id = it.exec(dt);
		}
	}

	MobileAlerts.prototype.cleanName = function(myData)
	{
		myData = myData.replace(/&#228;/g, 'ä');
		myData = myData.replace(/&#246;/g, 'ö');
		myData = myData.replace(/&#252;/g, 'ü');
		myData = myData.replace(/&#196;/g, 'Ä');
		myData = myData.replace(/&#214;/g, 'Ö');
		myData = myData.replace(/&#220;/g, 'Ü');
		myData = myData.replace(/&#223;/g, 'ß');
		myData = myData.replace(/\./g, '_');
		myData = myData.replace(/ /g, '_');

		return myData;
	}

	// ~~~ legacy functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	MobileAlerts.prototype.parseSensorDataLegacy = function(myData)
	{
		var Platform = this;

		var sa;		// sensor array
		var r;		// regex
		var m;		// matches
		var n;		// name
		var s;		// serial
		var t;		// type
		var p;		// payload
		
		Platform.log('Parsing Sensor Data (legacy Mode)...');

		sa = [];
		r = /.*?sensor-header[\s\S]*?.*?<a href.*?>(.*?)<\/a>[\s\S]*?.*?<h4>(.*?)<\/h4>/gi;
		m = r.exec(myData);
		while(m !== null) {						// get each sensor serial and name
			n = m[Platform.MatchTypes.Name];	// from initial sensor data...
			s = m[Platform.MatchTypes.Serial];
			sa[s] = n;							// ...and add it to sonsor array.
		
			m = r.exec(myData);
		}
		
		for (var s in sa) {						// iterate each sensor.
			p = { name: sa[s], serial: s };
			t = parseInt('0x' + s.substr(0, 2));
			switch (t) {
				case Platform.DeviceTypes.MA10006:
					p.temperature = parseFloat(new RegExp(MA10006_TEMPERATURE_INSIDE.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.humidity = parseFloat(new RegExp(MA10006_HUMIDITY_INSIDE.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.temperature_out = parseFloat(new RegExp(MA10006_TEMPERATURE_OUTSIDE.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.humidity_out = parseFloat(new RegExp(MA10006_HUMIDITY_OUTSIDE.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.active = !isNaN(p.temperature);
					p.active_out = !isNaN(p.temperature_out);
					break;
		
				case Platform.DeviceTypes.MA10120:
					p.temperature = parseFloat(new RegExp(MA10120_TEMPERATURE_INSIDE.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.temperature_out = parseFloat(new RegExp(MA10120_TEMPERATURE_OUTSIDE.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.active = !isNaN(p.temperature);
					p.active_out = !isNaN(p.temperature_out);
					break;
		
				case Platform.DeviceTypes.MA10100:
					p.temperature = parseFloat(new RegExp(MA10100_TEMPERATURE.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.active = !isNaN(p.temperature);
					break;
		
				case Platform.DeviceTypes.MA10200:
				case Platform.DeviceTypes.MA10230:
				case Platform.DeviceTypes.MA10232:
					p.temperature = parseFloat(new RegExp(MA10200_TEMPERATURE.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.humidity = parseFloat(new RegExp(MA10200_HUMIDITY.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.active = !isNaN(p.temperature);
					break;
				   
				case Platform.DeviceTypes.MA10320:
					p.temperature = parseFloat(new RegExp(MA10320_TEMPERATURE.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.humidity = parseFloat(new RegExp(MA10320_HUMIDITY.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.temperature_cable = parseFloat(new RegExp(MA10320_TEMPERATURE_CABLE.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.active = !isNaN(p.temperature);
					p.active_cable = !isNaN(p.temperature_cable);
					break;

				case Platform.DeviceTypes.MA10350:
					p.temperature = parseFloat(new RegExp(MA10350_TEMPERATURE.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.humidity = parseFloat(new RegExp(MA10350_HUMIDITY.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.leak = new RegExp(MA10350_LEAK.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1] === 'Trocken' ? 0 : 1;
					p.active = !isNaN(p.temperature);
					p.active_leak = !isNaN(p.leak);
					break;
		
				case Platform.DeviceTypes.MA10421:
					p.temperature = parseFloat(new RegExp(MA10421_TEMPERATURE.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.humidity = parseFloat(new RegExp(MA10421_HUMIDITY.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.temperature_1 = parseFloat(new RegExp(MA10421_TEMPERATURE_1.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.humidity_1 = parseFloat(new RegExp(MA10421_HUMIDITY_1.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.temperature_2 = parseFloat(new RegExp(MA10421_TEMPERATURE_2.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.humidity_2 = parseFloat(new RegExp(MA10421_HUMIDITY_2.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.temperature_3 = parseFloat(new RegExp(MA10421_TEMPERATURE_3.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.humidity_3 = parseFloat(new RegExp(MA10421_HUMIDITY_3.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.active = !isNaN(p.temperature);
					p.active_1 = !isNaN(p.temperature_1);
					p.active_2 = !isNaN(p.temperature_2);
					p.active_3 = !isNaN(p.temperature_3);
					break;

				case Platform.DeviceTypes.MA10650:
					var pa = new RegExp(MA10650_RAIN.replace(/%SERIAL%/gi, s), 'gi').exec(myData);
					p.rain = pa ? parseFloat(pa[3].replace(',', '.')) : 0.0;
					p.active = (pa != undefined);
					break;
					
				case Platform.DeviceTypes.MA10660:
					var pa = new RegExp(MA10660_WIND.replace(/%SERIAL%/gi, s), 'gi').exec(myData);
					p.windspeed = pa ? parseFloat(pa[3].replace(',', '.')) : 0.0;
					p.squall = pa ? parseFloat(pa[4].replace(',', '.')) : 0.0;
					p.winddirection = pa ? pa[5] : 'unknown';
					p.active = (pa != undefined);
					break;

				case Platform.DeviceTypes.MA10700:
					p.temperature = parseFloat(new RegExp(MA10700_TEMPERATURE.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.humidity = parseFloat(new RegExp(MA10700_HUMIDITY.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.temperature_cable = parseFloat(new RegExp(MA10700_TEMPERATURE_CABLE.replace(/%SERIAL%/gi, s), 'gi').exec(myData)[1].replace(',', '.'));
					p.active = !isNaN(p.temperature);
					p.active_cable = !isNaN(p.temperature_cable);
					break;
			}

			Platform.send({ payload: p });
		}
	}
};
