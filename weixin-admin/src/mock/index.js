import Mock from 'mockjs'


Mock.mock('getuser.json',{
	code : 0,
	data : {}
});

Mock.mock(/['login.json']/g,{
	 code : 0,
	 messsage : '登录成功',
	 data : {
	 	name : '张某某',
	 	id : 5415,
	 	token : '21232f297a57a5a743894a0e4a801fc3',
	 	role : 'admin',
	 	portrait : '',
	 	loginTime : new Date().getTime()
	 }
});




