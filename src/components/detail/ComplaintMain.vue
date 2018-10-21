<template>
	<div class="complaint-main">
		<bread-title :currentTitle="title"></bread-title>
		<query-form :formTemplate="formTemplate" @queryData="onSubmit"></query-form>
		<!-- 表格数据展示 -->
		<el-row>
			<el-table :data="tableData" :stripe="true" size="small" :highlight-current-row="true" @row-dblclick="dblClick($event)" @sort-change="sortChange($event)">

			    <el-table-column type="index" ></el-table-column>
			    <el-table-column prop="name" label="投诉举报人" ></el-table-column>
			    <el-table-column prop="createTime" label="投诉时间" sortable></el-table-column>
			    <el-table-column prop="content" label="投诉内容" min-width="200px"></el-table-column>
			   
			    <el-table-column  label="相关图片">
			    	<template slot-scope="scope">
			    		<span class="previewImage" @click="previewImg(scope.row.images)">点击查看图片</span>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="serviceCode" label="处理人" >
			    	<template slot-scope="scope">
			    		<span>{{scope.row.serviceCode?scope.row.serviceCode:'--'}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="status" label="处理状态" >
			    	<template slot-scope="scope">
			     			<span>{{scope.row.status == '0'?'未受理':'已受理'}}</span>
			    	</template>
			    </el-table-column>
			     
			</el-table>
		</el-row>

		<!-- 分页 -->
		<el-row class="pageComponent">
			<el-pagination background layout="prev, pager, next" :page-size="pageData.pageSize"  :total="pageData.total" :current-page.sync="pageData.currentPage" @current-change="selectCurrentPage($event)"></el-pagination>
		</el-row>
		<!-- 审批弹框 -->

		<el-dialog title="举报投诉详细信息" :visible.sync="dialogFormVisible" width="40%" @close="closeDialog">
			<el-form :model="dialogForm"  :inline="true" size="mini" label-position="right" label-suffix=" :" ref="dialogForm" >
				
			  	<el-row>
			  		<el-col :span="11" :offset='1'>
			  			<el-form-item label="投诉人">
				        	<span>{{dialogForm.name}}</span>
					    </el-form-item>
			  		</el-col>
					
			  		<el-col :span="11" :offset='1'>
			  			<el-form-item label="投诉时间">
			  				<span>{{dialogForm.createTime}}</span>
					    </el-form-item>
			  		</el-col>

			  		<el-col :span="11" :offset='1'>
			  			<el-form-item label="相关图片">
			  				<span class="previewImage" @click="previewImg(dialogForm.images)">点击查看图片</span>
					    </el-form-item>
			  		</el-col>	
			  		
			  		<el-col :span="23" :offset="1">
					    <el-form-item label="投诉内容">
				        	<span>{{dialogForm.content}}</span>
				    	</el-form-item>
					</el-col>  	
					
				</el-row>
				<el-row class="borderTop">
					<el-col :span="23" :offset="1">
						<el-form-item label="处理状态">
					       	<el-radio-group v-model="dialogForm.status" v-if="dialogForm.currentStatus == '0'">
						      <el-radio label="1">回复</el-radio>
						      <el-radio label="2">不需回复</el-radio>
						    </el-radio-group>					
					  		<span v-else>{{dialogForm.currentStatus == '1'?'已回复':'不需回复'}}</span>	
					    </el-form-item>	
					</el-col>
					
					<el-col :span="23" :offset="1" v-if="dialogForm.currentStatus == '0'">
						<el-form-item label="常用回复">
				  			<el-select v-model="dialogForm.quickReplyContent" @change="changeReply($event)">
				  				<el-option v-for="reply in dialogForm.replyList" :label="reply.content" :value="reply.content"></el-option>
				  			</el-select>
				  		</el-form-item>
					</el-col>

					<el-col :span="23" :offset="1" >
				  		<el-form-item label="回复内容" prop='reply' ref='reply' >
				  			 <el-input type="textarea" v-model="dialogForm.reply" :rows="4" style='width:360px' v-if="dialogForm.currentStatus == '0'"></el-input>
				  			 <span v-else>{{dialogForm.replyText}}</span>
				  		</el-form-item>
				  	</el-col>
				  	<el-col :span="23" :offset='1' v-if="dialogForm.currentStatus != '0'">
				  		<el-form-item label="处理人">
				  			<span>{{dialogForm.serviceCode}}</span>
				  		</el-form-item>
				  	</el-col>
			  	</el-row>
					
	
			</el-form>
			<div slot="footer">
				<el-button  @click="dialogFormVisible = false" >取 消</el-button>
				<el-button type="primary" @click="saveDialog" v-if="dialogForm.currentStatus == 0">受 理</el-button>
			</div>
		</el-dialog>
		

		<!-- 查看图片 -->
		<preview-image :show='previewImageDialog' :imageSource="images" @closeDialog="closePrevDialog"></preview-image>
	</div>
</template>
<script>
	import BreadTitle from '../common/BreadTitle'
	import QueryForm from '../common/QueryForm'
	import PreviewImage from '../common/PreviewImage'
	import {getComplaintsForPage,getQuickReplay,updateComplaintById} from '@/api'
	export default{
		data:function(){
			return {
				title:'用户投诉',
				formTemplate:{
					button:{add:false},
					model:[
						{name:"serviceCode",type:"text",title:"处理人",value:''},
						{name:"status",type:"select",title:"处理状态",data:[
							{"label":"未回复", "value":"0"},
							{"label":"已回复", "value":"1"},
							{"label":"不用回复", "value":"2"},
							{"label":"查询全部", "value":""}],
						value:'0'},
						{name:"portId",type:"select",title:"所属港口",data:[],value:''},
					]
				},

				// 查询条件-变量值
				queryFormInfo:{
					serviceCode:'',
					portId:'',
					status:'0'
				},
				//查询条件-分页
				pageObj:{
					page: 1, //当前页
		            rows: 10, //每页条数
		            sort: "", //排序字段
            		order: "" //排序顺序
				},
				tableData:[],
				//分页组件变量
				pageData:{
					total:0,
					pageSize:10,
					currentPage:1
				},
				//审批弹框
				dialogFormVisible:false,
				dialogForm:{
					id:'',
					name:'',
					createTime:"",
					content:"",
					status:"",
					currentStatus:"",
					quickReplyContent:'',
					replyList:[],
					reply:'',
					replyText:'',
					serviceCode:'',
					images:''
				},
				previewImageDialog:false,
				images:[]

			}

		},
		components:{
				BreadTitle,
				QueryForm,
				PreviewImage
		},
		mounted:function(){
			debugger;
			let $this = this;
			this.formTemplate.model[2].data = this.$store.state.portList;

			this.queryFormInfo.portId = this.$store.state.portId;
			//初始化表格
			
			getComplaintsForPage(this.pageObj,this.queryFormInfo,function(resp){
				debugger;
				if(resp.continue){
					$this.tableData = resp.returnValue.rows;
					$this.pageData.total = resp.returnValue.total;
				}
			})

			//初始化审批框的快速回复下拉
			getQuickReplay({"module": "举报投诉"},function(resp){
				debugger;
				$this.dialogForm.replyList = resp.returnValue;

			})
		},
		methods:{
			onSubmit:function(data){
				debugger;
				let $this = this;

				this.queryFormInfo = data;

				this.pageObj = {
					page: 1,  //当前页
		            rows: 10, //每页条数
		            sort: "", //排序字段
            		order: "" //排序顺序
				};

				getComplaintsForPage(this.pageObj,this.queryFormInfo,function(resp){
					debugger;
					if(resp.continue){

						$this.tableData = resp.returnValue.rows;
						$this.pageData.total = resp.returnValue.total;
						$this.pageData.currentPage = 1;
						
					}
				})

			},
			selectCurrentPage:function(currentPageNum){
				debugger;
				this.pageObj.page = currentPageNum;
				let $this = this;
				getComplaintsForPage(this.pageObj,this.queryFormInfo,function(resp){
					debugger;
					$this.tableData = resp.returnValue.rows;
				})
			},
			sortChange:function(orderInfo){
				debugger;
				let $this = this;
				let orderObj = {
					sort:orderInfo.prop,
					order:orderInfo.order == 'descending' ? 'desc' : 'asc' 
				}
				getComplaintsForPage(orderObj,this.queryFormInfo,function(resp) {
                    debugger;
				    $this.tableData = resp.returnValue.rows;
				    $this.pageData.total = resp.returnValue.total;
                })
			},
			dblClick:function(currentRowData){
				debugger; 

				this.dialogFormVisible = true;
				this.dialogForm.id =  currentRowData.id;
				this.dialogForm.name = currentRowData.name;
				this.dialogForm.createTime = currentRowData.createTime;
				this.dialogForm.content = currentRowData.content;
				this.dialogForm.submitTime = currentRowData.submitTime;
				
				this.dialogForm.status = '1';
				this.dialogForm.currentStatus = currentRowData.status;
				this.dialogForm.images = currentRowData.images;

				this.dialogForm.replyText = currentRowData.reply || '';
				this.dialogForm.serviceCode = currentRowData.serviceCode;

			},
			changeReply:function(item){
				debugger;
				this.dialogForm.reply = item;
			},
			saveDialog:function(){
				debugger;
				let $this = this;
				var data = {
					id:this.dialogForm.id,
	                status: this.dialogForm.status,
	                reply:this.dialogForm.reply
	            }

	            updateComplaintById(data,function(resp){
	            	if(resp.continue){
						//关闭弹框
						$this.dialogFormVisible = false;
						//更新表格
						getComplaintsForPage($this.pageObj, $this.queryFormInfo, function(resp){
							debugger;
							$this.tableData = resp.returnValue.rows;
							$this.pageData.total = resp.returnValue.total;
							$this.$message({
				          		message: "更新成功",
				          		type:"success"
					        });	

						})	
					}


	            })

			},
			closeDialog:function(){
				debugger;
				this.dialogForm.status = '1';
				this.dialogForm.reply = '';
				this.dialogForm.images = '';
			},
			previewImg:function(imgUrl){
				debugger;
				// imgUrl = "/upload/20181017/29147857462896735758.jpg,/upload/20181017/29147858751498269810.jpg";
				if(imgUrl.length == 0){
					this.$message({
						type:"info",
						message:"没有图片可以查看"
					})
				}else{

					this.previewImageDialog = true;
					this.images = imgUrl.split(',');
				}
			},
			closePrevDialog:function(){
				debugger;
				this.previewImageDialog = false;
			}


		}

	}
</script>
<style>
	.borderTop{
		padding-top:10px;
		border-top: 1px solid #ccc;
	}
	.previewImage{
		color:#0099CC;
	}
	.previewImage:hover{
		cursor:pointer;
		color:#FF6600
	}
</style>