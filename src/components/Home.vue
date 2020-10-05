<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="Logout">退出</el-button>
    </el-header>

    <el-container>
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">
          |||
        </div>

        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!--一级菜单-->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <!--图标-->
              <i class="el-icon-location"></i>
              <!--文本-->
              <span>{{ item.authName }}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item
              :index="'/'+newitem.path"
              v-for="newitem in item.children"
              :key="newitem.id"
              @click="saveNavstate('/'+newitem.path)"
            >
              <template slot="title">
                <!--图标-->
                <i class="el-icon-menu"></i>
                <!--文本-->
                <span>{{ newitem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!--做路由占位符-->
      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
export default {
  mounted() {}, //页面加载完成的时候执行
  created() {
    this.getMenuList();
    this.activePath=window.sessionStorage.getItem('activePath');
  },
  data() {
    return {
      menulist: [],
      isCollapse:false,
      activePath:''
    };
  },
  methods: {
    Logout: function () {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //获取所有的菜单
    getMenuList: async function () {
      const { data: res } = await this.axios.get("menu");
      console.log(res);
      if (res.meta.status != 200) return this.Message.error(res.meta.meg);
      this.menulist = res.data;
      console.log(res.data);
    },
    toggleCollapse:function(){
       this.isCollapse=!this.isCollapse;
    },
    saveNavstate:function(activePath)
    {
         window.sessionStorage.setItem('activePath',activePath);
          this.activePath=activePath;
    },
  },
};
</script>

<style lang="less" scoped>
.toggle-button{
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between; //左右贴边
  padding-bottom: 0;
  padding-left: 0;
  align-items: center; //设置里边的元素都居中
  color: #fff;
  font-size: 20px;
  img {
    height: 40px;
    width: 30px;
  }
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color:#fcf9f9;
}
.home-container {
  height: 100%;
}
</style>