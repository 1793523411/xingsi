CREATE DATABASE vue_xingsi;

DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `admin_user` VALUES (1, 'xxx', 'xxx', 'test', 'test', '');

--轮播图
-- id，url

CREATE  TABLE swiper(id int AUTO_INCREMENT,url VARCHAR(255),name VARCHAR(255),PRIMARY KEY(ID));
CREATE  TABLE wall(id int AUTO_INCREMENT,url VARCHAR(255),name VARCHAR(255),PRIMARY KEY(ID));

-- 分页
select * from wall order by id desc limit (pagnum-1)*size,size;

-- 文章id ，*文章题目， 文章内容，*文章时间，文章封面，*文章简介，*访问次数，点赞人数

CREATE  TABLE article(id int AUTO_INCREMENT,title VARCHAR(255),content TEXT,date VARCHAR(255),url VARCHAR(255),name VARCHAR(255),text VARCHAR(255),visited INT,love INT,PRIMARY KEY(ID));

 select * from article order by id desc limit (pagnum-1)*size,size;

SELECT * from article WHERE title LIKE '%倾斜%'

UPDATE article SET title = '${newTitle}' ,content = '${newContent}', url='${newUrl}',name='${newName}',text='${newUrl}', WHERE id = ${id}