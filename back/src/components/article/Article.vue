<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入文章标题进行查询" v-model="query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="add">添加文章</el-button>
        </el-col>
      </el-row>
      <!--设置每页最大的显示条数，不必指定高度，知道为什么不去根据屏幕大小自动算高度吗？因为我css现在还不太行-->
      <el-table :data="tableData" stripe style="width:100%">
        <el-table-column prop="title" label="标题" width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="text" label="简介" width="350" show-overflow-tooltip></el-table-column>
        <el-table-column prop="love" label="点赞数" width="80"></el-table-column>
        <el-table-column prop="visited" label="浏览量" width="80"></el-table-column>
        <el-table-column prop="date" label="时间" width="180"></el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editor(scope.row.id)"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
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

    <el-drawer title="我是标题" :visible.sync="drawer2" :with-header="false" size="60%">
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
          <code class="hljs" v-html="contentCode"></code>
        </div>-->
        <!-- <div class="output ql-snow">
          <div class="ql-editor" v-html="content"></div>
        </div>-->
        <el-button type="primary" plain @click="complete">完成</el-button>
        <el-button @click="drawer = true" type="primary" plain style="margin-left: 16px;">完善文章信息</el-button>
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
              <img class="img" :src="url" alt />
            </span>
            <el-button type="primary" plain @click="clearImg">更改图片</el-button>
          </div>
        </el-drawer>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import dedent from "dedent";
import hljs from "highlight.js";
import debounce from "lodash/debounce";
import "highlight.js/styles/tomorrow.css";

export default {
  data() {
    var self2 = this;
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
    return {
      query: "",
      queryInfo: {
        pagenum: 1,
        size: 7,
      },
      total: 0,
      tableData: [],
      drawer2: false,
      // article:{}
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
      content: dedent``,
      dialogVisible: false,
      imageUrl: "",
      tmp: true,
      uploadURL: "xxx",
      drawer: false,
      drawer2: false,
      title: "",
      text: "",
      // file: {},
      url: "",
      uniqueId: "uniqueId",
      videoUploadTag: false,
      activeName: "first",
      videoLink: "",
      file: {},
      id:0
    };
  },
  // components: {
  //   Editor,
  // },
  async mounted() {
    const { data: res } = await this.$http.get("/article/getarticle/num");
    this.total = res.data[0].total;
    console.log(this.total);
    this.geArticleList();
  },
  methods: {
    handleCurrentChange(newPage) {
      console.log(`处于第${newPage}页`);
      this.queryInfo.pagenum = newPage;
      this.geArticleList();
    },
    async geArticleList() {
      const { data: res } = await this.$http.get("/article/getall/article", {
        params: this.queryInfo,
      });
      console.log(res);
      this.tableData = res.data;
    },
    async removeById(id) {
      console.log(id);
      await this.$http.get("/article/delete/article?id=" + id).then((res) => {
        if (res.data.code === 0) {
          this.$message.success("删除成功");
        }
      });
      this.geArticleList();
      const { data: res2 } = await this.$http.get("/article/getarticle/num");
      this.total = res2.data[0].total;
    },
    async getUserList() {
      console.log(this.query);
      await this.$http
        .get("/article/search/article?key=" + this.query)
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data.data;
        });
    },
    add() {
      this.$router.push("/editor");
      window.sessionStorage.setItem("activePath", "/editor");
    },
    async editor(id) {
      await this.$http.get("/article/editor/id?id=" + id).then((res) => {
        this.drawer2 = true;
        // this.article = res.data.data;
        let str = res.data.data.content;
        // this.content = eval("`"+str+"`")
        // this.content = "`"+str+"`"
        this.content = str;
        this.text = res.data.data.text;
        this.title = res.data.data.title;
        this.url = res.data.data.url;
        this.id = res.data.data.id;
        this.tmp = this.url ? false : true;
        // (debounce(function (str) {
        //   this.content = str.html;
        // }, 466))(),
        // let obj = {
        //   html:str.replace(/"/g,"'")
        // }
        // this.onEditorChange(obj)
        console.log(this.content);
        // for (var i = 0 ; i < str.length ; i ++){
        //     encodedStr += "&#" + str.substring(i, i + 1).charCodeAt().toString(10) + ";" ;
        // }
        console.log();
        // this.content = res.data.data.content
        // console.log(this.article);
      });
    },
    onEditorChange: debounce(function (value) {
      console.log(value);
      console.log("··········");
      this.content = value.html;
    }, 466),
    onEditorBlur(editor) {
      console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
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
        this.url = data.url;
        this.name = data.name
        console.log(tmplist);
        this.file = tmplist;
        // console.log(this.contentCode);
      }

      this.imageUrl = URL.createObjectURL(file.raw);
    },
    clearImg() {
      this.url = "";
      this.tmp = true;
    },
    async complete() {
      let time = this.$moment().format("YYYY-MM-DD HH:mm");
      let upload = {
        id:this.id,
        content: this.content,
        text: this.text,
        title: this.title,
        url: this.url,
        name: this.name,
        date: time,
      };
      console.log(upload);
      let res = await this.$http.post("/article/update/id", upload);
      console.log(res)
      this.$message({
          message: "修改成功",
          type: "success",
        });
    },
  },
  computed: {
    // editor() {
    //   return this.$refs.myTextEditor.quill;
    // },
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    },
    header() {
      return {
        Authorization: "Bearer " + window.sessionStorage.getItem("token"),
      };
    },
  },
  // mounted() {
  //   console.log("this is Quill instance:", this.editor);
  // },
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
.el-input__inner:focus {
  border-color: #fe91ca;
}
.el-pager li.active {
  color: #fd87c4;
}
.el-pager li:hover {
  color: #fd87c4;
}
.block {
  margin-top: 10px;
}
.example {
  padding: 10px;
}
.upload-demo2 {
  display: none;
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
.img {
  width: 100%;
}
</style>