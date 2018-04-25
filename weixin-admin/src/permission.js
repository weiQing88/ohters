import Router from './router/';
import NProgress from 'nprogress'
import { getUser } from './utils'
import store from './vuex'


// 无需权限验证的路由地址
const whiteList = ['/login'];


Router.beforeEach((to, from, next) => {

   var userinfo = getUser();

   if(userinfo){  // 是否有登录

            if(to.path == '/login'){ // 如果已登录，就不能导航到登录页面
                    next('/')
            }else{

                  if(store.getters.role){ // 判断是否已渲染路由表
                        next()

                  }else{   // 动态渲染路由表

                    store.dispatch('CREATE_ROUTESMAP_ACTION',userinfo.role)
                         .then((routesmap) => {
                             Router.addRoutes(routesmap);
                             next({...to});  // 必须展开路由对象
                         })
                         .catch((error) => {
                              console.log(error);
                                next()
                         })

                  }
            }

    }else{

    	// 路由是否指向登录页面, 防止死循环
        if(whiteList.indexOf(to.path) != -1){
        	  next()
        }else{
 			 next('/login');
        } 
    }




})

