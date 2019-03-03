<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="8">
          <img src="../../assets/images/logo.png" alt class="logo">
        </el-col>
        <el-col :span="8">
          <h1>后台管理系统</h1>
        </el-col>
        <el-col :span="8" class="out">
          欢迎您登录!
          <a href="#" @click.prevent="logout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <!-- 菜单列表 -->
        <el-menu
          :router="true"
          default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu v-for="item1 in menusList" :key="item1.id" :index="item1.id+''">
            <!-- 自定义标题 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <!-- index="/users" -->
            <el-menu-item
              v-for="item2 in item1.children"
              :key="item2.id"
              :index="'/' + item2.path"
            >{{item2.authName}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      menusList: []
    }
  },
  created () {
    this.loadLeftMenus()
  },
  methods: {
    // 退出功能
    async logout () {
      try {
        await this.$confirm('此操作将退出账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        //  console.log('点击了确定')
        //  1.清空token值
        localStorage.removeItem('token')
        // 2.跳回到login界面
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 800
        })
      } catch (error) {
        //  console.log('点击了取消')
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 加载左侧菜单权限
    async loadLeftMenus () {
      let res = await this.$axios.get('menus')
      console.log(res)
      this.menusList = res.data.data
    }
  }
}
</script>
<style lang='less'>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app,
.container {
  height: 100%;
  min-width: 870px;
}
/* 头部区域 */
.header {
  height: 60px;
  background: #b3c1cd;
  padding: 0;
  h1 {
    color: #fff;
    font-size: 28px;
    text-align: center;
    line-height: 60px;
  }
  .out {
    text-align: right;
    line-height: 60px;
    padding-right: 40px;
    a {
      color: #daa521;
    }
  }
}
/* 侧边栏区域 */
.aside {
  background: #545c64;
}
/* 内容区域 */
.main {
  background: #eaeef1;
}
.logo {
  height: 60px;
  text-align: center;
}
</style>
