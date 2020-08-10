const express = require("express");
const { login, findUser } = require('../services/user')
const Result = require('../models/Result');
const { decoded } = require('../utils')
const { body, validationResult } = require('express-validator')
const {PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant')
const boom = require('boom')
const jwt = require('jsonwebtoken')

const router = express.Router();

router.get("/info", function (req, res) {
  const decode = decoded(req)
  if(decode && decode.username){
    findUser(decode.username).then(user => {
      if(user){
        new Result(user, '用户信息查询成功').success(res)
      }else{
        new Result('用户信息查询失败').fail(res)
      }
    })
  }else{
    new Result('用户信息查询失败').fail(res)
  }
});

router.post("/login", [
  body('username').isString().withMessage('用户名必须为字符串'),
  body('password').isString().withMessage('用户名必须为数字')
],function (req, res, next) {
  //   console.log("/user/login", req.body);
  // const username = req.body.username;
  // const password = req.body.password;

  const err = validationResult(req)
  if(!err.isEmpty()){
    const [{msg}] = err.errors
    next(boom.badRequest(msg))
  }else{
    let {username, password} = req.body

  // console.log(username,password)

  login(username,password).then(user => {
    // console.log(user)
    if(!user || user.length === 0){
      // console.log('failed')
      new Result('登陆失败').fail(res)
    }else{
      // console.log('success')
      const token = jwt.sign(
        {username},
        PRIVATE_KEY,
        {expiresIn:JWT_EXPIRED}
      )
      new Result({token},"登录成功").success(res);
    }
  })
  }

  

  // if (username === "admin" && password === "123456") {
  //   new Result("登录成功").success(res);
  // } else {
  //   new Result("登录失败").fail(res);
  // }
  // res.json({
  //   code: 0,
  //   msg: "登录成功",
  // });
});

module.exports = router;
