const express = require('express')
const router = require('./router')
const fs = require('fs')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()

// app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/',router)


const server = app.listen(5000,function(){
    const {address, port} = server.address()
    console.log('服务启动http://%s%s', address, port)
})