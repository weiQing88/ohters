layui.define(["jquery"],function(i){({currentId:-1,loginStatus:!1,verifiedAction:function(){return console.log("de something"),this},isLogined:function(){return console.log("checking the localstore"),this},init:function(){layui.use("login");var i=$(".layui-body").attr("data-type");return console.log(i),console.log("init the necessary operations"),this}}).isLogined().verifiedAction().init(),i("entry",{})});