<template>
  <div class="all">
    <div class="box">
      <el-form abel-width="0px" ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="fa fa-user" placeholder="username" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="fa fa-unlock-alt"  placeholder="password" clearable show-password></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button class="btn1"  type="primary" @click="login">登录</el-button>
          <el-button class="btn2" type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    login() {
        this.$refs.loginFormRef.validate(async(vaild) =>{
            if(!vaild) return
            // const {data: res} = await this.$http.post('login',this.loginForm)
            const { data: res } = await this.$http.post('/user/login',this.loginForm)
            if(res.code !== 0) return this.$message.error('用户名或密码错误')
            console.log(res)
            window.sessionStorage.setItem('token',res.data.token)
            //发起请求
            this.$message.success('登陆成功')
            this.$router.push('/home')
        })
    },
    resetLoginForm() {
        this.$refs.loginFormRef.resetFields()
    },
  },
};
</script>

<style scoped>
.all {
  background-color: rgb(200, 84, 253);
  height: 100%;
}
.box {
  width: 450px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(205, 32, 221, 0.63);
  border-radius: 15px;
}
.login_form {
  position: absolute;
  width: 100%;
  padding: 30px 50px;
  box-sizing: border-box;
  top: 30px;
}
.btn{
    position: relative;
  top: 20px;
}
.btn1{
    position: absolute;
    left: 60px;
    width: 100px;
}
.btn2{
    width: 100px;
    position: absolute;
    right: 60px;
}
.el-button--primary {
  background-color: rgb(243, 55, 243);
  border-color: rgb(243, 55, 243);
}
.el-button--primary:hover {
  background-color: rgb(248, 110, 248);
  border-color: rgb(248, 110, 248);
}
.el-button--primary:focus {
  background-color: rgb(248, 110, 248);
  border-color: rgb(248, 110, 248);
}
/* .el-form-item__error {
    color: rgb(255, 255, 255) !important;
} */
.el-form-item__error {
  color:aliceblue
}
</style>