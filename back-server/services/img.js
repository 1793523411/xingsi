const { insertSwiper, getSwiper, deleteSwiper, getWall } = require("../db");

function insertimgSwiper(post) {
  return insertSwiper("INSERT INTO swiper SET ?", post);
}

function getAllSwiper() {
  return getSwiper("SELECT * from swiper");
}

function deleteimgSwiper(id) {
  return deleteSwiper(`DELETE FROM swiper WHERE id = ${id}`);
}

function insertWallImg(post) {
  return insertSwiper("INSERT INTO wall SET ?", post);
}

function getAllWall(num, size) {
  return getWall(` select * from wall order by id desc limit ${num},${size}`);
}

function getWallNum() {
  return getWall("SELECT COUNT(*) as total FROM wall");
}

function delWallImg(id) {
  return deleteSwiper(`DELETE FROM wall WHERE id = ${id}`);
}

module.exports = {
  insertimgSwiper,
  getAllSwiper,
  deleteimgSwiper,
  insertWallImg,
  getAllWall,
  getWallNum,
  delWallImg
};
