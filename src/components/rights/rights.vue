<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="authName" label="权限列表" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">
          <span v-if="scope.row.level == 0">一级</span>
          <span v-else-if="scope.row.level == 1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [
        {
          authName: '主管',
          path: 'zhuguan',
          level: '1'
        }
      ]
    }
  },
  created () {
    this.loadRightsList()
  },
  methods: {
    //   加载权限列表数据
    async loadRightsList () {
      let res = await this.$axios.get('rights/list')
      console.log(res)
      this.tableData = res.data.data
    },
    // 处理索引
    indexMethod (index) {
      return index
    }
  }
}
</script>
<style scoped>
.bread {
  background: #d4dae0;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  padding-left: 20px;
}
</style>
