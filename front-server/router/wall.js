const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

const { getWall, getWallNum} = require("../services/index");

router.get("/getall/wall", (req, res) => {
    console.log(req.query);
    let size = req.query.size;
    let num = (req.query.pagenum - 1) * size;
    getWall(num, size).then((data) => {
      // console.log(data)
      if (!data) {
        new Result("获取失败").fail(res);
      } else {
        new Result(data, "获取成功").success(res);
      }
    });
  });
  
  router.get("/getwall/num", (req, res) => {
    getWallNum().then((data) => {
      // console.log(data)
      if (!data) {
        new Result("获取成功").fail(res);
      } else {
        new Result(data, "获取成功").success(res);
      }
    });
  });

module.exports = router;
