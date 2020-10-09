<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="rightlist" :border="true" :stripe="true">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
            <template scope="scope">
                {{scope.level}}
           <el-tag :type="tags[scope.row.level].type">
               {{tags[scope.row.level].name}}
          </el-tag>
            </template>
         
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightlist: [],
      tags:[
          { name: '一级', type: 'success' },
          { name: '二级', type: 'info' },
          { name: '三级', type: 'warning' },
          { name: '四级', type: 'danger' }
      ],
    };
  },
  created() {
    this.getRightlist();
  },
  methods: {
    getRightlist: async function () {
      const { data: res } = await this.axios.get(`rights/list`);
      if (res.meta.status != 200) {
        return this.Message.error("获取权限列表失败");
      }
      this.rightlist = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
</style>