import { asynRoutesMap, constantRoutesMap } from '@/router'
import { getRole } from '@/utils'

// 筛选出对应角色肯访问的路由表
function filterAsynRoutes(asyncRouterMap, role){
	 var assecceRoutesMap = asyncRouterMap.filter((route,index) => {
	 	    if(route.meta && route.meta.role && route.meta.role.indexOf(role) > -1){
	 	    	  if(route.children && route.children.length && !route.meta.noRedirect) route.children = filterAsynRoutes(route.children,role);    
	 	    	  return true
	 	    }
	 	  return false
	 });
	return assecceRoutesMap || [];
}


var appModule = {
	 state : {
	 	 role : '',             // 防止刷新
	 	 routes : constantRoutesMap,    // 侧边栏渲染数据
	 	 breakRoutes : [],            // 面包屑
	 	 openedArry : []			 // 侧边栏下拉列表 index
	 },
   mutations : {
   	   SET_ROLE(state, role){  // 退出登录的时候要清掉
   	   		state.role = role
   	   },
   	  SET_ROUTES(state, routes){
   	  	    state.routes = constantRoutesMap.concat(routes)
   	  },
   	  RESET(state){
   	  	  state.role = '';
   	  	  state.routes = constantRoutesMap;
   	  },
   	  ADD_BREAKROUTES(state,route){   // 面包屑
   	  	 if(state.breakRoutes.some( r => r.path === route.path )) return;  // 如果已存在相同的路由
   	  	  	state.breakRoutes.push({ name : route.name, path : route.path })
   	  },
   	 DELETE_BREAKROUTES(state, route){
   	 	  let index;
   	 	  for(let [i,r] of state.breakRoutes.entries()){  //  for-in 在遍历对象的时候，没有index
   	 	  	   if(r.path === route.path){
   	 	  	   	  index = i;
   	 	  	   	  break;
   	 	  	   }
   	 	  }
   	 	state.breakRoutes.splice(index,1)
   	 }
   },

 actions : {
 	 CREATE_ROUTESMAP_ACTION({ commit },role){       // role 来自路由对象
 	 	   return new Promise((resolve,reject) => { 
 	 	   		var assecceRoutesMap = filterAsynRoutes(asynRoutesMap,role);
 	 	   		commit('SET_ROLE',role);
 	 	   		commit('SET_ROUTES',assecceRoutesMap);
 	 	   		resolve(assecceRoutesMap);
 	 	   })
 	 },
 	 RESET_ROUTESMAP_ACTION({ commit }){  // 退出登录时清理 
 	 	 return new Promise((resolve,reject) => {  
		 	 	 		commit('RESET');
		 	 	 		resolve();
		 	 	  })
 	 },
    GEBERATE_BREAKROUTES_ACTION({ commit, state },route){
	 	  return new Promise((resolve,reject) => {
	 	  		commit('ADD_BREAKROUTES',route);
	 	  		resolve([...state.breakRoutes])
	 	  })
    }
 }


}


export default appModule