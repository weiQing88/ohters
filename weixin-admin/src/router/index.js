import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Layout from '@/views/layout'

Vue.use(Router);




// 开发环境下不执行懒加载 (该方法可用)。
// 在 layout 模板中不可 加载其他组件。
let _import = (function(window,undefined){
  
  if(process.env.NODE_ENV === 'production'){
		 return file => () => require('@/views/' + file + '.vue').default
	}else{
		 return file => require('@/views/' + file + '.vue').default
	}

})(window)





// 无权限路由表
export const constantRoutesMap = [
    { path : '/login', name : '登录', component: _import('log/index'), hidden : true },
    {
      path : '/',
      name : '首页',
      title : '首页',
      component : Layout,
      redirect : '/home',
      icon : 'el-icon-message',
      noRedirect : true,
      children : [
      	  {path : 'home',name : '默认初始页', component: _import('layout/home')}
        ]	
    }
 ];




// 动态添加路由表
export const asynRoutesMap = [
   {
   	 path :'/sp',
   	 name : '小程序管理',
   	 title : '小程序管理',
   	 component : Layout,
   	 redirect  : '/sp/picture',
     meta : { role : ['admin','editor'] },
     icon : 'el-icon-tickets',
   	 children : [
   	 	   { path : 'picture', name: '图片管理', component : _import('sp/picture'), meta: { role :  ['admin','editor'] } },
   	 	   { path : 'audio', name: '音频管理', component : _import('sp/audio'), meta: { role :  ['admin','editor'] } },
   	 	   { path : 'video', name: '视频管理', component : _import('sp/video'), meta: { role :  ['admin','editor'] } }
   	  ]
   }
 ];




export default new Router({ routes: constantRoutesMap })


