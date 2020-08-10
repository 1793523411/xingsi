<template>
  <div>
    <div class="top"></div>
    <div class="about">
      <el-container>
        <el-header>
          <h1>设计组</h1>
        </el-header>
        <el-main>
          <p>分为两个方向：前端和PS。前端包括HTML，CSS，JavaScript等，做好网页开发及布局和色彩搭配；ps方向主要采用photoshop，以Ai，Ae为辅助，设计海报，宣传资料。以有限的技术呈现视觉美感，展现自己的想法，表达出内涵。</p>
        </el-main>
      </el-container>
      <el-container>
        <el-header>
          <h1>程序组</h1>
        </el-header>
        <el-main>
          <p>在程序组里，你可以学习到java,go,php等后端语言，你也可以学习html,css,javascript,vue.js,react.js,node.js等前端技术，或者你也可以学习微信小程序，微信公众号的开发，还有还有游戏开发等你哦。</p>
        </el-main>
      </el-container>
      <el-container>
        <el-header>
          <h1>视创组</h1>
        </el-header>
        <el-main>
          <p>视创组以adobe系列pr为主，活用AE,Flash,Au等软件去打造视频，同时致力于以兴趣开发为根基的视频创作，用简单的技术做当初令自己心动的视频类型。</p>
        </el-main>
      </el-container>
      <el-container>
        <el-header>
          <h1>文案组</h1>
        </el-header>
        <el-main>
          <p>
            当你在茫茫的小组中多瞅了我一眼~并决定点进来了解的这一刻！
            很荣幸！你我的缘分就此开启
            这是一个拥有无限激情和梦想的团队！
            想神马有神马
            在这里，我们不玩套路，玩的是“创意”！
            简单的线条、图形组合出复杂的图案，每张幻灯片的排版和动画中的每一个灵光一现都是不可复制的~
            承办的特色活动校园ppt设计大赛了解一下
            让你在办公方面行云流水
          </p>
        </el-main>
      </el-container>
      <el-container>
        <el-header>
          <h1>运营组</h1>
        </el-header>
        <el-main>
          <p>
            负责工作室微信、微博的日常运营，主要负责运营粉丝量8000+的微信公众号”嗖HPU”，进行文章推送。并配合工作室进行日常活动宣传。
            通过学习，成员可以熟练进行图文排版，运营微信公众众号
          </p>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.about {
  position: relative;
  background-color: rgba(243, 44, 44, 0);
  left: 50%;
  transform: translate(-50%, 0%);
  margin: 15px;
  width: 1200px;
  /* display: flex; */
  flex-wrap: wrap;
}
.el-container {
  margin: 10px;
  padding: 10px;
}
.el-header {
  background-color: #b3c0d17a;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef300;
  color: #333;
  text-align: center;
  line-height: 30px;
}
.top {
  height: 60px;
}
</style>
