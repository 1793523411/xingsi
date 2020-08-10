const { querySql, queryOne } = require("../db");

function getSwiper(){
    return queryOne("SELECT * from swiper")    
}

function getArticle(num,size){
    return queryOne(` select * from article order by id desc limit ${num},${size}`)
}

function getOneArticle(id){
    return querySql(`select * from article where id='${id}'`)
}

function getArticleNum(){
    return queryOne("SELECT COUNT(*) as total FROM article")
}

function updateArticl(love,visited,id){
    return querySql(`UPDATE article SET love = '${love}' ,visited = '${visited}' WHERE id = ${id}`)
}

function getWall(num,size){
    return queryOne(` select * from wall order by id desc limit ${num},${size}`)
}

function getWallNum(){
    return queryOne("SELECT COUNT(*) as total FROM wall")
}

module.exports = {
    getSwiper,
    getArticle,
    getOneArticle,
    getArticleNum,
    getWall,
    getWallNum,
    updateArticl
};
