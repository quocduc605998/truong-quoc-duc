const express = require('express');
const router = express.Router();

const ctl = require("../controllers");
const insertDBLWTUpdate = ctl.dblwt;

router.post('/', (req, res) => {
    // Xử lý yêu cầu và gửi phản hồi
    res.send(insertDBLWTUpdate);
  });

module.exports = router
