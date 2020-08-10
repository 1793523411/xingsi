const express = require('express')
const boom = require('boom')
const userRouter = require('./article')
const swiperRouter = require('./swiper')
const wallRouter = require('./wall')
const {
    CODE_ERROR
} = require('../utils/constant')

const router = express.Router()

router.get('/',function(req,res){
    res.send('Hello')
})

router.use('/article',userRouter)
router.use('/swiper',swiperRouter)
router.use('/wall',wallRouter)

router.use((req,res,next) => {
    next(boom.notFound('接口不存在'))
})

router.use((err,req,res,next) => {
    console.log(err)
    const msg = (err && err.message) || '系统错误'
    const statusCode = (err.output && err.output.statusCode) || 500
    const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
    res.status(statusCode).json({
        code:CODE_ERROR,
        msg,
        error: statusCode,
        errorMsg
    })

})

module.exports = router