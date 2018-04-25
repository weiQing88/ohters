layui.define(['jquery'],function(exports){

 var _utils = {
 	  currentId : -1,
 	  loginStatus : false,
 	  verifiedAction : function(){
 	  	  console.log('de something');
 	  	  return this
 	  },
 	  isLogined : function(){
 	  	 console.log('checking the localstore');
 	  	 return this
 	  },
 	  init : function(){

 	  	 layui.use('login');


 	  	var category =  $('.layui-body').attr('data-type');

 	  	 console.log(category)

 	  	 console.log('init the necessary operations');

 	  	 return this
 	  }
 };


// 解决如何去区分不同页面调用不同的业务模块
// 每一个业务页面上都有一个根元素，在根元素上的data-id值对应于模块名称
 _utils.isLogined().verifiedAction().init()


exports('entry',{})

})