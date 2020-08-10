<template>
  <div class="main">
    <div class="top"></div>
    <el-carousel :interval="4000" type="card" :height="imgHeight+'px'">
      <el-carousel-item v-for="item in imgList" :key="item.id" class="swiper">
        <img style="width:100%;" :src="item.url" alt="行思工作室" />
      </el-carousel-item>
    </el-carousel>

    <div>
      <el-card class="box-card" v-for="item in articleList" :key="item.id">
        <router-link :to="{path:'/article/'+ item.id}">
          <div class="art">
            <div class="artimg">
              <img class="artimg2" :src="item.url" alt />
            </div>
            <div class="art2">
              <h2>{{item.title}}</h2>
              <div class="text">{{item.text}}</div>
              <div class="footer">
                <div @click.prevent="lovechange(item.id,item.love,item.visited)">
                  <i
                    class="fa fa-heart"
                    :style="{color:love[item.id] == undefined?'black':'red'}"
                    aria-hidden="true"
                  ></i>
                  点赞: {{item.love}}
                </div>
                <div>
                  <i class="fa fa-eye" aria-hidden="true"></i>
                  浏览量: {{item.visited}}
                </div>
                <div>
                  <i class="fa fa-user" aria-hidden="true"></i> 作者: 杨国杰
                </div>
                <div>
                  <i class="fa fa-clock-o" aria-hidden="true"></i>
                  日期: {{item.date}}
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </el-card>
      <el-card class="box-card2">
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-size="queryInfo.size"
            layout="total,prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-card>
    </div>

    <div class="wall">
      <div class="image-wall" v-for="item in imgWall" :key="item.id">
        <el-image
          style="width: 280px; height: 150px;border-radius: 10%;"
          :src="item.url"
          fit="cover"
          :preview-src-list="srcList"
        ></el-image>
      </div>
    </div>
    <el-backtop target=".top" :visibility-height="200" :right="40" :bottom="40">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >UP</div>
    </el-backtop>
  </div>
