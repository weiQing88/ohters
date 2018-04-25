<template>
  <el-container style="height:100%;">

 <!--   侧边栏 START  -->
  <el-aside :width="asideWidth" style="background-color: #304156">

 <!-- 【条件】： 侧边航栏需要根据角色权限动态渲染 -->
    <el-menu  :default-openeds="opendIndex"
    		      background-color="#304156"
          		text-color="#fff"
          		active-text-color="#ffd04b"
          		class="el-menu-vertical-custom"
              :router="true"
              :default-active="$route.path"  
              @select="handleSelect"
              @open="handleOpen" 
              @close="handleClose" 
              :collapse="isCollapsed"
       >

  <template v-for="(route,index) in routesmap" >

      <el-submenu :index="index.toString()" :key="index" v-if="!route.hidden&&!route.noRedirect">

        <template slot="title"><i :class="route.icon"></i><span slot="title">{{ route.title }}</span></template>
      
         <el-menu-item :index="routeComputed(route.path,subRoute.path)" v-for="(subRoute, j) in route.children"  :key="j">
          {{ subRoute.name }}

          </el-menu-item>
      </el-submenu>

        <el-menu-item :index="route.path" :key="index" v-if="!route.hidden&&!route.children">{{route.name}}</el-menu-item>

        <el-menu-item :index="routeComputed(route.path,route.children[0].path)" :key="index" v-if="route.noRedirect">
              <i :class="route.icon"></i>
              <span slot="title"> {{route.name}}</span>
              </el-menu-item>

        </template>

  

    </el-menu>


  </el-aside>
 <!--   侧边栏 END  -->

  
<!--   网站内容主体区 START  -->
  <el-container>

  <!--  头部 START  -->
    <el-header height="50px" style="text-align: right; font-size: 12px; padding-left: 0;" class="clearfix">

      <span class="collapse-btn fl" @click="onCollapse" >
         <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xxx"></use>
          </svg>
      </span>

      <el-dropdown trigger="click" @command="handleCommand" class="el-dropdown-custom">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{name}}</span>

    </el-header>
  <!--    头部 END  -->
    

<!--    面包屑 START  -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="r.path" v-for="(r,index) in breadlist" :key="index">{{r.name}}</el-breadcrumb-item>
   </el-breadcrumb>
<!--    面包屑 END  -->


   <!--  视图区域 START  -->
    <el-main style="background-color:#f0f2f5"><router-view></router-view></el-main>
    <!--  视图区域 END  -->

  </el-container>
  <!--   网站内容主体区 END  -->
 </el-container>
</template>

<script>
import { getUser, setOpenIndex, removeIndex, getOpenIndex} from '@/utils'


 export default {
 	  data(){
 	  	 return {
            name : '',
            id : '',
            role : '',
            portrait : '',
            opendIndex : getOpenIndex(),  // 从本地获取 index，防止刷新
            breadlist : [],   // 面包屑
            isCollapsed : false,
            asideWidth : '200px'
 	  	 }
 	  },
 	  methods : {
 	  	 handleCommand(command){
 	  	 	  if(command == 'logout'){
 	  	 	  	   // 执行退出登录动作
 	  	 	  }
 	  	 },
        handleOpen(index){   // 控制导航下拉展开项
           if(getOpenIndex().indexOf(index) != -1) return false;
             this.opendIndex.push(index); // 需存在 cookie 中，防止刷新页面
             setOpenIndex(index);
        },
        handleClose(index){
          // console.log(index);
        },
        handleSelect(index){
           //console.log(index);
        },
        isCollapse(index){
          // console.log(index);
        },
        routeComputed(parentRoute,childRoute){  // 过滤 route 是否是 ‘/’
            if(/^\/$/g.test(parentRoute)){
                 return  '/' + childRoute
            }else{
                return  parentRoute + '/' + childRoute
            }
        },
       getBreadcrumb(){  // 自定义动态创建按键式面包屑 【改日优化】
          if(this.$route.name){
             this.$store.dispatch('GEBERATE_BREAKROUTES_ACTION',this.$route)
          }
       },
       normalBreadcrumb(){  //  element-ui 面包屑
        let RoutesArray = [];
        Array.forEach(this.$route.matched,function(r,i){  RoutesArray.push({ name : r.name, path : r.path }) })
      // if(this.breadlist.length && this.breadlist.some((r,i) => r.path ===  RoutesArray[i].path )) return false;
         this.breadlist = RoutesArray
       },
       onCollapse(){
           this.isCollapsed = !this.isCollapsed;
           if(this.isCollapsed){
                 this.asideWidth = '65px'
           }else{
                this.asideWidth = '170px'
           }
          // el-icon-d-arrow-right
           // console.log('')
       }

 	  },
    beforeRouteEnter(to, from ,next){   // 导航栏 opendIndex 赋值
         //console.log(to);
         next(vm => { })
    },
   mounted(){   // 获取已登录用户存在本地缓存信息
      var user =  getUser();
      this.name = user.name;
      this.portrait = user.portrait;
   },
  computed : {
       routesmap (){
           return this.$store.getters.routesmap;
       }
    },
   watch : {  // 采用 watch 方法更新面包屑
       $route : {
         immediate: true,
         handler(){
             this.normalBreadcrumb() 
         }
       }
   }

  }


</script>
<style lang="less">
.el-aside{ 
  overflow: inherit;
  transition: width .28s;
   }
 .el-menu-vertical-custom.el-menu--collapse{ border-right: none;}
 .el-menu-vertical-custom:not(.el-menu--collapse) {
   border-right:none;
  }
 .el-submenu__title{ font-weight: bolder; }
 .el-dropdown-custom{
     height: 50px;
     line-height: 50px;

 }
 .el-icon-setting{
    font-size: 20px;
    position: relative;
    top: 4px;
 }
  .el-header>span{
     fonts-zie:18px;
     font-weight: bold;
  }

.el-header{
  border-bottom: 1px solid #f8f8f8;
}

.el-breadcrumb{
    padding: 15px 0 15px 10px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
}

.el-dropdown-custom .el-dropdown-selfdefine{
  cursor: pointer;
}


.collapse-btn{
   width: 30px;
   height: 50px;
   line-height: 50px;
   text-align: center;
   cursor: pointer;
}

</style>