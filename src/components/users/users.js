// 引入axios
// eslint-disable-next-line
import axios from 'axios'
export default {
  data () {
    return {
      UserList: [{
        username: '王小虎',
        email: 'wangxiaohu.com',
        mobile: '123321234567'
      }],
      // 总条数
      total: 0,
      // 当前页数
      pagenum: 1,
      //   查询数据
      input5: '',
      // 对话框
      dialogAddUserVisible: true,
      // 添加用户的表单数据
      addUserform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        // 去找上面的prop
        username: [
          // 如果不填写数据会处罚
          // required: true 必填项
          // trigger: 'blur'失去焦点触发
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          // 如果格式不正确会触发
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          // 如果不填写数据会处罚
          // required: true 必填项
          // trigger: 'blur'失去焦点触发
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          // 如果格式不正确会触发
          {
            min: 6,
            max: 10,
            message: '长度在 6 到 10 个字符',
            trigger: 'blur'
          }
        ],     
        email: [{
          pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$/,
          message: '邮箱格式不正确',
          trigger: 'blur'
        }],
        mobile: [{
          pattern: /^1(3|4|5|7|8)\d{9}$/,
          message: '手机格式不正确',
          trigger: blur
        }]     

      }
    }
  },
  created () {
    this.loadUsersList()
  },
  methods: {
    //   获取用户列表数据
    async loadUsersList (pagenum = 1, query = '') {
      let options = {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
      }
      // 请求列表数据
      let res = await this.$axios.get(
        // 'http://localhost:8888/api/private/v1/users',
        'users',
        options
      )
      // .then(res => {
      //   console.log(res.data.data.users)
      // 用户列表数据
      this.UserList = res.data.data.users
      // 总页数
      //   console.log(res.data.data.total)
      this.total = res.data.data.total
      // 当前页
      this.pagenum = res.data.data.pagenum
      // })
    },
    //   点击页数
    pageChanged (curpage) {
      // console.log(curpage)
      this.loadUsersList(curpage, this.input5)
    },
    // 开始查询
    startQuery () {
      //   console.log('开始查询', this.input5)
      this.loadUsersList(1, this.input5)
    },
    // 删除用户
    async delUser (id) {
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        console.log('点击了确定')
        let res = await this.$axios.delete(
          'users/' + id, {

          }
        )
        if (res.data.meta.status === 200) {
          this.$message({
            message: res.data.meta.msg,
            type: 'success'
          })
        }
        this.loadUsersList(1, '')
      } catch (error) {
        console.log('点击了取消')
      }
    },
    // .then(() => {
    //   this.$message({
    //     type: 'success',
    //     message: '删除成功!'
    //   })
    // })
    // .catch(() => {
    //   this.$message({
    //     type: 'info',
    //     message: '已取消删除'
    //   })
    // })
    // 更改用户状态
    async stateChange (row) {
      // 发送状态
      // 需要id和mg_state
      // 1.拿到对象里面的状态和id
      const id = row.id
      const mgState = row.mgState
      // 2.发送请求
      let res = await this.$axios.put(`users/${id}/state/${mgState}`)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          message: res.data.meta.msg,
          type: 'success'
        })
      }
    }

  }
}
