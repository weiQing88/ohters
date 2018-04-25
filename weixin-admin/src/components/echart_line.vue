<template>
	<div :class="className" :id="id" :style="{height:height,width:width}" ></div>
</template>
<script>
   import echarts from 'echarts';
   require('echarts/theme/macarons') // echarts 主题
  export default {
  	  data(){
  	  	 return {
  	  	 	 chart : null
  	  	 }
  	  },
  	 props : {
  	 	  width : {
  	 	  	 type : String,
  	 	  	 default : '100%'
  	 	  },
  	 	 height : {
  	 	 	 type : String,
  	 	 	 default : '500px'
  	 	 },
  	 	 className : {
  	 	 	type : String,
  	 	 	default : 'echart_line_wrapper'
  	 	 },
  	 	id : {
  	 		 type : String,
  	 		 required : true,
  	 		 default : 'ecahrt-line-' + Math.ceil(Math.random() * new Date().getTime()) 
  	 	},
  	   autoResize : {
  	   	   type : Boolean,
  	   	    default : true
  	   }
  	 },

    mounted(){
    	// 由于 echart 需要获取 真是的DOM节点，必须在此初始化
		this.initChart();
		if(this.autoResize){
			   
		}	
    },
   beforeDestroy(){
   	  if(!this.chart) return false;
    	  this.chart.dispose(); // 销毁 echart 实例，释放内存.
          this.chart = null
   },
    methods : {
    	 initChart(){
    	 	 this.chart = echarts.init(document.getElementById(this.id), 'macarons');

             this.chart.setOption({
             	         legend: {
             	         	      show :true,
						          icon: 'rect',
						          itemWidth: 14,
						          itemHeight: 5,
						          itemGap: 13,
						          data: ['visitors', 'buyers'],
						          right: '1%',
						          top : '2%',
						          textStyle: {
						            fontSize: 12,
						            color: '#afafb0 ' // #F1F1F3
						          }
				        },
				        xAxis: {
				          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				          boundaryGap: false
				        },
				        grid: {
				          left: 10,
				          right: 10,
				          bottom: 20,
				          containLabel: true
				        },

				        tooltip: {
				          trigger: 'axis',
				          axisPointer: {
				            type: 'cross'
				          }
				        },
				        yAxis: {},
				        series: [
				        {
				          name: 'visitors',
				          // itemStyle: {
				          //   normal: {
				          //     areaStyle: {}
				          //   }
				          // },
				          smooth: true,
				          type: 'line',
				          data: [100, 120, 161, 134, 105, 160, 165],
				          animationDuration: 2600,
				          animationEasing: 'cubicInOut'
				        },

				        {
				          name: 'buyers',
				          smooth: true,
				          type: 'line',
				          itemStyle: {
				            normal: {
				              color: 'rgba(2, 197, 233, 0.2)',
				              lineStyle: {
				                color: 'rgba(2, 197, 233, 0.2)'
				              },
				              areaStyle: {
				                color: 'rgba(99,194,255, 0.6)'
				              }
				            }
				          },
				          data: [120, 82, 91, 154, 162, 140, 130],
				          animationDuration: 2000,
				          animationEasing: 'quadraticOut'
				        }]
				      })

    	 }
    }
  }
</script>
<style scoped lang="less">
  .echart_line_wrapper{
     background-color: #fff !important;
     border-radius: 5px;
  }
</style>