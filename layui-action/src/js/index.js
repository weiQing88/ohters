var App = (function(window,undefined){
 
    


		/* 图片列表 start */ 
       function wxPictureList(jQuery){
       	  if(jQuery('#wx-picture-main').length <= 0 ) return false;
				 layui.use(['table','upload'],function(table,upload){


  						 // 上传图片
						let uploadInst = upload.render({
						     elem: '#uploadBtn' //绑定元素
						    ,url: '/upload/' //上传接口
						    ,done: function(res){
						      //上传完毕回调
						    }
						    ,error: function(){
						      //请求异常回调
						    }
						  });


				      table.render({
				      	  width:1207,
				      	  elem: '#pictureTable',
				      	  cols:[[
				      	  	   {field:'index',title:'序号', align:'center', width:200},
				      	  	   {field:'imgSrc',title:'图片', align:'center', width:200, templet : '<div><img src="{{ d.imgSrc }}" /></div>'},
				      	  	   {field:'update',title:'上传时间', align:'center', width:200},
				      	  	   {field:'collect',title:'收藏', align:'center', width:200},
				      	  	   {field:'sum',title:'分析量', align:'center', width:200},
				      	  	   {title:'操作',  width:200, fixed: 'right', align:'center', toolbar:' <div> <a class="layui-btn layui-btn-mini" lay-event="edit">编辑</a> \
				      	  	  														     <a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="del">删除</a>\
				      	  	      													 </div> ' },
				      	    ]],  
				      	    data :[{
									"index": 1,
									"imgSrc": "../images/u53.png",
									"update": "2017/05/07",
									"collect": "10",
									"sum": "40"
								},
								{
									"index": 2,
									"imgSrc": "../images/u60.png",
									"update": "2017/05/07",
									"collect": "10",
									"sum": "40"
								},
								{
									"index": 3,
									"imgSrc": "../images/u67.png",
									"update": "2017/05/07",
									"collect": "10",
									"sum": "40"
								}] 
				      // 	    url: 'dataset.json',
				      // 	    done : function(resp){
				 				 // console.log(12412)
				      // 	    }
 
				      });



				    table.on('tool(pictureTable)', function(obj){

						  // var data = obj.data; //获得当前行数据

						   var layEvent = obj.event; //获得 lay-event 对应的值

						  // var tr = obj.tr; //获得当前行 tr 的DOM对象
						 

						  if(layEvent === 'del'){ //删除

						    layer.confirm('真的删除行么', function(index){
						     //  obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
						      layer.close(index);
						      //向服务端发送删除指令
						    });

						  } else if(layEvent === 'edit'){ //编辑



						    //do something


						    
						    //同步更新缓存对应的值
						    // obj.update({
						    //     username: '123'
						    //   ,title: 'xxx'
						    // });



						  }
						});
						   




				 });
       }
       /* 图片列表 end */ 




       /* 音频列表 start */
       function wxAudiolist(jQuery){
       	     if(jQuery('#wx-audioList-main').length <= 0 ) return false;
 				layui.use(['upload','table'],function(upload,table){
					 // 上传音频
					  let uploadInst = upload.render({
						    elem: '#uploadBtn', //绑定元素
						    url: '/upload/', //上传接口
						    accept : 'audio',
						    done: function(res){
						      //上传完毕回调
						    },
						    error: function(){
						      //请求异常回调
						    }
					  });

			    table.render({
			    	width:1609,
			    	elem : '#audioList',
			    	cols:[[
			    	     {field:'index',title:'序号', align:'center', width:80},
			    	     {field:'title',title:'标题', align:'center', width:320},
			    	     {field:'duration',title:'时长', align:'center', width:200},
			    	     {field:'size',title:'大小', align:'center', width:200},
			    	     {field:'update',title:'上传时间', align:'center', width:200},
			    	     {field:'played',title:'播放数量', align:'center', width:200},
			    	     {field:'shared',title:'分析量', align:'center', width:200},
			    	     {title:'操作',  width:200, fixed: 'right', align:'center', toolbar:' <div> <a class="layui-btn layui-btn-mini" lay-event="edit">编辑</a> \
				      	  	  														     <a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="del">删除</a>\
				      	  	      													 </div> ' },
			    	  ]],
			    	 data : [
			    	 	{
			    	 		index : 1,
			    	 		title : '某某小视屏',
			    	 		duration : '4.53',
			    	 		size:'4.25M',
			    	 		update : '17/10/15',
			    	 		played : 212,
			    	 		shared : 122312
			    	 	},
			    	 	{
			    	 		index : 2,
			    	 		title : '某某小视屏',
			    	 		duration : '4.53',
			    	 		size:'4.25M',
			    	 		update : '17/10/15',
			    	 		played : 212,
			    	 		shared : 122312
			    	 	}
			    	  ]
			    })


 		 });
       }

       /* 音频列表 end */




   /*  视频列表 start */
     function wxVedioList(jQuery) {

     	     let vedioVM = null;

     	     Vue.component('componentOne',{
     	  	   	   prop:['list'],
     	  	   	   data : function(){
     	  	   	   	  return {
     	  	   	   	  	  test : 'ss'
     	  	   	   	  }
     	  	   	   },
     	  	   	   template : '<div id="componentOne">你是个什么东西!</div>'
     	  	   });




				   Vue.component('one-component',{
				   	      template : '<div id="oneCom"><p>test zone</p></div>',
				   	      data : function(){
				   	      	  return {
				   	      	  	 test : 't'
				   	      	  }
				   	      }
				   });


				   Vue.component('two-component',{
				   	    template : '<div id="twoCom"><p>test zone</p></div>',
				   	     data : function(){
				   	      	  return {
				   	      	  	 test : 't'
				   	      	  }
				   	      }
				   })






     		  // 调用指定模块
     		  layui.use('vueComponents',function(){

     		  		vedioVM  = new Vue({
     		  			  el : '#vedioApp',
     		  			  data : {
     		  			  	  msg : '你好！'
     		  			  }

     				  });



     		  });


     	  



     		


     }
 /*  视频列表 end */








  return {
  	  init : function(){
  	  	  // 配置自定义模块路径 
  	  	  layui.config({ base : './modules/' });

  	     // 常用元素操作 
  	  	 layui.use(['jquery','element'], function($,element){  
  	  	 		wxPictureList($);
 			    wxAudiolist($);
 			    wxVedioList($);
  	  	  });

  	  }
  }

})(window);


window.onload = function(){ 
     
	   App.init()
}








 
