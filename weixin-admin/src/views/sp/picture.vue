<template>
  <div class="picture-wrapper">
  	  <el-upload class="upload-picture" 
  	   			action="https://jsonplaceholder.typicode.com/posts/" 
  	  			:on-preview="handlePreview" 
  	  			:on-remove="handleRemove"  
  	  			:limit="3" 
  	  			:on-exceed="handleExceed" 
  	  			>
		  <el-button size="small" type="primary" style="display: inline-block; margin-right: 10px;">点击上传</el-button>
		  <div slot="tip" class="el-upload__tip" style="display: inline-block;">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>

	   <el-table
		    :data="tableData"
		    border
		    style="width: 97.7%; margin:20px auto 0;">

		    <el-table-column type="index" label="序列" width="60" align="center"></el-table-column>

		    <el-table-column prop="img" label="图片" min-width="16%" align="center"></el-table-column>

		    <el-table-column prop="uploadDate" label="上传时间" min-width="16%" align="center"></el-table-column>

		    <el-table-column prop="collection" label="收藏" min-width="16%" align="center"></el-table-column>

		    <el-table-column prop="Analysis" label="分析量" min-width="16%" align="center"></el-table-column>

		     <el-table-column label="操作" min-width="10%" align="center">
		      <template slot-scope="scope">
		        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>

		  </el-table>

  </div>
</template>
<script>
	export default {
		 data(){
		 	 return {
	 	 		  tableData: [{
	 	 		  	  img : '~',
			          uploadDate: '2016-05-02',
			          collection: '54',
			          Analysis: '78'
			        }, {
			         	  img : '~',
				          uploadDate: '2016-05-02',
				          collection: '54',
				          Analysis: '78'
			        }, {
			              img : '~',
				          uploadDate: '2016-05-02',
				          collection: '54',
				          Analysis: '78'
			        }, {
			              img : '~',
				          uploadDate: '2016-05-02',
				          collection: '54',
				          Analysis: '78'
			        }]
		 	 }
		 },
		methods : {
			 indexMethod(index) {
		        return index * 1;
		      },
			 handlePreview(file){

			 },
			handleRemove(file){

			},
		    handleExceed(file){
		     this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`);
		   },
		   handleEdit(index, row){

		   },
		   handleDelete(index, row){

		   }
		}

	}
</script>
<style>
 .picture-wrapper{
 	background-color: #fff;
 	padding-top: 1px;
 	height: 99.9%;
 }
 .upload-picture{
 	width: 97.7%;
 	margin:20px auto 0;
 }
 .el-table__body-wrapper{ overflow: inherit;  }
</style>