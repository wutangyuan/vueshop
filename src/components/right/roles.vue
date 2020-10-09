<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-button type="primary">添加角色</el-button>
      </el-row>

      <el-table :data="roleslist" :border="true" :stripe="true">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="rolename"></el-table-column>
        <el-table-column label="角色描述" prop="email"></el-table-column>

        <!--操作步骤-->
        <el-table-column label="操作" width="180px">
          <template slot-scope="">
            <!--操作安妮-->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <!--删除安妮-->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <!--分配安妮-->
            <el-tooltip
              effect="dark"
              content="分配权限"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
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
      roleslist: [],
    };
  },
};
</script>

<style lang="less" scoped>
</style>