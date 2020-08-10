const { addArticle, getWall, deleteSwiper,queryOne } = require("../db");

function addOneArticle(post) {
  return addArticle("INSERT INTO article SET ?", post);
}

function getAllArticle(num, size) {
  return getWall(
    ` select * from article order by id desc limit ${num},${size}`
  );
}

function getArticleNum() {
  return getWall("SELECT COUNT(*) as total FROM article");
}

function delArticleById(id) {
  return deleteSwiper(`DELETE FROM article WHERE id = ${id}`);
}

function searchArticle(text){
    return getWall(`SELECT * from article WHERE title LIKE '%${text}%'`)
}

function editorArticle(id){
    return queryOne(`select * from article where id='${id}'`);
}

function updateArticle(newTitle,newContent,newUrl,newName,newText,newDate,id){
    return deleteSwiper(`UPDATE article SET title = '${newTitle}' ,content = '${newContent}', url='${newUrl}',name='${newName}',text='${newText}',date='${newDate}' WHERE id = ${id}`)
}

module.exports = {
  addOneArticle,
  getAllArticle,
  getArticleNum,
  delArticleById,
  searchArticle,
  editorArticle,
  updateArticle
};
