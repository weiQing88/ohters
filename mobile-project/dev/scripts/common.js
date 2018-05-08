

/*** 微信分享  start ***/
/*wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: wxConfig.appId, // 必填，公众号的唯一标识
    timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
    nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
    signature: wxConfig.signature,// 必填，签名，见附录1
    jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.ready(function () {
    //分享到朋友圈
    wx.onMenuShareTimeline({
        title: '2018趋势成衣主题订货会', // 分享标题
        link: wxConfig.link,
        imgUrl: wxConfig.imgUrl , // 分享图标
        success: function () {
            // 分享成功回调函数
        },
        cancel: function () {
            // 取消分享回调函数
        }
    });


    //分享给朋友
    wx.onMenuShareAppMessage({
        title: '2018趋势成衣主题订货会', // 分享标题
        desc: wxConfig.desc,
        link: wxConfig.link,
        imgUrl: wxConfig.imgUrl, // 分享图标
        trigger: function (res) { },
        success: function (res) {
            // 分享成功回调函数
        },
        cancel: function (res) {
            // 取消分享回调函数
        },
        fail: function (res) {
            // 分享失败回调函数
        }
    });


});*/

/*** 微信分享  end ***/




/*   控制背景音乐 START   */
 var musicController = {
      isPlayed : false,
      musicNode : document.querySelector('#bgm'),
      musicButton : $('#playMusic'),
      playMusic : function(musicButton){
          this.musicNode.play();
          this.musicButton.removeClass('pausedMusic').addClass('playMusic');
      },
      pausedMusic : function(){
         this.musicButton.removeClass('playMusic').addClass('pausedMusic'); 
         this.musicNode.pause();
      },
      button_aminate : function(){ this.musicNode.paused ? this.playMusic() : this.pausedMusic(); }
 };



$.fn.extend({
   musicController : function(){
     this.on('click',function(){
          musicController.button_aminate();
     })
   }
});

/*   控制背景音乐 END   */




 function audioAutoPlay(){
        document.addEventListener('WeixinJSBridgeReady',function(){
          musicController.button_aminate(); 
          musicController.isPlayed = true;
        },false);
        document.addEventListener('YixinJSBridgeReady',function(){
          musicController.button_aminate(); 
          musicController.isPlayed = true;
       },false);

      document.addEventListener("touchstart",function(){  
          musicController.isPlayed ? '': musicController.button_aminate(),musicController.isPlayed = true; 
       }, false);     

 }



//自动播放音乐
audioAutoPlay();



 // 整个文档元素载入完成后
$(window).load(function(){    $('#playMusic').musicController()  });





    // 向上箭头
   function upArrow(){
        if($('#swipe_up').length <= 0) return false;
        var isHidden = false,
            $winNode = $(window),
            $dcmNode = $(document),
            adjustment = 50,
            $arrowNode = $('#swipe_up');
      $winNode.scroll(function() {
        var dcmScroll = $dcmNode.scrollTop();
        if(dcmScroll >= $dcmNode.height() - $winNode.height() - adjustment ) {   // 滚动条已经到达底部
            $arrowNode.hide();
            isHidden = true;
        }else{
             isHidden && ($arrowNode.show(),isHidden = false)
        }
    });

   }

 upArrow();

  
  