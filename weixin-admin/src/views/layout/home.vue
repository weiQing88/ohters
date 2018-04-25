<template>
	<div class="home-chart">
	 <echart-line id="home-chart-item"></echart-line>
	</div>
</template>
<script> 
 import echartLine from '@/components/echart_line'
 export default {
		 data(){
		 	 return {
		 	 	chart : null
		 	 }
		 },
       components : { echartLine }
	}
</script>
<style lang="less" scoped>
	
</style>
