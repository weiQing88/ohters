import Axios from 'axios'
import  store from '@/vuex'

// 接口连接
const URLS = {
	  getUserUrl : 'getuser.json',
      loginUrl : 'login.json'
};



// 实例化自定义 axios
var server = Axios.create({
	 baseURL : 'https://some-domain/',
	 timeout : 6000
});




// 在 then 或 catch 处理前，进行预处理。
server.interceptors.response.use((response) => {
	// 根据返回的 code 进行预处理。
     if(response.data.code != 0){
     	  return Promise.reject('error')
     }else{
       	return response.data 
     }
     
},(error) => {
     return Promise.reject(error)
});


// 给每个请求加自定义请求头部,以便后台对请求进行甄别。
server.interceptors.request.use((config) => {

    if(store.getters.token){
    	 config.headers['X-Token'] = store.getters.token;
    }

   return config
},(error) => {
  return Promise.reject(error)
})




// 登录接口
export function loginApi(param){
     return server.post(URLS.loginUrl,param)  
}