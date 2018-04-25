 $.fn.colorPickerTool = function(){



      var FColorPicker = null;

      var barIndex = 1;
          wrapper =  this,
          box = this.children('.colorPicker-box'),
          addButton = this.children('.addColorBar'),
          boxW = box.width(),
          perWidth = 0, // 每个元素的宽度
          textPercent = 0,
          currColor = 0,
          liveColor = 0,
          liveTarget = null,
          isCreate = true;




      // 创建ColorBar
      function createColorBar(){
            var index = box.children('.colorBar').length;
            var colorBarObject = $('<div class="colorBar" data-index="'+ index +'" data-percent="'+ textPercent +'" data-color="'+  currColor +'" style=" width:'+ perWidth +'px; background-color:'+ currColor +';" > \
               <i class="delectColorBar"></i> \
               <em class="resetcolor" ></em> \
               <input type="text" readonly value="'+ textPercent +'%">\
               <span class="colorSlider"></span></div>');
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
    /*  addButton.bigColorpicker(function(el,color){},"L",6,function(color){
                 currColor = color;
                 createEventAction();
          });
*/
  

    addButton.on('click',function(){  $('#jqColorApp-box').show()  });





    
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

 
    
      // 实时修改目标元素颜色
    function liveColorCallBack(color){

              liveTarget && liveTarget.css('backgroundColor',color).attr('data-color',color);
    }




     // 选中单个colorBar 调色
    /* box.on('click','em',function(){
               var parent = $(this).parent('.colorBar');
               showFColorPicker();
               FColorPicker.linkTo(function(color){
                    parent.css('backgroundColor',color);
                    parent.attr('data-color',color);

               });

          });*/

     box.on('click','em',function(){   

        liveTarget = $(this).parent('.colorBar');  
        isCreate = false; 
        $('#jqColorApp-box').show();

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
          minNumber : 21,
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
              var  maxMunber = 0;
              var  limitednum = 0;

              var x = parseInt(this.mToX - this.mStartX);
                this.cX = x;

             $(this.boxNode).siblings().each(function(index,item){  maxMunber += parseInt($(item).attr('data-percent'))  });

              limitednum =  Math.floor(this.cX / boxW * 100);
              
              limitednum < 0 ? limitednum = 21 : '';

              maxMunber += limitednum;

               console.log(limitednum);
               console.log(maxMunber);
               console.log(this.minNumber);
            
            if(maxMunber >= 101 || limitednum <= 20 || this.minNumber <= 20) return false;


              this.ctrlNode.style.left = this.cX + 'px';

              this.boxNode.style.width = this.cX + 'px';

              this.boxNode.setAttribute('data-percent',limitednum);

              $(this.boxNode).children('input').val(limitednum + '%');  

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


            this.minNumber =  Math.floor(nWidth / _boxWidth * 100);
            this.minNumber <= 20 ? this.minNumber = 21 : '';

            targetColorBar.width(nWidth).attr('data-percent',this.minNumber);
            targetColorBar.children('input').val(this.minNumber + '%');

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
        /*  if(!($(event.target).parents().andSelf().is('#bigpicker'))){
               hideFColorPicker();
          }*/

      });     




 // 注册缩放事件
$('.colorPicker-box').on('mousedown','.colorSlider',function(event){
         resizableActions.ctrlNode = this;
         resizableActions.boxNode = $(this).parent('.colorBar').get(0);
         resizableActions.onMouseDownAction(event);
});


          function init(){
                   //   FColorPicker = $.farbtastic('#colorApp');  // 初始化环形取色器



                  // 初始化颜色选择APP
                   $('#jqColorApp').jPicker({
                                          color: {
                                             mode : 'h'
                                          },
                                          images : {
                                              clientPath : 'images/'
                                          },
                                          localization : {
                                              text : {
                                                   title : '拖动圆环选色',
                                                   newColor: '新色',
                                                   currentColor: '当前色',
                                              }
                                          }
                                        },function(color,context){  // 点击 ok 按键 回调函数
                                                      currColor = '#' + color.val().hex;

                                                     context.context.parentNode.style.display = 'none';  

                                                      isCreate && createEventAction();

                                                     isCreate = true;

                                              },
                                              function(color,context){ // 鼠标在色板上滑动回调函数

                                                     liveColor = '#' + color.val().hex;

                                                     liveColorCallBack(liveColor);

                                              },
                                              function(color,context){  // 点击取消回调函数

                                                   context.context.parentNode.style.display = 'none';  

                                                   isCreate = true;

                                              });

                     
             };

           init();


  }































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
          currColor = 0,
          liveColor = 0,
          liveTarget = null,
          isCreate = true;


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
    /*   addButton.bigColorpicker(function(el,color){},"L",6,function(color){
                 currColor = color;
                 createEventAction();
          });
*/
 
        // 创建ColorBar，并判断是否多于四个
        addButton.on('click',function(){  $('#jqColorApp-box').show();  });




    
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
                     return false;
             })
             .on('mouseout','.colorBar',function(){
                   $(this).children('i').hide();
                   $(this).children('em').hide();
                    return false;
             });




   /* function showFColorPicker(){  $('#colorApp').show() }
    function hideFColorPicker(){  $('#colorApp').hide()   }*/

 


      // 实时修改目标元素颜色
    function liveColorCallBack(color){
              liveTarget && liveTarget.css('backgroundColor',color).attr('data-color',color);
    }



     // 选中单个colorBar 调色
