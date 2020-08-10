<template>
  <div>
    <el-card class="box-card">
      <div class="example">
        <el-upload
          class="upload-demo2"
          :show-file-list="false"
          drag
          :action="uploadURL"
          :headers="header"
          :on-success="handleSuccess"
          multiple
        >
          <!-- <i class="el-icon-upload"></i> -->
          <el-button class="btn2" icon="el-icon-search" circle></el-button>
          <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
        <div :visible.sync="videoUploadTag">
          <el-dialog
            width="50%"
            id="video_upload"
            style="margin-top: 1px"
            title="视频上传"
            :visible.sync="videoUploadTag"
            append-to-body
          >
            <el-tabs v-model="activeName" value="0">
              <el-tab-pane label="添加视频链接" name="first">
                <el-input v-model="videoLink" placeholder="请输入视频链接" clearable></el-input>
                <el-button
                  type="primary"
                  size="small"
                  plain
                  style="margin: 20px 0px 10px 0px "
                  @click="addVideoLink()"
                >添加</el-button>
              </el-tab-pane>
            </el-tabs>
          </el-dialog>
        </div>
        <quill-editor
          class="editor"
          ref="myTextEditor"
          :content="content"
          :options="editorOption"
        />
        <!-- <div class="output code">
          <code class="hljs" v-if="contentCode" v-html="contentCode"></code>
        </div>-->
        <!-- <form action method="post" enctype="multipart/form-data" id="uploadFormMulti">
          <input
            style="display: none"
            :id="uniqueId"
            type="file"
            name="file"
            multiple
            accept="image/jpg, image/jpeg, image/png, image/gif"
            @change="uploadImg('uploadFormMulti')"
          />
        </form>-->
        <!-- <div class="output ql-snow">
          <div class="ql-editor" v-html="content"></div>
        </div>-->
      </div>
      <el-button type="primary" plain @click="complete">完成</el-button>
      <el-button type="primary" plain @click="reset" style="margin-left: 16px;">清空</el-button>
      <!-- <el-button type="primary" plain @click="dialogVisible = true">上传封面</el-button>
      <el-button type="primary" plain @click="addTitle">添加标题</el-button>
      <el-button type="primary" plain @click="addText">添加简介</el-button>-->
      <el-button @click="drawer = true" type="primary" plain style="margin-left: 16px;">完善文章信息</el-button>
    </el-card>

    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" :append-to-body="true">
      <div class="draw">
        <div>文章标题</div>
        <el-input class="input" v-model="title" placeholder="请输入文章标题"></el-input>
        <div>文章简介</div>
        <el-input class="input" type="textarea" :rows="5" placeholder="请输入文章简介" v-model="text"></el-input>
        <div class="wenzi">上传文章封面</div>
        <span v-if="tmp">
          <el-upload
            class="upload-demo"
            drag
            :action="uploadURL"
            :headers="header"
            :on-success="handleAvatarSuccess"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              拖拽或
              <em>点击上传</em>
            </div>
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
          <!-- <el-button type="primary" plain @click="tmp = !tmp">变成图片</el-button> -->
        </span>
        <span v-else>
          <img class="img" :src="file.url" alt />
          <!-- <el-button type="primary" plain @click="tmp = !tmp">变成图片</el-button> -->
        </span>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import dedent from "dedent";
import hljs from "highlight.js";
import debounce from "lodash/debounce";
// import "highlight.js/styles/tomorrow.css";
import "highlight.js/styles/atom-one-dark.css";

