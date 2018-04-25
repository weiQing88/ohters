import { loginApi } from '@/api'
import { setUser,getToken } from '@/utils'
import { Message } from 'element-ui'

var logModule = {
	 state : {
	 	 token : getToken()   // 初始化或防止刷新页面 （为什么不直接把 token 也存在 cookie中 ===> 使用vuex可以动态管理状态）                                                                   
	 },
  mutations : {
  	  SET_TOKEN : (state, token) => { 
  	  	  state.token = token
  	  },
     RESET: (state) => {
         state.token = '';
     }
  },

 actions : {
   	   LOGIN_ACTION : ({ commit },parameters) => {
            return new Promise((resolve,reject) => {
               loginApi(parameters)
                          .then((response) => {
                              commit('SET_TOKEN',response.data.token);  
                              setUser(response.data); // cookie保存用户登录信息
                              resolve();
                          })
                          .catch((error) => {
                               Message({ message : '登录失败！' });
                               resolve(error);
                          })
        
            })
   	 	    	
   	    },
      LOGOUT_ACTION : ({ commit }) => {
          return new Promise((resolve, reject) => {
               // 退出登录接口
          })
      }
    }

}


export default logModule;