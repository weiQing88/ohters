<template>
  <section class="log-wrapper" :style="{ backgroundImage:'url( '+ backgroundImage +' )'  }">
  	   <h3 class="log-title">系统登录</h3>
  	 <el-form ref="myForm" :model="formRules" :rules="rules" class="myForm">
	  <el-form-item label="" prop="name" >
	    <el-input v-model="formRules.name" placeholder="请输入手机号"></el-input>
	  </el-form-item>

	  <el-form-item label="" prop="pw">
	    <el-input type="password" placeholder="请输入密码" v-model="formRules.pw"></el-input>
	  </el-form-item>

	   <el-form-item label="" prop="captcha">
	      <el-input placeholder="请输入验证码" v-model="formRules.captcha">
	         <el-button slot="append" :disabled="disabled">{{getCaptChaTxt}}</el-button>
	      </el-input>
	  </el-form-item>

	  <el-form-item>
	    <el-button class="log-btn" type="primary" @click="submitAction('myForm')" :disabled="submitDisabled">提交</el-button>
	    <el-button @click="ResetForm('myForm')">重置</el-button>
	  </el-form-item>

	  </el-form>
  </section>
</template>

<script>

//
export default {
    data(){

      // 自动以验证规则
      var hasBlank = function(rule, value, callback){
      		if(value){
      			/[\s]/g.test(value) ? callback(new Error('密码含有空格')) : callback();
      		}else{
      		  callback(new Error('请输入密码'))
      		}
       };

      var isPhone = function(rule, value, callback){
      		if(value){
      		   /^1[3|4|5|7|8][0-9]\d{8}$/.test(value) ? callback() : callback(new Error('请输入合法手机号'))

      		}else{
 				 callback(new Error('请输入手机号'))
      		}
      };

    	return {
    		 submitDisabled : false,
    		 getCaptChaTxt : '获取验证码',
    		 disabled : false,

    		 backgroundImage : require('@/assets/logbg2.jpg'),

    		 formRules : {
    		 	  name : '',
    		 	  pw : '',
    		 	  captcha : ''
    		 },
    		 rules : {
    		 	 name : [
    		 	 	 { required : true, message: '请输入手机号', trigger: 'blur' },
    		 	 	// {min : '11', max : '11', message : '长度在11个字符', trigger: 'blur'},
    		 	 	// {validator : isPhone, trigger: 'blur'}
    		 	   ],
    		 	 pw : [
    		 	 	 { required : true, message: '请输入密码', trigger: 'blur' },
    		 	 	 { validator : hasBlank, trigger: 'blur' }
    		 	  ],
    		 	 captcha : [
    		 	 	   { required : true, message: '请输入验证码', trigger: 'blur' }
    		 	   ]
    		 }
    	}
    },
   methods : {
   	   submitAction(form){
   	   		this.$refs[form].validate((valid) => {
   	   			 if(valid){
 
   	   			 // 1、请求接口。
   	   			 // 2、在本地保存用户信息和token
   	   			 // 3、跳转页面、渲染导航栏目

   	   			   this.submitDisabled = true;

   	   			   this.$store.dispatch('LOGIN_ACTION',this.formRules)
   	   			  			 .then((response) => {
   	   			  			 	 this.submitDisabled = false;
   	   			  			 	 this.$router.push('/')
   	   			  			 })
   	   			  			.catch((error) => {
   	   			  				 this.submitDisabled = true;
   	   			  			})

   	   			 }else{
   	   			 	console.log('验证未通过')
   	   			 }
   	   		})
   	   },
   	   ResetForm(form){
   	   	  this.$refs[form].resetFields();
   	   }
   }
}	
</script>

<style lang="less">
  .log-wrapper{
  	 width: 100%;
  	 height: 100%;
  	 background-position: center;
  	 background-repeat: no-repeat;
  	 background-size:cover ;
  	 padding-top: 1px;
  }
 .log-title{
 	 height: 50px;
 	 line-height: 50px;
 	 color:#fff;
 	 margin-top: 10%;
 	 margin-bottom: 1%;
 	 text-align: center;
 	 font-size: 26px;
 }
  .myForm{
  	 	width: 350px;
  	 	margin:0 auto 0;
  	 	background-color: rgba(255,255,255,.2);
  	 	padding:20px;
  	 	border-radius: 5px;
  	 }

 .el-input{ 
 	background-color: transparent !important;
 	input{ background-color: transparent !important; color: #d1d1d1; }
 }

 .log-btn{
 	width: 76%;
 }

</style>