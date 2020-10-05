<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryinfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <el-table :data="userlist" :border="true" :stripe="true">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>

        <!--修改状态-->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!--{{scope.row.mg_state}}-->
            <!--作用域插槽，代表当前这一行的数据-->
            <el-switch
              v-model="scope.row.mg_state"
              @change="switchChage(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>

        <!--操作步骤-->
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            {{ scope.row.index }}
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>

            <el-tooltip
              effect="dark"
              content="分配角色"
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

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialoClosed">
      <!--内容-->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>

 <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>

         <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>

         <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
        
      </el-form>

      <!--底部-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getUserList();
  },
  data() {

    //自定义验证规则,需要在data定义
    var checkemail=(rule,value,cb)=>{
         const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
         if(regEmail.test(value))
         {
             return cb();
         }
         cb(new Error('请输入合法邮箱'));
    }
    var checkmobile=(rule,value,cb)=>{
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
         if(regMobile.test(value))
         {
             return cb();
         }
         cb(new Error('请输入合法手机号'));
    }

    return {
      //获取用户列表的参数对象
      queryinfo: {
        query: "",
        //当前的页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 2,
      },
      userlist: [],
      total: 0,
      addForm:{
         username:'', 
         password:'',  
         email:'',
         mobile:'',
      },
      addFormRules:{
         username:
         [
             {
                 required:true,message:'请输入用户名',trigger:'blur'
             },
             {
                 min:3,max:10 ,message:'用户名的长度在3～10个',trigger:'blur'
             }
         ],
         password:
         [
             {
                 required:true,message:'请输入密码',trigger:'blur'
             },
             {
                 min:3,max:10 ,message:'密码的长度在6～15个',trigger:'blur'
             }
         ],
         email:
         [
             {
                 required:true,message:'请输入邮箱',trigger:'blur'
             },
             {
                validator:checkemail,message:'请输入合法的邮箱',trigger:'blur'
             }
         ],
          mobile:
         [
             {
                 required:true,message:'请输入手机号码',trigger:'blur'
             },
              {
                validator:checkmobile,message:'请输入合法的手机号码',trigger:'blur'
             }
         ],
      },
      addDialogVisible: false, //显示用户对话框
    };
  },
  methods: {
    getUserList: async function () {
      const { data: res } = await this.axios.get("users", {
        params: this.queryinfo,
      });
      if (res.meta.status != 200) return this.Message.error("获取用户列表失败");
      this.userlist = res.users;
      this.total = res.totalpage;
    },
    //监听pagesize的改变值
    handleSizeChange: function (newsize) {
      this.queryinfo.pagesize = newsize;
      this.getUserList();
    },
    handleCurrentChange: function (newpageindex) {
      this.queryinfo.pagenum = newpageindex;
      this.getUserList();
    },
    //监听开个状态的改变
    switchChage: async function (scopeData) {
      const { data: res } = await this.axios.put(
        `users/${scopeData.id}/state/${scopeData.mg_state}`
      );
      if (res.meta.status != 200) {
        scopeData.mg_state = !scopeData.mg_state;
        return this.Message.error("修改状态失败");
      }
      this.Message.success("更新状态成功");
    },
    //关闭窗体
    addDialoClosed:function()
    {
        //关闭窗体的时候清空表单的数据
       this.$refs.addFormRef.resetFields();
    },
    addUser: function(){
       //表单预校验
       this.$refs.addFormRef.validate( async(value)=>{
           if(!value) return;
            const {data:res}=await this.axios.post('users',this.addForm);
         console.log(res);
       if (res.meta.status!=200){return this.Message.error('添加用户失败');}
         this.Message.success('添加用户成功');
         this.addDialogVisible=false;
         this.getUserList();

        //addDialogVisible = false
       });
    }
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
</style>