</template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: [],
      imgHeight: 0,
      articleList: [],
      queryInfo: {
        pagenum: 1,
        size: 8,
      },
      total: 30,
      love: {},
      imgWall: [],
      page: 1,
      scollY: 0,
      pageTotal: 2,
      pullRefreshss: true,
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      srcList: [],
    };
  },
  methods: {
    imgLoad() {
      this.$nextTick(function () {
        // console.log("111111");
        this.imgHeight = (document.body.clientWidth * 1) / 5;
      });
    },
    async getImgUrl() {
      await this.$http
        .get("/swiper/getall/swiper")
        .then((res) => {
          this.imgList = res.data.data;
          // console.log(res.data.data);
          this.imgLoad();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getArticle() {
      console.log("article");
      await this.$http
        .get(
          "/article/getall/article?pagenum=" +
            this.queryInfo.pagenum +
            "&size=" +
            this.queryInfo.size
        )
        .then((res) => {
          // console.log(res);
          this.articleList = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCurrentChange(newPage) {
      console.log(`处于第${newPage}页`);
      this.queryInfo.pagenum = newPage;
      this.getArticle();
      this.$nextTick(function () {
        // console.log("111111");
        window.scrollTo(0, this.imgHeight + 88);
      });
    },
    async lovechange(id, love, visited) {
      if (this.love[id] === undefined) {
        console.log("1111");
        console.log(id);
        console.log(love);
        console.log(visited);
        // await this.$http.get("/article/update/id?love="+love+"&visited="+visited+"&id="+id);
        await this.$http
          .get(
            `/article/update/id?love=${love + 1}&visited=${visited}&id=${id}`
          )
          .then((res) => {
            console.log(res);
            window.sessionStorage.setItem(id, "true");
            this.love = window.sessionStorage;
            console.log(this.love);
            this.$mount();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getScrollTop: function () {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    },
    //浏览器视口的高度
    getScrollHeight: function () {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    },
    //浏览器视口的高度
    getWindowHeight: function () {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    },
    pullRefresh: function () {
      var _this = this;
      window.onscroll = function () {
        _this.scrollChange();
      };
    },
    async scrollChange() {
      var _this = this,
        currentPage = { page: this.page };
      this.scollY =
        this.getScrollTop() + this.getWindowHeight() - this.getScrollHeight();
      // 把下拉刷新置为false，防止多次请求
      if (this.scollY >= -50) {
        if (this.page > this.pageTotal) {
          return false;
        }
        if (!this.pullRefreshss) {
          return false;
        }
        // 模拟ajax请求
        console.log(_this.page);
        console.log("发起请求");

        _this.pullRefreshss = false;
        // 加页码数
        this.page++;
        await _this.$http
          .get(`/wall/getall/wall?pagenum=${this.page}&size=${8}`)
          .then((res) => {
            this.imgWall = [...this.imgWall, ...res.data.data];
            res.data.data.map((item) => {
              this.srcList.push(item.url);
            });
            console.log("+++++");
            console.log(this.srcList);
            // _this.imgWall.push([...res.data.data]);
            console.log(_this.imgWall);
          });
      } else {
        // 其他时候把下拉刷新置为true
        _this.pullRefreshss = true;
      }
    },
  },
  async mounted() {
    this.getImgUrl();
    window.addEventListener("resize", () => {
      this.imgHeight = (document.body.clientWidth * 1) / 5;
    });
    this.getArticle();
    const { data: res } = await this.$http.get("/article/getarticle/num");
    this.total = res.data[0].total;
    this.love = window.sessionStorage;
    await this.$http
      .get(`/wall/getall/wall?pagenum=${1}&size=${8}`)
      .then((res) => {
        this.imgWall = res.data.data;
        res.data.data.map((item) => {
          this.srcList.push(item.url);
        });
        console.log(this.imgWall);
      });
    await this.$http.get("/wall/getwall/num").then((res) => {
      // console.log(Math.floor(res.data.data[0].total / 8));
      this.pageTotal = Math.floor(res.data.data[0].total / 8) - 1;
    });
    window.onscroll = this.pullRefresh;
  },
};
</script>

<style scoped>
.main {
  /* height: 1000px; */
}
.top {
  height: 60px;
}
.swiper {
  border-radius: 3%;
  box-shadow: 1px 1px 10px #ecfbfc;
  /* margin-top: 60px; */
}
.box-card {
  width: 1200px;
}
.art {
  display: flex;
  align-items: center;
}
.artimg {
  height: 160px;
  width: 200px;
  /* width: 1000%; */
  background-color: #ecfbfc;
  border-radius: 10%;
  overflow: hidden;
  /* flex: 1; */
}
.artimg2 {
  height: 100%;
}
.art2 {
  /* flex: 3; */
  height: 160px;
  margin-left: 20px;
  width: 930px;
  background: rgba(26, 206, 238, 0);
  padding: 10px;
  box-sizing: border-box;
}
.text {
  margin-top: 20px;
  font-size: 15px;
  height: 80px;
  margin-bottom: 5px;
  background-color: rgba(219, 231, 47, 0);
}
.footer {
  height: 15px;
  background-color: rgba(226, 35, 35, 0);
  display: flex;
  padding-top: 10px;
}
.footer > div:nth-child(1) {
  margin-right: 30px;
}
.footer > div:nth-child(2) {
  margin-right: 30px;
}
.footer > div:nth-child(3) {
  margin-right: 60px;
}
.block {
  /* margin-top: 10px; */
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
}
.el-card {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);
  margin: 15px;
  height: 200px;
}
.box-card2 {
  margin-top: -5px;
  margin-bottom: 5px;
  width: 1200px;
  height: 60px;
}
.wall {
  position: relative;
  background-color: rgba(243, 44, 44, 0);
  left: 50%;
  transform: translate(-50%, 0%);
  margin: 15px;
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
}
.image-wall {
  margin: 10px;
  border-radius: 10%;
}
.whole {
  height: 90vh; /*height可以根据你要创建的页面进行修改*/
  width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>

<style>
.el-carousel__indicator.is-active button {
  background-color: #00a7ccd2;
}
.el-image-viewer__close {
  color: #fff;
}
</style>