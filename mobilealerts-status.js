module.exports = function(RED) {
	'use strict';

	// ~~~ constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	const API = require('./mobilealerts-api.js');

	const SENSOR_DATA	= '(<div class="panel panel-default">.*)<hr \\/>';
	const SENSOR_ITEM = '<div class="panel panel-default">.*?<\\/div>\\s*?<\\/div>\\s*?<\\/div>\\s*?<\\/div>';
	const SENSOR_NAME	= '<a.*?>(.*?)<';
	const SENSOR_PART = '<div class="sensor-component">.*?<h5>(.*?)<\\/h5>.*?<h4>(.*?)<\\/h4>.*?<\\/div>';

	// ~~~ fields ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	let Platform = this;

	// ~~~ constructor / destructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	function MobileAlerts(myNode)
	{
		RED.nodes.createNode(this, myNode);

		Platform = this;
		var Loop;
	
		this.PhoneID = myNode.mobilealertsid;
		this.Interval = parseInt(myNode.interval);
		this.Devices = myNode.devices;
		this.Clock = myNode.clock;
		this.Temperature = myNode.temperature;
		this.Rain = myNode.rain;
		this.Wind = myNode.wind;

		function publishStates()
		{
			var sa = [];
			for (var Device in Platform.Devices) {
				if (Platform.Devices.hasOwnProperty(Device)) {
					sa.push(Platform.Devices[Device].serial);
				}
			}

			if (!sa.length) {
				Platform.warn(
					'No Device Serial Numbers specified to query. Using depricated Mechanism to fetch Data. ' +
					'You should upgrade to new Functionality specifying Device Serials to query! ' +
					'Migration is necessary because deprocated Mechanism will be removed from this Plugin later. ' +
					'Keep in Mind that Migration will break current Processing because there are Changes to Attribute Names.'
				);
				API.fetchDataLegacy('measurements.mobile-alerts.eu', Platform.PhoneID, Platform.parseSensorDataLegacy);
				return;
			}

			API.fetchData(Platform, sa, Platform.parseSensorData);
		}

		publishStates();

		Loop = setInterval(function() {
			publishStates();
		}, Platform.Interval * 1000);   // trigger every defined secs

		Platform.on("close", function() {
			if (Loop) {
				clearInterval(Loop);
			}
		});
	}

	RED.nodes.registerType('mobilealerts-status', MobileAlerts);

	// ~~~ functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	MobileAlerts.prototype.parseSensorData = function(myData)
	{
		if (!myData.success) {
			Platform.warn('Did not expected data: ' + JSON.stringify(myData));
			return;
		}

		Platform.debug('Parsing Sensor Data...');
		
		var ds = myData.result.devices;
		for (var i = 0; i < ds.length; i++) {
			var d = ds[i];
			Platform.Devices[d.deviceid] = {
				'serial': d.deviceid,
				'name': d.name
			};
			Platform.send({ payload: d });
		}
	}

	RED.httpAdmin.get(
		"/devices",
		RED.auth.needsPermission('devices.read'),
		function(myRequest, myResponse) {
			myResponse.json(Platform.Devices);
		}
	);

	// ~~~ deprecated functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	MobileAlerts.prototype.parseSensorDataLegacy = function(myData)
	{
		var dt;		// data
		var it;		// item
		var id;		// item data
		var pt;		// part
		var pd;		// part data
		var pl;		// payload
		var m;		// matches

		Platform.debug('Parsing Sensor Data...');

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