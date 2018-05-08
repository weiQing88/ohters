适合移动端的插件/框架：
swiper (手势滑动 banner) http://idangero.us/swiper/#.WYQk8lV96Uk
mobileValidate (验证) https://github.com/efri-yang/mobileValidate


SUI-Mobile (基于iphone 设计的UI框架) https://github.com/sdc-alibaba/SUI-Mobile






基准： 
当代浏览器默认 字体大小是 16px
设计稿已 750px 为基准,转化到移动端则是 375px





已知网页的根元素字体是 16px, 若要定义一个p元素的12px 字体，用rem单位表示，

算法公式：12px ÷ 16px = 0.75 (rem);


如果需要设置一个 div 的width == 100px 和height == 150px :

设置 width  : 100px ÷ 16px = 6.25 (rem)
设置 height : 150px ÷ 16px =  9.375(rem) 


如果在不借助sass 或 less 等预编译工具，为方便起见，可以把 html 字体设成 100px;

例子：100px ÷ 100px = 1 rem;






根据设计稿适配多个平台。
首先，以iphone6的屏幕（375px）为基准设计，计算出 rem的基准。

（37.5）rem = (window.innerWidth 或是 document.body.clientWidth 或是 window.screen.width) ÷ 10;

这里的 10 是自定义，可以除也可以不除，或选用其他值。


其次，将设计稿上某个元的的值 除以基准值 加上 rem 单位；

例如某个元素在设计稿上的高度是 145px :

145px ÷ rem基准（37.5）≈ 3.87 rem 

样式表现：

xx {
	width : 3.87rem;
}





还需考虑一个问题 -- 设备像素比 dpr
关于设备高像素比 与 低像素比的问题，主要是处理高清图片和border 1pxd 的问题；

首先，获取dpr值

 var dpr = window.devicePixelRatio;


 再者， 1 / dpr 
  meta.setAttribute('content', 'initial-scale=' + 1/dpr + ', maximum-scale=' + 1/dpr + ', minimum-scale=' + 1/dpr + ', user-scalable=no');

 之后， 就不必要 rem  = 37.5 的基准，而是用 75 基准




















