# xingsi

## 说明

1.git clone 下来后在项目跟目录运行npm install 安装所依赖，运行npm run serve 运行，默认端口 8080，初始化项目只进行了大致布局和路由配置

以下是src目录结构

```

├─assets //不要动，如果需要字体图标文件，和修改全局样式，一人修改
│  └─css
├─components //不要增加，字文件夹里可以自由添加该组件需要文件夹或子组件
│  ├─About //行思简介
│  ├─Article //文章详情页
│  ├─History //行思历史
│  └─Main //首页
├─plugins //不要动，这里添加需要用到的elementui组件，需要时仅一人添加，避免提交时产生冲突
├─router//不要动，我已经写好了
├─store//不要动
└─views // 顶部导航栏 + 底部

```

其他文件不要修改

需要写操作的文件夹只有 View，About，Article，History， Main这五个文件夹

所有style加scoped

如果需要全局挂载，一个人在主文件和store中添加即可

**如果你不打算使用命令，那么下面提交代码方式全部作废**

**重点** ，每次进行开发前，先运行 git pull

开发完成后代码提交：
          1.git add .
          2.git commit -m '文字说明'
          3.git push (默认提交到主分支)
不要直接删除文件，创建文件和文件夹前想好在创建，尽量不要进行删除操作，如果非要删除 ： git rm -f 文件名，若要删除文件夹 ： git rm -rf 文件夹名

创建好的文件和文件夹不要改名，要改名的备份一下删除再重新创建


## 以下是接口文档：

Url: http://xingsif.ygjie.icu

如何访问： url + 下面的部分路径

带参访问：比如要访问所有文章 http://xingsif.ygjie.icu/article/getall/article?pagenum=3&size=3，_代表占位符

不带参访问： 直接 url + 下面部分路径 比如获取轮播图 http://xingsif.ygjie.icu/swiper/getall/swiper

### 文章

获取所有文章：`/article/getall/article?pagenum=_&size=_`

返回示例：
```json
{
    "code": 0,
    "msg": "获取成功",
    "data": [
        {
            "id": 12,
            "title": "3213421",
            "content": "<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>1234124<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>",
            "date": "2020-08-05 10:47",
            "url": "http://localhost:8089/article/58022img23.gif",
            "name": "58022img23.gif",
            "text": "4214234234",
            "visited": 0,
            "love": 0
        },
        {
            "id": 11,
            "title": "完成",
            "content": "<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">img</span> <span class=\"hljs-attr\">src</span>=<span class=\"hljs-string\">&quot;http://localhost:8089/article/323025b98420cfdce4a50987d5b137da4fa08.jpg&quot;</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>",
            "date": "2020-08-04 23:22",
            "url": "http://localhost:8089/article/6213766fb0e3268c78c764de1c4a1591548b7.jpg",
            "name": "6213766fb0e3268c78c764de1c4a1591548b7.jpg",
            "text": "完成这个页面的开发",
            "visited": 0,
            "love": 0
        },
    ]
}
```

失败统一的code为 -1 ，下面不再赘述，以code为准，msg只是描述信息，可能有笔误
```json
{
    "code": -1,
    "msg": "获取失败"
}
```

获取文章总数量：`/article/getarticle/num`
```json
{
    "code": 0,
    "msg": "获取成功",
    "data": [
        {
            "total": 13
        }
    ]
}****
```

获取单个文章：`/article/getone/id?id=_`

返回示例
```json
{
    "code": 0,
    "msg": "获取成功",
    "data": [
        {
            "id": 11,
            "title": "完成",
            "content": "<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">img</span> <span class=\"hljs-attr\">src</span>=<span class=\"hljs-string\">&quot;http://localhost:8089/article/323025b98420cfdce4a50987d5b137da4fa08.jpg&quot;</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span>",
            "date": "2020-08-04 23:22",
            "url": "http://localhost:8089/article/6213766fb0e3268c78c764de1c4a1591548b7.jpg",
            "name": "6213766fb0e3268c78c764de1c4a1591548b7.jpg",
            "text": "完成这个页面的开发",
            "visited": 0,
            "love": 0
        }
    ]
}
```

### 轮播图

获取轮播图：`/swiper/getall/swiper`

返回示例
```json
{
    "code": 0,
    "msg": "获取成功",
    "data": [
        {
            "id": 71,
            "url": "http://localhost:8089/img/22359ac36403897f9039821336ab819fad4b7cde9fa23.gif",
            "name": "22359ac36403897f9039821336ab819fad4b7cde9fa23.gif"
        },
        {
            "id": 72,
            "url": "http://localhost:8089/img/289195780689d00ee0.gif",
            "name": "289195780689d00ee0.gif"
        },
        {
            "id": 73,
            "url": "http://localhost:8089/img/521859922720e0cf3d7ca9cc35c3bf61fbe096b63a94.jpg",
            "name": "521859922720e0cf3d7ca9cc35c3bf61fbe096b63a94.jpg"
        },
        {
            "id": 74,
            "url": "http://localhost:8089/img/84872img32.jpg",
            "name": "84872img32.jpg"
        }
    ]
}
```

### 照片墙

获取所有图片：`/wall/getall/wall?pagenum=_&size=_`

返回示例
```json
{
    "code": 0,
    "msg": "获取成功",
    "data": [
        {
            "id": 23,
            "url": "http://localhost:8089/wall/761019e16f8029e25a04abf7c8402c8367d5.jpg",
            "name": "761019e16f8029e25a04abf7c8402c8367d5.jpg"
        },
        {
            "id": 22,
            "url": "http://localhost:8089/wall/4375223e0deb2d8f3b4cbc930330167d66ecb.jpg",
            "name": "4375223e0deb2d8f3b4cbc930330167d66ecb.jpg"
        },
        {
            "id": 21,
            "url": "http://localhost:8089/wall/9433579c7d420e88e23d5435fcad89fa4664e.jpg",
            "name": "9433579c7d420e88e23d5435fcad89fa4664e.jpg"
        }
    ]
}
```

获取所有图片数量：`/wall/getwall/num`

返回示例
```json
{
    "code": 0,
    "msg": "获取成功",
    "data": [
        {
            "total": 23
        }
    ]
}
```

新增接口：文章点赞和浏览量 `article/update/id?love=_&visited=_&id=_`