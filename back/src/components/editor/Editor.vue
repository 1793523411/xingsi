<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>

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
          :value="content"
          :options="editorOption"
          @change="onEditorChange"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
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
      <el-button @click="drawer2 = true" type="primary" plain style="margin-left: 16px;">预览</el-button>
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
        <el-button type="primary" plain @click="clearImg">更改图片</el-button>
      </div>
    </el-drawer>
    <el-drawer title="我是标题" :visible.sync="drawer2" :with-header="false" size="60%">
      <!-- <div class="output ql-snow" style="height:100%">
          <div class="ql-editor" v-html="content"></div>
      </div>-->
      <div class="yulan">
        <div class="ql-editor" v-html="content"></div>
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
                this.quill.format("video", false);
                self2.videoUploadTag = true;
              },
            },
          },
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
      },
      content: dedent``,
      dialogVisible: false,
      imageUrl: "",
      tmp: true,
      uploadURL: "xxx",
      drawer: false,
      drawer2: false,
      title: "",
      text: "",
      file: {},
      uniqueId: "uniqueId",
      videoUploadTag: false,
      activeName: "first",
      videoLink: "",
    };
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
    clearImg() {
      this.file.url = "";
      this.tmp = true;
    },
    onEditorBlur(editor) {
      //   console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      //   console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      //   console.log("editor ready!", editor);
    },
    async complete() {
      if (this.content === "") {
        this.$message.warning("请输入内容");
        return;
      }
      //时间
      let time = this.$moment().format("YYYY-MM-DD HH:mm");

      // console.log(this.content)
      // console.log(this.contentCode)

      let tmp = {
        title: this.title,
        text: this.text,
        url: this.file.url,
        name: this.file.name,
        content: this.content,
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
      // this.$refs.myTextEditor
      // console.log(this.$refs.myTextEditor.quill);
      // console.log(this.content);
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
    // uploadImg: async function () {
    //   var _this = this;
    //   //构造formData对象
    //   var formData = new FormData();
    //   formData.append("file", document.getElementById(_this.uniqueId).files[0]);

    //   try {
    //     //调用上传文件接口
    //     this.$http.productapi.uploadImgReq(formData).then((res) => {
    //       //返回上传文件的地址
    //       let url = res;
    //       if (url != null && url.length > 0) {
    //         let Range = _this.editor.getSelection();
    //         url = url.indexOf("http") != -1 ? url : "http:" + url;
    //         //上传文件成功之后在富文本中回显(显示)
    //         _this.editor.insertEmbed(
    //           Range != null ? Range.index : 0,
    //           "image",
    //           url
    //         );
    //       } else {
    //         _this.$message.warning("图片上传失败");
    //       }
    //       //成功之后,将文件的文本框的value置空
    //       document.getElementById(_this.uniqueId).value = "";
    //     });
    //   } catch ({ message: msg }) {
    //     document.getElementById(_this.uniqueId).value = "";
    //     _this.$message.warning(msg);
    //   }
    // },
    handleSuccess(res, file) {
      const { code, msg, data } = res;
      // 获取富文本组件实例
      let quill = this.$refs.myTextEditor.quill;
      // 如果上传成功
      if (data.url) {
        // 获取光标所在位置
        console.log(quill.getSelection());
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
      let quill = this.$refs.myTextEditor.quill;
      let range = quill.getSelection();

      // var range = this.$refs.myTextEditor.quill.getSelection();
      console.log(range);
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
    // addVideoCodeLink() {
    //   console.log("输入的内容");
    //   ///这里的 videoCodeLink 是绑定的输入框内的变量
    //   if (this.videoCodeLink.length === 0) {
    //     alert("请输入视频链接");
    //     return;
    //   } else {
    //     console.log(this.videoCodeLink);
    //   }
    //   ///获取编辑器中光标的位置
    //   var selectionQuill = this.$refs.editer.quill.getSelection();
    //   var index = 0;
    //   ///当编辑器中没有内容时，这里获取的 selectionQuill 为 null
    //   if (selectionQuill !== null) {
    //     index = selectionQuill.index;
    //   }
    //   ///以引号分隔嵌入的视频代码 如下图中有分析
    //   var list = this.videoCodeLink.split('"');
    //   ///取出src中的视频独家报道
    //   var item = list[1];
    //   ///将视频链接插入到编辑器中
    //   this.$refs.editer.quill.insertEmbed(index, "video", item);
    // },
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
/* .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
} */
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
.yulan {
  background-color: rgba(250, 57, 57, 0);
  height: 100%;
  width: 100%;
  padding: 10px;
  overflow: auto;
}
.ql-editor {
  /* height: 100%;
  width: 100%;
  padding: 10px; */
  max-height: 550px;
}
/* .upload-demo{
  width: 100%;
} */
</style>
<style>
/* .el-upload-dragger{
  width: 100% ;
  position: relative;
  left: 50%;
  top: 50%;

} */
</style>