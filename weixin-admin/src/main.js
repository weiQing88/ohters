// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/icon/iconfont/iconfont.css' 
import '@/icon/iconfont/iconfont.js'

import store from './vuex'


import './mock'


 //改变当前环境 （production / development )
//  Vue.config.productionTip = process.evn.NODE_ENV ==== 'production'
Vue.config.productionTip = false


Vue.use(ElementUI);


import './permission.js'   // 权限控制



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
