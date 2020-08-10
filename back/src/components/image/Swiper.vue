<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图片管理</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-upload
        class="upload-demo"
        :headers="header"
        :action="uploadURL"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-success="onSuccess"
        :on-error="onError"
        list-type="picture"
        :disabled="len"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-button size="small" type="primary">点击上传</el-button>
            </div>
          </el-col>
          <el-col :span="10" :offset="0">
            <div class="grid-content bg-purple">
              <el-alert center title="温馨提示：轮播图最多4张 :)" type="success" :closable="false"></el-alert>
            </div>
          </el-col>
          <!-- <el-col :span="4">
            
          </el-col>-->
        </el-row>
      </el-upload>
      <el-switch
        style="display: block;color:'red'"
        v-model="value"
        active-color="#efbbcf"
        inactive-color="#f09ae9"
        active-text="点击查看"
        inactive-text="点击删除"
        @change="change"
      ></el-switch>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      uploadlist: [],
      uploadURL: "xxx",
      len: false,
      value: true,
    };
  },
  async mounted() {
    let { data: res } = await this.$http.get("/img/getall/swiper");
    // console.log(res);
    this.fileList = res.data || [];
    this.uploadlist = res.data || [];
  },
  computed: {
    header() {
      return {
        Authorization: "Bearer " + window.sessionStorage.getItem("token"),
      };
    },
  },
  watch: {
    uploadlist: function () {
      this.len = this.uploadlist.length >= 4 ? true : false;
    },
  },
  methods: {
    async handleRemove(file, fileList) {
      console.log(file, fileList);
       const res = await this.$http.get("/img/delete/swiper?id=" + file.id);
       this.$message.success("删除成功")
    },
    async handlePreview(file) {
      if (this.value) {
        // this.$message("处于查看状态");
        // console.log(file)
        window.open(file.url, "_blank");
      } else {
        if(file.id === undefined){
          this.$message.error("删除失败，试试点击右上角叉号或刷新")
        }
        const res = await this.$http.get("/img/delete/swiper?id=" + file.id);
        this.$message.success("删除成功")
        // console.log(res)
        // let { data: res2 } = await this.$http.get("/img/getall/swiper");
        // this.fileList = res2.data;
        let index = (this.fileList||[]).findIndex((index) => index.id === file.id)
        // console.log('-----------------------')
        // console.log(index)
        this.fileList.splice(index,1);
        this.fileList = this.fileList
        // this.uploadlist = res2.data;
      }
    },
    async onSuccess(response, file) {
      console.log("onSuccess", response, file);
      const { code, msg, data } = response;
      //   console.log({ code, msg, data });
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
        console.log(data.name);
        console.log("-----------------------");
        console.log(data.url);
        let tmplist = {
          name: data.name,
          url: data.url,
        };
        // this.uploadlist.push(tmplist)

        // console.log(this.uploadlist)
        const res = await this.$http.post("/img/add/swiper", tmplist);
        // let { data: res2 } = await this.$http.get("/img/getall/swiper");
        // this.fileList = res2.data;
        this.fileList.push(tmplist)
        this.uploadlist = this.fileList
        // console.log(res)
        // console.log(code)
        // console.log(msg)
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
.el-button--primary {
  color: #fff;
  border-color: #fe91c9d7;
  background-color: #fe91ca;
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
.el-button--primary:visited {
  background-color: #fff;
}
.el-alert {
  width: 300px;
  text-align: center;
}
.el-card {
  position: relative;
}
.el-switch {
  width: 500px;
  position: absolute;
  top: 20px;
  right: -50px;
}
.el-switch__label.is-active {
  color: #f09ae9;
}
</style>