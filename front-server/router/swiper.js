const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

const { getSwiper } = require("../services/index");

router.get("/getall/swiper", (req, res) => {
  getSwiper().then((data) => {
    // console.log(data)
    if (!data) {
      new Result("获取失败").fail(res);
    } else {
      new Result(data, "获取成功").success(res);
    }
  });
});

module.exports = router;
