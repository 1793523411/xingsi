<template>
  <div>
    <div class="top"></div>
      <el-card class="box-card">
        <h1>{{article.title}}</h1>
        <br />
        <hr />
        <div class="output ql-snow">
          <div class="ql-editor" v-html="article.content"></div>
        </div>
        <div class="art2">
          <div class="footer">
            <div @click.prevent="lovechange(article.id,article.love,article.visited)" style="cursor: pointer;">
              <i
                class="fa fa-heart"
                :style="{color:love[article.id] == undefined?'black':'red'}"
                aria-hidden="true"
              ></i>
              点赞: {{article.love}}
            </div>
            <div>
              <i class="fa fa-eye" aria-hidden="true"></i>
              浏览量: {{article.visited}}
            </div>
            <div>
              <i class="fa fa-user" aria-hidden="true"></i> 作者: 杨国杰
            </div>
            <div>
              <i class="fa fa-clock-o" aria-hidden="true"></i>
              日期: {{article.date}}
            </div>
          </div>
        </div>
      </el-card>
  </div>
</template>

<script>
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
export default {
  data() {
    return {
      article: {},
      love: {},
    };
  },
  methods: {
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
    async visited() {
      await this.$http.get(
        `/article/update/id?love=${this.article.love}&visited=${
          this.article.visited + 1
        }&id=${this.article.id}`
      );
    },
  },
  async mounted() {
    let id = this.$route.params.id;
    await this.$http.get("/article/getone/id?id=" + id).then((res) => {
      // console.log(res)
      this.article = res.data.data[0];
      console.log(this.article);
      this.love = window.sessionStorage;
      this.visited();
    });

    console.log(id);
  },
};
</script>

<style scoped>
.box-card {
  width: 1200px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);
  margin: 15px;
}

.footer {
  height: 15px;
  background-color: rgba(226, 35, 35, 0);
  display: flex;
  /* padding-top: 10px; */
}
.footer > div:nth-child(1) {
  margin-right: 30px;
  margin-left: 25px;
}
.footer > div:nth-child(2) {
  margin-right: 30px;
}
.footer > div:nth-child(3) {
  margin-right: 60px;
}
.top {
  height: 60px;
}
</style>