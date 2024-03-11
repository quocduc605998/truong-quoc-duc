const express = require('express');
const router = express.Router();

const ctl = require("../controllers");
const mqtt_messageReceived = ctl.dbmqtt;

router.post('/', (req, res) => {
    res.send(mqtt_messageReceived);
});

module.exports = router