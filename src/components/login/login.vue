<template>
  <!--

   el-form 表单组件
   :model='对象' 绑定表单数据
   :rules="rules" 校验规则
   el-form-item  表单子组件
    ref="ruleForm" 注册ref,通过refs获取这个组件
    label-width="100px" 就是前面名称的宽度
    prop="name" 待会校验和重置都需要用到
  -->
  <el-row class="row" type="flex" justify="center" align="middle">
    <el-col :span="8">
      <el-form class="form" :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="startLogin()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
// 引入axios
// eslint-disable-next-line
import axios from "axios";
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 校验
      rules: {
        // 去找上面的prop
        username: [
          // 如果不填写数据会处罚
          // required: true 必填项
          // trigger: 'blur'失去焦点触发
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 如果格式不正确会触发
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          // 如果不填写数据会处罚
          // required: true 必填项
          // trigger: 'blur'失去焦点触发
          { required: true, message: '请输入密码', trigger: 'blur' },
          // 如果格式不正确会触发
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 提交按钮
    // 1.先通过js校验格式是否在正确
    startLogin () {
      // validate js代码中的校验方法
      this.$refs.loginForm.validate(async valid => {
        // 如果不正确退出
        if (!valid) {
          return
        }
        // 2.如果正确,开始登录
        // console.log('开始登录')
        let res = await axios.post(
          'http://localhost:8888/api/private/v1/login',
          this.loginForm
        )
        if (res.data.meta.status === 200) {
          // 拿到token值,保存到本地
          localStorage.setItem('token', res.data.data.token)
          // console.log('登录成功')
          // 3.1成功的提示
          this.$message({
            message: res.data.meta.msg,
            type: 'success',
            durtion: '800ms'
          })
          // 3.2跳转到home页面
          this.$router.push('/home')
        } else {
          this.$message({
            message: res.data.meta.msg,
            type: 'error'
          })
        }

        //   axios
        //     .post('http://localhost:8888/api/private/v1/login', this.loginForm)
        //     .then(res => {
        //       if (res.data.meta.status === 200) {
        //         // 拿到token值,保存到本地
        //         localStorage.setItem('token', res.data.data.token)
        //         // console.log('登录成功')
        //         // 3.1成功的提示
        //         this.$message({
        //           message: res.data.meta.msg,
        //           type: 'success',
        //           durtion: '800ms'
        //         })
        //         // 3.2跳转到home页面
        //         this.$router.push('/home')
        //       } else {
        //         this.$message({
        //           message: res.data.meta.msg,
        //           type: 'error'
        //         })
        //       }
        //     })
      })
    },
    resetForm () {
      // 回到初始值,移除校验状态
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
}
.row {
  height: 100%;
  background: #2d434c;
}
.form {
  background: #fff;
  padding: 25px;
  border-radius: 15px;
}
</style>
