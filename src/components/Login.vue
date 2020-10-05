<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像-->
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>

      <!--表单采用了elementui-->
      <el-form  ref="loginFormRef" label-width="auto" class="login_form" :model="loginForm" :rules="loginFormRules">
        <el-form-item label="用户名" prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input show-password prefix-icon="el-icon-s-goods" v-model="loginForm.password" ></el-input>
        </el-form-item>
        <el-form-item class="btns">
         <el-button type="success" @click="Login">登陆</el-button>
          <el-button type="primary" @click="ResetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {

mounted(){

},

data(){
    return{
       loginForm:{
           username:'admin',
           password:'123456'
       },
       loginFormRules:{
           username:[
               {required: true, message: '请输入用户名', trigger: 'blur'},
               { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
           ],
            password:[
                {required: true, message: '请输入登陆密码', trigger: 'blur'},
               { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ]
       }
    }
},
methods:{
  ResetLoginForm:function(){
      console.log(this);
      //获取element表单form的对象，直接获取ref的对象,重置表单的状态
      this.$refs.loginFormRef.resetFields();
  },
  Login(){
      //表单的验证，await只能跟async配套使用
      this.$refs.loginFormRef.validate(async(res)=>{
         if(!res) return;
        const result= await this.axios.post('login',this.loginForm);
        console.log(result.data);
        if(result.data.meta.status!=200)
        {
          return this.Message.error('登陆失败');
        }
        else{
             this.Message.success('登陆成功');
             console.log(result.data.data.token);

             //存储token
             window.sessionStorage.setItem("token",result.data.data.token)
             this.$router.push('/home');
        }
      });
  }
}

};
</script>

<style lang="less" scoped>
.login_container {
  background: #2b4b6b;
  height: 100%;
  
}
.btns{
    display:flex;
    justify-content: flex-end;
}
.login_form
{
    position:absolute;
    bottom: 0;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  display: flex;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid#eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0, 0, 10px, #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
</style>