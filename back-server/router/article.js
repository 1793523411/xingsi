const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const {
  addOneArticle,
  getAllArticle,
  getArticleNum,
  delArticleById,
  searchArticle,
  editorArticle,
  updateArticle
} = require("../services/article");
const { route } = require("./img");

router.post("/add/article", (req, res) => {
  console.log(req.body);
  addOneArticle(req.body).then((data) => {
    if (!data || data.length === 0) {
      new Result("添加失败").fail(res);
    } else {
      new Result("添加成功").success(res);
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

router.get("/getall/article", (req, res) => {
  console.log(req.query);
  let size = req.query.size;
  let num = (req.query.pagenum - 1) * size;
  getAllArticle(num, size).then((data) => {
    // console.log(data)
    if (!data) {
      new Result("获取成功").fail(res);
    } else {
      new Result(data, "获取成功").success(res);
    }
  });
});

router.get("/delete/article", (req, res) => {
  console.log(req.query);
  delArticleById(req.query.id).then((data) => {
    if (!data || data.length === 0) {
      new Result("删除失败").fail(res);
    } else {
      new Result("删除成功").success(res);
    }
  });
});

router.get("/search/article", (req, res) => {
  console.log(req.query);
  let key = req.query.key;
  searchArticle(key).then((data) => {
    // console.log(data)
    if (!data) {
      new Result("获取成功").fail(res);
    } else {
      new Result(data, "获取成功").success(res);
    }
  });
});

router.get("/editor/id",(req,res) =>{
  console.log(req.query);
  editorArticle(req.query.id).then((data) => {
    if (!data || data.length === 0) {
      new Result("获取失败").fail(res);
    } else {
      new Result(data,"获取成功").success(res);
    }
  });
})

router.post("/update/id",(req,res) => {
  console.log(req.body)
  let newTitle = req.body.title
  let newContent = req.body.content
  let newUrl = req.body.url
  let newName = req.body.name
  let newText = req.body.text
  let newDate = req.body.date
  let id = req.body.id
  updateArticle(newTitle,newContent,newUrl,newName,newText,newDate,id).then((data) => {
    if (!data || data.length === 0) {
      new Result("修改失败").fail(res);
    } else {
      new Result(data,"修改成功").success(res);
    }
  });
})

module.exports = router;
