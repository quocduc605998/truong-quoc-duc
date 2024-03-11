const express = require('express');
const router = express.Router();

const ctl = require("../controllers");
const getDeviceList = ctl.dbdevice;

router.post('/', (req, res) => {
    res.send(getDeviceList);
});

module.exports = router