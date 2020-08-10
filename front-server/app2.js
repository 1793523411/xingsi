const express = require("express");
const router = require('./router/index')

const app = express();
const cors = require('cors')

app.use(cors())
app.use('/',router)

const server = app.listen(5001, function () {
  const { address, port } = server.address();
  console.log("Http Server is running on http://%s:%s", address, port);
});
