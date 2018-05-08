(function(window,$,Vue,layer,undefined){
  

Mock.mock('test.json',{
   code : 2,
   msg : '发送成功!'
});







var vm = new Vue({
     el : '#order-App',
     methods : {

         onF : function(event){
                  var $target = $(event.target);
                  var $parent = null;
                   $target.parent('.contrl').length > 0 ? $parent = $target.parent('.contrl') : $parent =  $target.parent('.contrl-other');
                   this.removeError($parent);
         },

         removeError : function($target){
               if($target.hasClass('failed')) $target.removeClass('failed');
         },
          checkboxAction : function(event){  // 多选项

                 var $target = $(event.target),
                     value = $target.val(),
                     $parent = $target.parent('label'),
                     $grandfa = $target.parents('.contrl-list');

                      this.removeError($grandfa);

                     if($parent.hasClass('active')){
                          $parent.removeClass('active');
                          var  index = this.formData.style.indexOf(value);
                          Vue.delete(this.formData.style,index)
                     }else{
                         $parent.addClass('active');
                         this.formData.style.push(value);
                     }
                  
          },
         radioAction : function(event){             // 单选项
                   var $target = $(event.target),
                       value = $target.val(),
                       $parent =  $target.parent('label'),
                       $grandfa = $target.parents('.contrl-list');

                       this.removeError($grandfa);

                      if($parent.hasClass('active')) return false;

                       $parent.siblings().removeClass('active');

                       $parent.addClass('active');

                       this.formData.city = value;


         },
       countDown : function(event){
             this.disabled = true;
             var self = this,
                 time = 60,
                 timer = null,
                 target =  event.target;
          
            timer = setInterval(function(){
                 if(time <=0){
                     clearInterval(timer);
                    target.innerHTML = '获取验证码';
                     self.disabled = false;

                 }else{
                    target.innerHTML = time-- + '秒';
                 }
            },1000);

        },
      getCodeAction : function(event){
          var  phone = /^1[3|4|5|7|8][0-9]\d{8}$/;
          if(phone.test(this.formData.tel)){
             this.countDown(event);
             $.ajax({
                  url: urlObje.getCodeUrl,
                  type : 'post',
                  dataType : 'json',
                  success : function(req){

                  }
             })

          }else{
                  layer.open({ content: '请输入正确手机号',style :'color:#a0a0a0;' , time: 3 });

          }

      },

     validateAction : function(){
         var obj = this.formData,
             self = this,
             result = true,
             phone = /^1[3|4|5|7|8][0-9]\d{8}$/;

           var tool = {
                 isEmptyed: function(_obj,i){
                         var b = true;
                         if(typeof _obj == Array){
                              _obj.length <= 0 ? b = false : '';
                          }else{
                               switch(i){
                                  case 'tel' : b = phone.test(_obj);
                                  break;
                                  default :  ( _obj == '' ||  _obj == 0 ) ? b = false : '';
                                  break;
                               }

                          }  
                        return b;
                    },
                 emptyHandler : function(_obj,i){
                    var state = this.isEmptyed(_obj,i);
                        state == false ?  ($(self.$refs[i]).addClass('failed'),result = false) : '';
                }
           };
 
        for(i in obj){
             tool.emptyHandler(obj[i],i);
         }

       return result;
     },
     sendingAction : function(){
         var  validated = this.validateAction();
        if(validated){

          var loadingIndex =  layer.open({
                                type: 2,
                                content: '加载中...'
                              });

        $.ajax({
                   url : urlObje.sendInfoUrl,
                   type : '',
                   dataType : 'json',
                   timeout : 6000,
                   success : function(resp){
                         layer.close(loadingIndex);
                   },
                    error : function(error){
                        layer.close(loadingIndex);
                   }
            })

      





        }
     }


     },
     data : {
          formData : {
              company : '',
              scale : '',
              name : '',
              position : '',
              tel :'',
              code : '',
              style : [], 
              city: ''
          },
         disabled : false,
         validated : true
     },
    created : function(){
         // 从全局变量中获取后台传回的值，更新 data 数据
        for(i in initValue){
          initValue[i] && (this.formData[i] = initValue[i])
        }


    }



 })




   





})(window,$,Vue,layer)