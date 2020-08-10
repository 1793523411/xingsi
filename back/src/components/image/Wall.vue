<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图片管理</el-breadcrumb-item>
      <el-breadcrumb-item>图片墙</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="6" v-for="item in imglist1" :key="item.id">
        <div class="con">
          <el-image class="img" :src="item.url" @click="openimg(item.url,item.id)"></el-image>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="top">
      <el-col :span="6" v-for="item in imglist2" :key="item.id">
        <div class="con">
          <el-image class="img" :src="item.url" @click="openimg(item.url,item.id)"></el-image>
        </div>
      </el-col>
    </el-row>

    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.size"
        layout="total,prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <el-upload
        ref="upload"
        class="upload-demo"
        :headers="header"
        :action="uploadURL"
        :on-success="onSuccess"
        :on-error="onError"
        :file-list="fileList"
      >
        <el-button size="small" type="primary" @click="test">点击上传</el-button>
      </el-upload>
      <el-switch
        style="display: block;padding-left:30px;padding-top:5px"
        v-model="value"
        active-color="#efbbcf"
        inactive-color="#f09ae9"
        active-text="点击查看"
        inactive-text="点击删除"
        @change="change"
      ></el-switch>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadURL: "xxx",
      queryInfo: {
        pagenum: 1,
        size: 8,
      },
      total: 0,
      imglist1: [],
      imglist2: [],
      fileList: [],
      value: true,
    };
  },
  async mounted() {
    const { data: res } = await this.$http.get("/img/getwall/num");
    this.total = res.data[0].total;
    this.getGoodsList();
  },
  computed: {
    header() {
      return {
        Authorization: "Bearer " + window.sessionStorage.getItem("token"),
      };
    },
  },
  methods: {
    handleCurrentChange(newPage) {
      console.log(`处于第${newPage}页`);
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },
    async getGoodsList() {
      const { data: res } = await this.$http.get("/img/getall/wall", {
        params: this.queryInfo,
      });
      console.log(res);
      this.imglist1 = res.data.slice(0, 4);
      this.imglist2 = res.data.slice(4, 8);
    },
    test() {
      this.$refs.upload.clearFiles();
    },
    async onSuccess(response, file) {
      // this.$message.success("上传成功");
      const { code, msg, data } = response;
      if (code !== 0) {
        this.$message({
          message: (msg && `上传失败，失败原因：${msg}`) || "上传失败",
          type: "error",
        });
        this.$emit("onError", data);
      } else {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.$emit("onSuccess", data.url);
        let tmplist = {
          name: data.name,
          url: data.url,
        };
        const res = await this.$http.post("/img/add/wall", tmplist);
        const { data: res2 } = await this.$http.get("/img/getwall/num");
        this.total = res2.data[0].total;
        this.getGoodsList();
        setTimeout(() => {
          this.fileList = [];
        }, 2000);
      }
    },
    onError(err) {
      const errMsg = (err.message && JSON.parse(err.message)) || "上传失败";
      this.$message({
        message:
          (errMsg.msg && `上传失败，失败原因：${errMsg.msg}`) || "上传失败",
        type: "error",
      });
      this.$emit("onError", err);
    },
    async openimg(url,id) {
      if(this.value){
        window.open(url, "_blank");
      }else{
        console.log(id)
        const res = await this.$http.get("/img/delete/wall?id=" + id);
        const { data: res2 } = await this.$http.get("/img/getwall/num");
        this.total = res2.data[0].total;
        setTimeout(() => {
        this.$message.success("删除成功")
        }, 2000);

        this.getGoodsList();
      }
      
    },
    change() {
      if (this.value) {
        this.$message("处于查看状态");
      } else {
        this.$message.warning("处于删除状态");
      }
    },
  },
};
</script>

<style scoped>
.hidden {
  overflow: hidden;
  width: 100%;
  height: 550px;
  background-color: rgb(172, 80, 80);
  bottom: 10px;
  display: flex;
  flex-flow: row wrap;
}
.top {
  margin-top: 50px;
}
.con {
  display: inline-block;
  margin: 10px;
  padding: 0;
  width: 200px;
  height: 100px;
}
.img {
  width: 100%;
  padding: 10px;
  box-shadow: 2px 2px 10px #f09ae9;

  /* align-items: center; */
}
.img:hover {
  cursor: pointer;
  transform: translate(0, -5px) scale(1.1);
  transition: all 0.5s;
}
.block {
  margin-top: 100px;
}
.el-pager li.active {
  color: #fd87c4;
}
.el-pager li:hover {
  color: #fd87c4;
}
.block {
  display: flex;
}
.el-upload-list__item.is-success .el-upload-list__item-name:focus,
.el-upload-list__item.is-success .el-upload-list__item-name:hover {
  color: #efa8e4;
}
/* .el-upload-list__item-name {
  padding-left: 93px;
  margin-top: -37px;
}
.el-upload-list__item-name:hover {
  background-color: rgba(255, 255, 255, 0);
} */
.el-button--primary {
  color: #fff;
  border-color: #fe91c9d7;
  background-color: #fe91ca;
  z-index: 99;
}
/* .el-button--primary.is-plain{
   
} */
.el-button--primary:focus {
  background-color: #ffe0f7;
  border-color: #fe91c9d7;
  color: #fd87c4;
}
.el-button--primary:hover {
  background-color: #ffe0f7;
  border-color: #fe91c9d7;
  color: #fe91ca;
}
</style>