/*     box.on('click','em',function(){
               var parent = $(this).parent('.colorBar');
               showFColorPicker();
               FColorPicker.linkTo(function(color){
                    parent.css('backgroundColor',color);
                    parent.attr('data-color',color);

               })

          });
*/


        // 选中单个colorBar 调色
         box.on('click','em',function(){   
                liveTarget = $(this).parent('.colorBar');  
                isCreate = false; 
                $('#jqColorApp-box').show();
                return false;

      });




   


   // 如果还没创建colorBar,父元素也可以打开选色器
   box.on('click',function(event){
         if($(this).children('.colorBar').length <= 0) addButton.trigger('click');
         event.stopPropagation();
         return false
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
          minNumber : 20,
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
              var  maxMunber = 0;
              var  limitednum = 0;

              var x = parseInt(this.mToX - this.mStartX);
                this.cX = x;

             $(this.boxNode).siblings().each(function(index,item){  maxMunber += parseInt($(item).attr('data-percent'))  });

              limitednum =  Math.floor(this.cX / boxW * 100);
              limitednum < 0 ? limitednum = 21 : '';

              maxMunber += limitednum;


            if(maxMunber >= 101 || limitednum < 20 || this.minNumber < 20) return false;
          
              this.ctrlNode.style.left = this.cX + 'px';

              this.boxNode.style.width = this.cX + 'px';

              this.boxNode.setAttribute('data-percent',limitednum);

              $(this.boxNode).children('input').val(limitednum + '%');  

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

            this.minNumber =  Math.floor(nWidth / _boxWidth * 100);
            this.minNumber <= 20 ? this.minNumber = 21 : '';
            targetColorBar.width(nWidth).attr('data-percent',this.minNumber);
            targetColorBar.children('input').val(this.minNumber + '%');

      }
   };



  // 页面鼠标移动侦听处理 
  document.onmousemove = function(e){
    var e = window.event || e;
      resizableActions.mToX = e.pageX;
      return false;

  };

  
    //  鼠标弹起处理
    document.onkeyup = document.onmouseup = function(e){
       clearInterval(resizableActions.movingTimer);
       resizableActions.movingTimer = 0;
       resizableActions.ctrlNode && (resizableActions.ctrlNode.style.left = ''); // (重要)
       return false;
  }



     // 隐藏 环形选色器
  /*  $(document).on('mousedown',function(event){
          if(!($(event.target).parents().andSelf().is('#bigpicker'))){
               hideFColorPicker();
          }

      });     */



 // 注册缩放事件
$('.colorPicker-box').on('mousedown','.colorSlider',function(event){
         resizableActions.ctrlNode = this;
         resizableActions.boxNode = $(this).parent('.colorBar').get(0);
         resizableActions.onMouseDownAction(event);
         return false;
});


        // 初始化颜色选择APP
         $('#jqColorApp').jPicker({
                                color: {
                                   mode : 'h'
                                },
                                images : {
                                    clientPath : GlobalIMAGEPATH + 'temp/'  // GlobalIMAGEPATH 在模板中由后台赋值
                                },
                                localization : {
                                    text : {
                                         title : '拖动圆环选色',
                                         newColor: '新色',
                                         currentColor: '当前色',
                                    }
                                }
                              },function(color,context){
                                             currColor = '#' + color.val().hex;
                                             context.context.parentNode.style.display = 'none';  
                                             isCreate && createEventAction();
                                             isCreate = true;
                                    },
                                    function(color,context){
                                             liveColor = '#' + color.val().hex;
                                             liveColorCallBack(liveColor);

                                    },
                                    function(color,context){
                                           context.context.parentNode.style.display = 'none';  
                                           isCreate = true;
                                    });



        /*  function init(){
                      FColorPicker = $.farbtastic('#colorApp');  // 初始化环形取色器
                 
             };
*/
          


  }


/*    colorPickerTool  end  */
