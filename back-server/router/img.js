const express = require("express");
const router = express.Router();
var multer = require("multer");
const Result = require("../models/Result");
const { UPLOAD_PATH } = require("../utils/constant");
const {
  insertimgSwiper,
  getAllSwiper,
  deleteimgSwiper,
  insertWallImg,
  getAllWall,
  getWallNum,
  delWallImg
} = require("../services/img");
const fs = require("fs");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// var upload = multer({ storage: storage });

router.post(
  "/upload/swiper",
  multer({ dest: `${UPLOAD_PATH}/img` }).single("file"),
  (req, res, next) => {
    var file = req.file;
    // console.log(file);
    if (!req.file || req.file.length === 0) {
      new Result("上传图片失败").fail(res);
    } else {
      // console.log('success')
      var num = parseInt(Math.random() * 100000);
      let oldname = file.path;
      let newname = file.destination + "/" + num + file.originalname;
      // console.log(oldname)
      // console.log(newname)
      const img = {
        name: num + file.originalname,
        url: "http://localhost:8089/img/" + num + file.originalname,
      };
      fs.rename(oldname, newname, (err) => {
        if (!err) {
          // console.log('命名成功')
          new Result(img, "图片上传成功").success(res);
        } else {
          // console.log('命名失败')
        }
      });
    }
  }
);

router.post("/add/swiper", (req, res) => {
  // console.log('------------')
  // console.log(req.body)
  insertimgSwiper(req.body).then((data) => {
    if (!data || data.length === 0) {
      new Result("添加失败").fail(res);
    } else {
      new Result("添加成功").success(res);
    }
  });
});

router.get("/getall/swiper", (req, res) => {
  getAllSwiper().then((data) => {
    // console.log(data)
    if (!data) {
      new Result("获取成功").fail(res);
    } else {
      new Result(data, "获取成功").success(res);
    }
  });
});

router.get("/delete/swiper", (req, res) => {
  console.log(req.query);
  deleteimgSwiper(req.query.id).then((data) => {
    if (!data || data.length === 0) {
      new Result("删除失败").fail(res);
    } else {
      new Result("删除成功").success(res);
    }
  });
});

router.post(
  "/upload/wall",
  multer({ dest: `${UPLOAD_PATH}/wall` }).single("file"),
  (req, res, next) => {
    var file = req.file;
    // console.log(file);
    if (!req.file || req.file.length === 0) {
      new Result("上传图片失败").fail(res);
    } else {
      // console.log('success')
      var num = parseInt(Math.random() * 100000);
      let oldname = file.path;
      let newname = file.destination + "/" + num + file.originalname;
      // console.log(oldname)
      // console.log(newname)
      const img = {
        name: num + file.originalname,
        url: "http://localhost:8089/wall/" + num + file.originalname,
      };
      fs.rename(oldname, newname, (err) => {
        if (!err) {
          // console.log('命名成功')
          new Result(img, "图片上传成功").success(res);
        } else {
          // console.log('命名失败')
        }
      });
    }
  }
);

router.post("/add/wall", (req, res) => {
  // console.log('------------')
  // console.log(req.body)
  insertWallImg(req.body).then((data) => {
    if (!data || data.length === 0) {
      new Result("添加失败").fail(res);
    } else {
      new Result("添加成功").success(res);
    }
  });
});

router.get("/getall/wall", (req, res) => {
  console.log(req.query)
  let size = req.query.size
  let num = (req.query.pagenum - 1)*size
  getAllWall(num,size).then((data) => {
    // console.log(data)
    if (!data) {
      new Result("获取成功").fail(res);
    } else {
      new Result(data, "获取成功").success(res);
    }
  });
});

router.get('/getwall/num',(req,res) => {
  getWallNum().then((data) => {
    // console.log(data)
    if (!data) {
      new Result("获取成功").fail(res);
    } else {
      new Result(data, "获取成功").success(res);
    }
  });
})

router.get("/delete/wall", (req, res) => {
  console.log(req.query);
  deleteimgSwiper(req.query.id).then((data) => {
    if (!data || data.length === 0) {
      new Result("删除失败").fail(res);
    } else {
      new Result("删除成功").success(res);
    }
  });
});

router.post(
  "/upload/art",
  multer({ dest: `${UPLOAD_PATH}/article` }).single("file"),
  (req, res, next) => {
    var file = req.file;
    // console.log(file);
    if (!req.file || req.file.length === 0) {
      new Result("上传图片失败").fail(res);
    } else {
      // console.log('success')
      var num = parseInt(Math.random() * 100000);
      let oldname = file.path;
      let newname = file.destination + "/" + num + file.originalname;
      // console.log(oldname)
      // console.log(newname)
      const img = {
        name: num + file.originalname,
        url: "http://localhost:8089/article/" + num + file.originalname,
      };
      fs.rename(oldname, newname, (err) => {
        if (!err) {
          // console.log('命名成功')
          new Result(img, "图片上传成功").success(res);
        } else {
          // console.log('命名失败')
        }
      });
    }
  }
);

module.exports = router;
