// ~~~ constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var SENSOR_DATA	= '(<div class="panel panel-default">.*)<hr \\/>';
var SENSOR_ITEM = '<div class="panel panel-default">.*?<\\/div>\\s*?<\\/div>\\s*?<\\/div>\\s*?<\\/div>';
var SENSOR_NAME	= '<a.*?>(.*?)<';
var SENSOR_PART = '<div class="sensor-component">.*?<h5>(.*?)<\\/h5>.*?<h4>(.*?)<\\/h4>.*?<\\/div>';

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
				Platform.parseSensorData(myResponse.body);
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

		dt = new RegExp(SENSOR_DATA, 'gis').exec(myData);
		if (!dt || dt.length < 2) {
			Platform.warn('Did not get valid Data. Server might me down!');
		} else {
			dt = dt[1];
		}

		it = new RegExp(SENSOR_ITEM, 'gis');
		id = it.exec(dt);
		while(id !== null) {
			id = id[0];

			pl = { Name: Platform.cleanName(new RegExp(SENSOR_NAME, 'gis').exec(id)[1], true) };

			pt = new RegExp(SENSOR_PART, 'gis');
			pd = pt.exec(id)
			while (pd !== null) {
				m = /(\-?\d+[,.]*\d+)\s*(%| C| F|mm|km\/h|mph|kph)/gis.exec(pd[2]);
				pl[Platform.cleanName(pd[1])] = m ?
					{
						Value: parseFloat(m[1].replace(/,/, '.')),
						Unit: m[2].replace(/ /, '')
					} :
					pd[2];
				pd = pt.exec(id)
			}

			Platform.send({ payload: pl });

			id = it.exec(dt);
		}
	}

	MobileAlerts.prototype.cleanName = function(myData, onlyUmlauts)
	{
		myData = myData.replace(/&#228;/g, 'ä');
		myData = myData.replace(/&#246;/g, 'ö');
		myData = myData.replace(/&#252;/g, 'ü');
		myData = myData.replace(/&#196;/g, 'Ä');
		myData = myData.replace(/&#214;/g, 'Ö');
		myData = myData.replace(/&#220;/g, 'Ü');
		myData = myData.replace(/&#223;/g, 'ß');
		
		if (!onlyUmlauts) {
			myData = myData.replace(/\./g, '_');
			myData = myData.replace(/ /g, '_');
		}

		return myData;
	}
};