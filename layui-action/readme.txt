
***** 该项目依然由于后台渲染模板，在由前端填充数据。 *****

项目目录：
 {
	   src: {   
		   	common,  公共的js
		   	css,     业务样式文件
		   	images,  业务图片
		   	libraries : [ layui ]  插件库集合
		   	modules : 自定义扩展模块
		   	js : 业务代码
		   	templates : 组件模板  利用gulp-file-include 插件实现HTML模块
		    views : 由于gulp-file-include 处理后生成的html页面          
	  },

	 dist :{  完成打包后的文件
          css,  样式
          js,   业务逻辑
          modules, 业务模块
          libareies, 公共库
          index.html, 静态页面
          ... 静态页面
	 } 


	 index.html 

 }