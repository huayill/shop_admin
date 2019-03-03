// 引入axios
// eslint-disable-next-line
import axios from 'axios'
export default {
  data () {
    return {
      userList: [
        {
          username: '王小虎',
          email: 'wangxiaohu.com',
          mobile: '123321234567'
        }
      ],
      // 总条数
      total: 0,
      // 当前页数
      pagenum: 1,
      //   查询数据
      input5: '',
      // 对话框
      dialogAddUserVisible: false,
      // 添加用户的表单数据
      addUserform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 校验
      rules: {
        // 去找上面的prop
        username: [
          // 如果不填写数据会触发
          // required: true 必填项
          // trigger: 'blur'失去焦点触发
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          // 如果格式不正确会触发
          {
            min: 2,
            max: 5,
            message: '长度在  到 5 个字符',
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
        email: [
          {
            pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: '手机格式不正确',
            trigger: blur
          }
        ]
      },
      // 显示编辑对话框
      dialogEditUserVisible: false,
      editUserForm: {
        id: 0,
        username: '',
        email: '',
        mobile: ''
      },
      // 分配角色对话框
      dialogAssignRolesVisible: false,
      AssignRolesForm: {
        username: '',
        rid: ''
      },
      // 角色列表数据
      rolesList: []
    }
  },
  created () {
    this.loadUsersList()
    this.loadRolesList()
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
        '/users',
        options
      )
      // .then(res => {
      // 用户列表
      // console.log(res.data.data.users)
      this.userList = res.data.data.users
      // 总页数
      // console.log(res.data.data.total)
      this.total = res.data.data.total
      // 当前页
      // console.log(res.data.data.pagenum)
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
        let res = await this.$axios.delete('users/' + id, {})
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
      const mgState = row.mg_state
      // 2.发送请求
      let res = await this.$axios.put(`users/${id}/state/${mgState}`)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          message: res.data.meta.msg,
          type: 'success'
        })
      }
    },
    // 显示添加用户对话框
    showAddUserDialog () {
      this.dialogAddUserVisible = true
    },
    // 添加用户
    async addUser () {
      // 1.发送请求
      let res = await this.$axios.post('users', this.addUserform)
      console.log(res)
      // if (res.data.meta.status === 200) {

      // }
      // 2.关闭对话框
      this.dialogAddUserVisible = false
      // 3.添加成功的提示信息
      this.$message({
        message: res.data.meta.msg,
        type: 'success'
      })
      // 4.重新刷新列表
      this.loadUsersList(1, '')
    },
    // 显示编辑对话框
    showEditUserDialog (row) {
      console.log(row)
      const { id, username, email, mobile } = row
      this.editUserForm.id = id
      this.editUserForm.username = username
      this.editUserForm.email = email
      this.editUserForm.mobile = mobile

      // 此时应该拿到数据了
      this.dialogEditUserVisible = true
    },
    // 编辑用户
    async editUser () {
      // 1.发送请求
      const { id, email, mobile } = this.editUserForm
      let res = await this.$axios.put('users/' + id, {
        email,
        mobile
      })
      console.log(res)
      // 2.关闭对话框
      this.dialogEditUserVisible = false
      // 3.提示修改成功
      this.$message({
        message: res.data.meta.msg,
        type: 'success'
      })
      // 4.刷新列表
      this.loadUsersList(1, '')
    },
    // 关闭添加用户对话框触发
    addUserDialogClosed () {
      // 表单重置
      this.$refs.addUserFormRef.resetFields()
    },
    // 显示分配角色对话框
    async showAssignRoleDialog (row) {
      // 把row用户对象里面需要的都拿过来交给assginRoleForm
      const { id, username } = row
      this.AssignRolesForm.id = id
      this.AssignRolesForm.username = username
      // 当前用户列表数据对应的对象只有id和username,没有角色id,尝试一下使用id=>查看自己的全部信息
      // 2.根据id查看用户信息
      let res = await this.$axios.get('users/' + id)
      console.log(res.data.data.rid)
      this.AssignRolesForm.rid =
        res.data.data.rid === -1 ? '' : res.data.data.rid
      this.dialogAssignRolesVisible = true
    },
    // 1.获取所有角色的列表数据
    // 当前用户的id需要,用户名需要,之后的角色
    async loadRolesList () {
      let res = await this.$axios.get('/roles')
      console.log(res)
      this.rolesList = res.data.data
    },
    // 开始分配角色
    async startAssignRole () {
      const { id, rid } = this.AssignRolesForm
      let res = await this.$axios.put('users/' + id + '/role', {
        rid
      })
      console.log(res)
      // 关闭对话框
      this.dialogAssignRolesVisible = false
      // 提示分配角色成功
      this.$message({
        message: '分配角色成功',
        type: 'success'
      })
      // 刷新页面
      this.loadUsersList(1, '')
    }
  }
}
