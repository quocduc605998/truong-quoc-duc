const db = require('../models');
// const mqtt = require('mqtt');
const states = db.states;
const { insertDBCSHTUpdate } = require('./dbcsht.controller');
const { insertDBLWTUpdate } = require('./dblwt.controller');
const { getDeviceList } = require('./dbdevice.controller');

var devices ={}
var listdev = true

async function mqtt_messageReceived(topic, message, packet) {
    if(listdev == true)
    {
      devices = await getDeviceList();
      listdev = false
    }
    const [, csht, name, endmsg] = topic.split('/');
    if (endmsg == 'refreshDevice' && name == 'IrHub') {
      listdev = true
    }
    if (csht.startsWith('CSHT')) {
      var sysnameobj = (devices.filter(obj => obj.station_id === csht))[0]
      if(sysnameobj && sysnameobj.hasOwnProperty('name'))
      var sysname = (devices.filter(obj => obj.station_id === csht))[0].name
      if (endmsg === 'LWT') {
        if (message == 'Online' || message == 'Offline') {
          const json = {
            CSHT: csht,
            name,
            sysname: sysname,
            time: new Date(),
            LWT: {
              [name]: message == 'Online' ? 'Online' : 'Offline',
            },
          };
          await insertDBLWTUpdate(json.CSHT, json);
        }
      } else {
        const payload = JSON.parse(message);
        const json = {
          CSHT: csht,
          name,
          sysname: sysname,
          time: new Date(),
          [endmsg]: {
            [name]: payload,
          },
        };
        if (endmsg === 'Sensors') {
          await insertDBCSHTUpdate(json.CSHT, json);
        } else if (endmsg === 'State') {
          const newDoc = new states({ name: json.name,sysname:sysname, CSHT: json.CSHT, State: json.State, time: json.time });
          await newDoc.save();
        }
      }
    }
  }

  module.exports = {
    mqtt_messageReceived
  };