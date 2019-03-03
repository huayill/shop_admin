export default {
  data () {
    return {
      rolesList: [{
        roleName: '主管',
        roleDesc: '技术负责人'
      }],
      // 展示分配权限对话框
      dialogAssignRightsVisible: false,
      // 权限树的数据
      rightsTreeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          },
          {
            id: 10,
            label: '三级 1-1-2'
          }
          ]
        }]
      },
      {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        },
        {
          id: 6,
          label: '二级 2-2'
        }
        ]
      },
      {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        },
        {
          id: 8,
          label: '二级 3-2'
        }
        ]
      }
      ],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 角色id
      roleId: 0
    }
  },
  created () {
    this.loadRolesList()
    this.loadRightsTreeData()
  },
  methods: {
    //   加载角色
    async loadRolesList () {
      let res = await this.$axios.get('roles')
      // console.log(res)
      this.rolesList = res.data.data
    },
    indexMethod (index) {
      return index
    },
    // 展示分配权限对话框
    showAssignRightsDialog (row) {
      // 保存角色id
      this.roleId = row.id
      // 显示对话框
      this.dialogAssignRightsVisible = true
      // 存第三层的id
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            keys.push(item3.id)
          })
        })
      })
      console.log(keys)
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    // 获取所有的权限列表数据(tree)
    async loadRightsTreeData () {
      let res = await this.$axios.get('rights/tree')
      // console.log(res)
      this.rightsTreeData = res.data.data
    },
    // 点击分配权限
    async assignRights () {
      // 收集选中的所有节点,发送给后台
      // 全选中
      let keys1 = this.$refs.tree.getCheckedKeys()
      // 半选中
      let keys2 = this.$refs.tree.getHalfCheckedKeys()
      // 拼成一个新的数组
      let keys = [...keys1, ...keys2]
      let res = await this.$axios.post('roles/' + this.roleId + '/rights', {
        rids: keys.join(',')
      })
      console.log(res)
      // 关闭对话框
      this.dialogAssignRightsVisible = false
      // 提示信息
      this.$message({
        message: '分配权限成功',
        type: 'success'
      })
      // 刷新列表
      this.loadRolesList()
    }
  }
}
