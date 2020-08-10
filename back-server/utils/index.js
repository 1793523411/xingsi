const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("./constant");

function decoded(req) {
  let token = req.get("Authorization");
  if (token.indexOf("Bearer") === 0) {
    token = token.replace("Bearer ", "");
  }
  console.log(token)
  return jwt.verify(token, PRIVATE_KEY);
}

module.exports = {
    decoded
};
