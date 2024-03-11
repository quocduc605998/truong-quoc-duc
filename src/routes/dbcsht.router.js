const express = require('express');
const router = express.Router();

const ctl = require("../controllers");
const insertDBCSHTUpdate = ctl.dbcsht;

// const { insertDBCSHTUpdate } = require("../controllers/dbcsht.controller")

router.post('/', (req, res) => {
    // Xử lý yêu cầu và gửi phản hồi
    res.send(insertDBCSHTUpdate);
  });


module.exports = router;