const toolbarOptions = [
  ["bold", "italic"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["clean"],
  ["link", "image", "video"],
];
export default {
  name: "Editor",
  data() {
    var self2 = this;
    return {
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function (value) {
                if (value) {
                  document.querySelector(".upload-demo2 .btn2").click();
                } else {
                  this.quill.format("image", false);
                }
              },
              video: function (value) {
                self2.videoUploadTag = true;
              },
            },
          },
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
      },
      content: this.article.content,
      dialogVisible: false,
      imageUrl: "",
      tmp: true,
      uploadURL: "xxx",
      drawer: false,
      title: this.article.title,
      text: this.article.text,
      file: {
          name: this.article.name,
          url:this.article.url
      },
      uniqueId: "uniqueId",
      videoUploadTag: false,
      activeName: "first",
      videoLink: "",
    };
  },
  props:{
      article: Object
  },
  methods: {
    async add() {
      console.log(this.contentCode);
      // const res = await this.$http.get('user/info')
      // console.log(res)
    },
    onEditorChange: debounce(function (value) {
      this.content = value.html;
    }, 466),
    async complete() {
      if (this.content === "") {
        this.$message.warning("请输入内容");
        return;
      }
      //时间
      let time = this.$moment().format("YYYY-MM-DD HH:mm");

      let tmp = {
        title: this.title,
        text: this.text,
        url: this.file.url,
        name: this.file.name,
        content: this.conetnt,
        date: time,
        visited: 0,
        love: 0,
      };
      // this.uploadAll = tmp
      const res = await this.$http.post("/article/add/article", tmp);
      console.log(time);
      console.log(tmp);
      this.$message.success("文章已被添加");
      this.content = "";
      this.title = "";
      this.text = "";
      this.file = {};
      this.tmp = true;
    },
    reset() {
      this.content = "";
      this.title = "";
      this.text = "";
      this.file = {};
      this.tmp = true;
      this.$message.success("已清空");
    },
    handleAvatarSuccess(res, file) {
      const { code, msg, data } = res;
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
        this.tmp = false;
        let tmplist = {
          name: data.name,
          url: data.url,
        };
        console.log(tmplist);
        this.file = tmplist;
        // console.log(this.contentCode);
      }

      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleSuccess(res, file) {
      const { code, msg, data } = res;
      // 获取富文本组件实例
      let quill = this.$refs.myTextEditor.quill;
      // 如果上传成功
      if (data.url) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, "image", data.url);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        // 提示信息，需引入Message
        this.$message.error("图片插入失败");
      }
    },
    addVideoLink() {
      if (this.videoLink.length == 0) {
        this.$message.info("请输入视频链接");
        return;
      }
      //当编辑器中没有输入文本时，这里获取到的 range 为 null
      var range = this.$refs.myTextEditor.quill.getSelection();
      //视频插入在富文本中的位置
      var index = 0;
      if (range == null) {
        index = 0;
      } else {
        index = range.index;
      }
      //隐藏弹框
      this.videoUploadTag = false;
      //将视频链接插入到当前的富文本当中
      this.$refs.myTextEditor.quill.insertEmbed(index, "video", this.videoLink);
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    },
    header() {
      return {
        Authorization: "Bearer " + window.sessionStorage.getItem("token"),
      };
    },
  },
  mounted() {
    console.log("this is Quill instance:", this.editor);
  },
};
</script>

<style scoped>
.el-button {
  position: relative;
  top: 10px;
}
.el-button--primary.is-plain {
  color: #fe91ca;
  border-color: #fe91c9d7;
}
.el-button--primary.is-plain:focus {
  background-color: #ffe0f7;
  border-color: #fe91c9d7;
  color: #fe91ca;
}
.el-button--primary.is-plain:hover {
  background-color: #ffe0f7;
  border-color: #fe91c9d7;
  color: #fe91ca;
}
.el-input__inner:focus {
  border-color: #fe91ca;
}
.img {
  width: 100%;
}
.draw {
  padding: 20px;
}
.input {
  margin-top: 10px;
  margin-bottom: 20px;
}
.wenzi {
  margin-bottom: 10px;
}
.upload-demo2 {
  display: none;
}
.yulan{
  background-color: rgba(250, 57, 57, 0);
  height: 100%;
  width: 100%;
  padding: 10px;
  overflow: auto;
}
.ql-editor{
  /* height: 100%;
  width: 100%;
  padding: 10px; */
  max-height: 550px;
}
/* .upload-demo{
  width: 100%;
} */
</style>