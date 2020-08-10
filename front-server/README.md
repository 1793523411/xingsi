Url: xxx

## 文章

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

## 轮播图

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

## 照片墙

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