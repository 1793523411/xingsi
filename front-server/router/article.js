const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

const {
  getArticle,
  getOneArticle,
  getArticleNum,
  updateArticl
} = require("../services/index");

router.get("/getall/article", (req, res) => {
  console.log(req.query);
  let size = req.query.size;
  let num = (req.query.pagenum - 1) * size;
  getArticle(num, size).then((data) => {
    // console.log(data)
    if (!data) {
      new Result("获取失败").fail(res);
    } else {
      new Result(data, "获取成功").success(res);
    }
  });
});

router.get("/getarticle/num", (req, res) => {
  getArticleNum().then((data) => {
    // console.log(data)
    if (!data) {
      new Result("获取成功").fail(res);
    } else {
      new Result(data, "获取成功").success(res);
    }
  });
});

router.get("/getone/id", (req, res) => {
  console.log(req.query);
  getOneArticle(req.query.id).then((data) => {
    if (!data || data.length === 0) {
      new Result("获取失败").fail(res);
    } else {
      new Result(data, "获取成功").success(res);
    }
  });
});
router.get("/update/id", (req, res) => {
  console.log(req.query);
  updateArticl(req.query.love,req.query.visited,req.query.id).then((data) => {
    if (!data || data.length === 0) {
      new Result("获取失败").fail(res);
    } else {
      new Result(data, "获取成功").success(res);
    }
  });
});
module.exports = router;
