import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'

Vue.config.productionTip = false

//根路径
//Axios.defaults.baseURL="https://www.liulongbin.top:8888/api/private/v1/";

Axios.defaults.baseURL="http://localhost:5000/api/";


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
