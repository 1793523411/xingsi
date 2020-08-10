<template>
  <div class="home">
    <div class="header">
      <span class="logo" @click="xingsi">
        <img src="~@/assets/logo.png" alt />
      </span>
      <div class="head-text">
        <div>
          <router-link :to="{path:'/main'} " active-class="active">行思首页</router-link>
        </div>
        <div>
          <router-link :to="{path:'/about'} " active-class="active">行思简介</router-link>
        </div>
        <div>
          <router-link :to="{path:'/history'}" active-class="active">行思历史</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div class="footer">
      <div class="ban">大学生网络工作室<br>Copyright © 2020 云鹏鹏 Powered by vue+Element-ui
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  methods: {
    xingsi() {
      window.open(
        "https://baike.baidu.com/item/%E8%A1%8C%E6%80%9D%E5%B7%A5%E4%BD%9C%E5%AE%A4/2831695?fr=aladdin",
        "_blank"
      );
    },
  },
};
</script>

<style scoped>
.header {
  position: fixed;
  margin-bottom: 60px;
  width: 100%;
  height: 60px;
  background-color: #b3c0d1;
  display: flex;
  z-index: 99;
}
.header .logo img {
  margin-left: 30px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  /* z-index: 99; */
}
.head-text {
  height: 60px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 1200px;
  background-color: rgba(245, 77, 77, 0);
}
.head-text > div {
  display: block;
  margin: 100px;
}
.footer {
  width: 100%;
  height: 50px;
  background-color: rgba(231, 84, 224, 0);
}
.ban {
  height: 50px;
  background-color: rgba(218, 75, 75, 0);
  width: 700px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  color: #000;
  text-align: center;
  line-height: 23px;
  font-size: 10px;
}
</style>
