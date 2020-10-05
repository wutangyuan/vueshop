import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

import 'element-ui/lib/theme-chalk/index.css'
import '../assets/css/global.css'

import Welcome from '../components/Welcome.vue' 

import Users from '../components/user/Users.vue'



Vue.use(VueRouter)

const routes = [
   //路由重定向
  {
    path:'/',
    redirect:'/login'
  },
  {
   path: '/login',
   component : Login
  },
  {
    path: '/home',
    component : Home,
    redirect:'/welcome',
    children:
    [
      {
        path:'/welcome',
        component:Welcome
      },
      {
        path:'/users',
        component:Users
      }
    ]

   }
]

const router = new VueRouter({
  routes
})

//路由导航守卫
router.beforeEach((to,from,next)=>{
    if(to.path=='/login')
    {
      return next();
    }
   var token= window.sessionStorage.getItem("token");
   if(!token)
   {
     return next('/login');
   }
   next();
});

export default router
