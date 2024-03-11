#!/usr/bin/env node

const mqtt = require('mqtt');
const db = require("./models");
const rt = require("./routes");
const configViewEngine = require("./config/viewEngine")
const dbcshtRoute = rt.dbcsht;
const dblwtRoute = rt.dblwt;
const dbmqttRoute = rt.dbmqtt;
const dbdeviceRoute = rt.dbdevice;
const dbConfig = require("./db/db.config");
const webRoutes = require("./routes/web")
const { mqtt_messageReceived } = require('./controllers/dbmqtt.controller');
var express = require('express');
var hbs = require('hbs');
var app = express();
app.listen(8082)

configViewEngine(app);

app.use('/', webRoutes);

var Topic = 'tele/+/IrHub/#'; //subscribe to all topics
var Broker_URL = 'mqtt://smartbts-mqtt.vnptdaklak.vnpt.vn';
var options = {
  clientId: 'IrHub-admin1',
  port: 1883,
  keepalive: 60,
  username: 'ttdhtt',
  password: 'ttdhtt@123',
  connectTimeout: 4000
};

function mqtt_connect() {
  console.log("Connecting MQTT");
  client.subscribe(Topic, mqtt_subscribe);
}

function mqtt_subscribe(err, granted) {
  console.log("Subscribed to " + Topic);
  if (err) {
    console.log(err);
  }
}

function mqtt_reconnect(err) {
  console.log("Reconnect MQTT");
  if (err) {
    console.log(err);
  }
  client = mqtt.connect(Broker_URL, options);
}

function mqtt_error(err) {
  console.log("Error!");
  if (err) {
    console.log(err);
  }
}
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.use('/api/dbbcsht', dbcshtRoute);

app.use('/api/dbblwt', dblwtRoute);

function topicMatches(topic, pattern) {
  const regex = new RegExp('^' + pattern.replace(/\+/, '[^/]+').replace(/#/, '.+') + '$');
  return regex.test(topic);
}

function mqtt_close() {
  console.log("Close MQTT");
}

app.use('/api/dbbmqtt', dbmqttRoute);

app.use('/api/dbbdevice', dbdeviceRoute);

var client = mqtt.connect(Broker_URL, options);

client.on('connect', mqtt_connect);
client.on('error', mqtt_error);
client.on('message', mqtt_messageReceived);