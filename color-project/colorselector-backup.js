define(['jquery','bgcolor','farbtastic'],function ($) {


    /*   colorPickerTool  start  */
     $.fn.colorPickerTool = function(){

      var FColorPicker = null;

      var barIndex = 1;
          wrapper =  this,
          box = this.children('.colorPicker-box'),
          addButton = this.children('.addColorBar'),
          boxW = box.width(),
          perWidth = 0, // 每个元素的宽度
          textPercent = 0,
          currColor = 0;

      var colorBarHtml = '<div class="colorBar"><span class="colorSlider"></span></div>';

      var colorBarId = ['bar1','bar2','bar3','bar4'],
         createdColorBar = [];  // 已经创建的 ColorBar



      // 创建ColorBar
      function createColorBar(){
            var index = box.children('.colorBar').length;
            var colorBarObject = $('<div class="colorBar" data-index="'+ index +'" data-percent="'+ textPercent +'" data-color="'+  currColor +'" style=" width:'+ perWidth +'px; background-color:'+ currColor +';" > \
              <i class="delectColorBar"></i> \
              <em class="resetcolor" ></em> \
               <input type="text" readonly value="'+ textPercent +'%"><span class="colorSlider"></span></div>');
            box.append(colorBarObject);

      }


      // 计算每个 ColorBar 宽度
      // 如果已存在元素，
      function calculateWidthGlobal(flag){
          var colorBarNodes = box.children('.colorBar'),
              len = colorBarNodes.length,
              boxWidth = box.width();
              switch(len){
                  case 0 : perWidth = boxWidth;;
                  break;
                   case 1 : perWidth = parseInt(boxWidth / (len + flag));
                  break;
                   case 2 : perWidth = Math.floor(boxWidth / (len + flag));
                  break;
                   case 3 : perWidth = parseInt(boxWidth / (len + flag));
                  break;
              }

     }


     // 处理在 3个的情况下，给最后一个元素加宽
     function lastChild(){
             var colorBars = box.children('.colorBar');
            if(colorBars.length == 3){
                 colorBars.last().width(perWidth).children('input').val(textPercent + 1 + '%');
            }
     }





     // 如果已经存在有子元素,重新设宽度,并设置data- 参数
     function hasColorBarGlobal(){
            var colorBarNodes = box.children('.colorBar');
            if(colorBarNodes.length > 0){
                colorBarNodes.width(perWidth).attr('data-percent',textPercent).children('input').val(textPercent + '%');
            }
     }


     // 计算百分比
     function colorBarTextGlobal(){
           var boxWidth = box.width();
               textPercent = parseInt(perWidth / boxWidth * 100) ;
     }

      
    

    function createEventAction(){
              if(box.children('.colorBar').length >= 4) return false;
                calculateWidthGlobal(1);
                colorBarTextGlobal(perWidth);
                hasColorBarGlobal();
                createColorBar();
                lastChild();
      }

      

      // 创建ColorBar，并判断是否多于四个
     // 初始化颜色选择APP，在回调中创建colorBar
      function createEvent(){  
          addButton.bigColorpicker(function(el,color){},"L",6,function(color){
                 currColor = color;
                 createEventAction();
          });
      }

 
    
       // 删除 colorBar
        box.on('click','i.delectColorBar',function(event){
                         $(this).parent().remove();
                         calculateWidthGlobal(0);
                         colorBarTextGlobal();
                         hasColorBarGlobal();
                         lastChild();
                         event.stopPropagation();
                         return false;
                  });


    



     // 显示或隐藏 删除按钮
      box.on('mouseover','.colorBar',function(){
                    $(this).children('i').show();
                     $(this).children('em').show();
             })
             .on('mouseout','.colorBar',function(){
                   $(this).children('i').hide();
                   $(this).children('em').hide();
             });




    function showFColorPicker(){ $('#colorApp').show() }
    function hideFColorPicker(){  $('#colorApp').hide()   }

 

     // 选中单个colorBar 调色
     box.on('click','em',function(){
               var parent = $(this).parent('.colorBar');
               showFColorPicker();
               FColorPicker.linkTo(function(color){
                    parent.css('backgroundColor',color);
                    parent.attr('data-color',color);

               })

          });


   


   // 如果还没创建colorBar,父元素也可以打开选色器
   box.on('click',function(event){
         if($(this).children('.colorBar').length <= 0) addButton.trigger('click');
         event.stopPropagation();
   });





    
    // 缩放方法
   var resizableActions = {
          movingTimer : 0,  // 如果是0则是没有移动
          mStartX : 0, // 鼠标相对 控制元素的位置
          mToX : 0,  // 鼠标的新位置
          cX : 0,  // 当前位置 
          ctrlNode :  null,
          boxNode : null,
          limiteWidth : 60,
          onMouseDownAction: function(e){

            var That = this;
           // 计算鼠标在页面上的位置
           // 鼠标在当前元素的位置
            this.mStartX = e.pageX - $(this.ctrlNode).position().left;

           // 开始移动动作
            this.movingTimer = setInterval(function(){ That.movingAction() },10);
        },

       movingAction : function(){
         if(this.movingTimer){
         
             // 限定最大范围
              // 相邻元素的总宽 - 限定最小宽度
              var len = box.children('.colorBar').length;
              var siblingsW = 0;
              var limitedw = 0;
              $(this.boxNode).siblings().each(function(index,item){  siblingsW += $(item).width()  });

                if(siblingsW){
                     if(len == 2){  // 如果有两个子元素，总长度 - 限制长度
                           limitedw = parseInt(boxW - this.limiteWidth);
                      }else if(len == 3){

                           limitedw = parseInt(siblingsW - this.limiteWidth - 5);

                      }else if(len == 4){
                      		  limitedw = parseInt(siblingsW - (this.limiteWidth * 2) - 5);
                      }
                }else{
                     limitedw = boxW;
                }


              var x = parseInt(this.mToX - this.mStartX);
              if(x <= this.limiteWidth) return false;
              if(x >= limitedw) return false;
        
              this.cX = x;

              this.ctrlNode.style.left = this.cX + 'px';

              this.boxNode.style.width = this.cX + 'px';

              this.boxNode.setAttribute('data-percent',parseInt(this.cX / boxW * 100));

              $(this.boxNode).children('input').val(parseInt(this.cX / boxW * 100) + '%');  

              this.resetOtherColorBar(boxW,len);

             
         }
       },

       resetOtherColorBar : function(_boxWidth,len){
          //   总宽度 - 其他元素总宽 = 目标元素宽度
            
             var $boxNode = $(this.boxNode);
             var targetColorBar = $boxNode.next('.colorBar');

             // 如果长度是 0 则说明是最后一个，没有next元素
            if(targetColorBar.length === 0) targetColorBar =  $boxNode.prev('.colorBar');

           var screenedColorBars =  box.children('.colorBar').not('[data-index='+ targetColorBar.attr('data-index') +']');
            var  _width = 0;

            screenedColorBars.each(function(index,item){  _width  += $(item).width() })

            var nWidth = _boxWidth - _width;
                nWidth = Math.max(nWidth,this.limiteWidth);   // 限定最小范围

            targetColorBar.width(nWidth);
            targetColorBar.children('input').val(parseInt(nWidth / _boxWidth * 100) + '%');

      }
   };



  // 页面鼠标移动侦听处理 (重要)
  document.onmousemove = function(e){
    var e = window.event || e;
      resizableActions.mToX = e.pageX;

  };

  
    //  鼠标弹起处理
    document.onkeyup = document.onmouseup = function(e){
       clearInterval(resizableActions.movingTimer);
       resizableActions.movingTimer = 0;
       resizableActions.ctrlNode && (resizableActions.ctrlNode.style.left = ''); // (重要)
  }



     // 隐藏 环形选色器
    $(document).on('mousedown',function(event){
          if(!($(event.target).parents().andSelf().is('#bigpicker'))){
               hideFColorPicker();
          }

      });     




 // 注册缩放事件
$('.colorPicker-box').on('mousedown','.colorSlider',function(event){
         resizableActions.ctrlNode = this;
         resizableActions.boxNode = $(this).parent('.colorBar').get(0);
         resizableActions.onMouseDownAction(event);
});



          function init(){
                      FColorPicker = $.farbtastic('#colorApp');  // 初始化环形取色器
                       createEvent();
             };

           init();


  }


/*    colorPickerTool  end  */




// 调用选色
$('.colorPicker-wrapper').colorPickerTool();




$('.submitColor').on('click',function(){

           var colorBars = $('.colorBar'),
               len = colorBars.length,
               param = {};
              if(len <= 0) return false; 

              colorBars.each(function(index,item){
                      param['color'+index] = {
                                         color : $(item).attr('data-color'),
                                         percent : $(item).attr('data-percent')
                                  }
              });

           console.log(param);
            

        /*
          $.post('xxx',{},function(resp){
          })*/

});



   console.log('我艹你妹的，什么鸡巴垃圾代码！');



})