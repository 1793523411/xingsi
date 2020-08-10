<template>
  <el-container class="home-container">
    <el-header>
      <!--头部-->
      <div class="header">
        <img
          src="https://wx-xly-1301545895.cos.ap-beijing.myqcloud.com/wx-image/u%3D4032763602%2C621091811%26fm%3D26%26gp%3D0.jpg"
        />
        <span>后台管理系统</span>
        <el-dropdown size="mini" @command="handleCommand">
          <img
            src="https://wx-xly-1301545895.cos.ap-beijing.myqcloud.com/wx-image/u%3D263203157%2C1436059132%26fm%3D26%26gp%3D0.jpg"
          />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">
              <i class="fa fa-smile-o" aria-hidden="true"></i>退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <!--左边-->
      <el-aside ref="side" :width="isCollapse ? '64px' : '200px'">
        <div class="ctrl" @click="changeWidth(isCollapse)">
          <i
            :class="[{fa:true},{'fa-angle-double-left':!isCollapse},{'fa-angle-double-right':isCollapse}]"
            aria-hidden="true"
          ></i>
        </div>
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;"></el-radio-group> -->
        <el-menu
          default-active
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          unique-opened
          :collapse="isCollapse"
          active-text-color="#f3d1f4"
          :default-active="activePath"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">文章管理</span>
            </template>
            <el-menu-item index="/editor" @click="saveNavState('/' + 'editor')">
              <template slot="title">
                <i :class="[{'el-icon-edit':true},{'fa-spin':activePath=='/editor'}]"></i>
                <span>添加文章</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/article" @click="saveNavState('/' + 'article')">
              <template slot="title">
                <i :class="[{'el-icon-reading':true},{'fa-spin':activePath=='/article'}]"></i>
                <span>文章列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-wallet"></i>
              <span slot="title">图片管理</span>
            </template>
            <el-menu-item index="/swiper" @click="saveNavState('/' + 'swiper')">
              <template slot="title">
                <i :class="[{'el-icon-picture-outline':true},{'fa-spin':activePath=='/swiper'}]"></i>
                <span>轮播图</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/wall" @click="saveNavState('/' + 'wall')">
              <template slot="title">
                <i :class="[{'el-icon-s-operation':true},{'fa-spin':activePath=='/wall'}]"></i>
                <span>图片墙</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--中间-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      //   num:3000
      activePath: "welcome",
    };
  },
  mounted() {
    // // this.activePath = ''
    // this.activePath = window.sessionStorage.getItem("activePath");
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    handleCommand(command) {
      this.$router.push("/");
       window.sessionStorage.removeItem("activePath")
      this.$message.warning("你已退出，请重新登录");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeWidth(val) {
      this.isCollapse = !val;
      // if(!val){
      //     console.log(this.$refs.side.width)
      //     this.$refs.side.width = "64px"
      // }else{
      //     this.$refs.side.width = "200px"
      // }
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style>
.home-container {
  height: 100%;
  background-color: #ffc1fa;
  overflow: hidden;
}
.el-header {
  background-color: #faf0af;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #8bcdcd;
  font-size: 25px;
}
.el-header > div {
  display: flex;
  align-items: center;
}
.el-header > div > img {
  max-width: 60px;
  border-radius: 50%;
}
.el-header > div > span {
  margin-left: 30px;
}

.el-dropdown {
  vertical-align: top;
  position: absolute;
  right: 20px;
}
.el-dropdown > img {
  width: 40px;
  border-radius: 50%;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-aside {
  background-color: #f09ae9;
  overflow: hidden;
  transition: width 0.65s;
  box-shadow: 1px 5px 10px #f09ae9 !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
  background-color: #f09ae9;
  border: none;
}
.ctrl {
  width: 100%;
  height: 25px;
  background-color: #dbc6eb;
  text-align: center;
  line-height: 25px;
  cursor: pointer;
}
.el-submenu {
  background-color: #ffd3e1;
  border: none;
  /* transition: width .3s; */
}
.el-menu-item {
  background-color: #ffe0f7;
  border: none;
}
.el-menu-item.is-active {
  background-color: #f1cee9;
  color: #fff !important;
  border: none;
}
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
  color: #f09ae9;
  background-color: #ffd3e169;
}
</style>