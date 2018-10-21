<template>
	<div class="berthing-cancel">
		<bread-title :currentTitle="title"></bread-title>
		<query-form :formTemplate="formTemplate" @queryData="onSubmit"></query-form>
			
		<!-- 表格数据展示 -->
		<el-row>
			<el-table :data="tableData" :stripe="true" size="small" :highlight-current-row="true" @row-dblclick="dblClick($event)" >

			    <el-table-column type="index" ></el-table-column>
			    <el-table-column prop="chName" label="船舶中文名称" ></el-table-column>
			    <el-table-column prop="enName" label="船舶英文名称"></el-table-column>
			    <el-table-column prop="nationality" label="船舶国籍"></el-table-column>
			   
			    <el-table-column prop="arrivalDock" label="抵港码头" ></el-table-column>
			    <el-table-column prop="submitTime" label="申请时间" ></el-table-column>
			    <el-table-column prop="status" label="状态" >
			    	<template slot-scope="scope">
			     			<span>{{scope.row.staus == '0'?'未受理':'已受理'}}</span>
			    	</template>
			    </el-table-column>
			     
			</el-table>
		</el-row>

		<!-- 分页 -->
		<el-row class="pageComponent">
			<el-pagination background layout="prev, pager, next" :page-size="pageData.pageSize"  :total="pageData.total" :current-page.sync="pageData.currentPage" @current-change="selectCurrentPage($event)"></el-pagination>
		</el-row>

		<!-- 审批弹框 -->

		<el-dialog title="取消靠泊申请详情" :visible.sync="dialogFormVisible" width="40%">
			<el-form :model="dialogForm"  :inline="true" size="mini" label-position="right" label-suffix=" :" ref="dialogForm" >
				
			  	<el-row>
			  		<el-col :span="11" :offset='1'>
			  			<el-form-item label="船舶中文名称">
				        	<span>{{dialogForm.chName}}</span>
					    </el-form-item>
			  		</el-col>
					
			  		<el-col :span="11" :offset='1'>
			  			<el-form-item label="船方英文名">
			  				<span>{{dialogForm.enName}}</span>
					    </el-form-item>
			  		</el-col>

			  		<el-col :span="11" :offset='1'>
			  			<el-form-item label="船舶国籍">
			  				<span>{{dialogForm.nationality}}</span>
					    </el-form-item>
			  		</el-col>	
			  		
			  		<el-col :span="11" :offset="1">
					    <el-form-item label="申请人">
				        	<span>{{dialogForm.agentName}}</span>
				    	</el-form-item>
					</el-col>  	
					

					<el-col :span="11" :offset="1">
						<el-form-item label="申请时间">
					        <span>{{dialogForm.submitTime}}</span>
					    </el-form-item>	
					</el-col>

					<el-col :span="11" :offset="1">
					    <el-form-item label="抵港码头">
				        	<span>{{dialogForm.arrivalDock}}</span>
				    	</el-form-item>
					</el-col>

					<el-col :span="11" :offset="1">
						<el-form-item label="抵港泊位">
					        <span>{{dialogForm.arrivalPier}}</span>
					    </el-form-item>	
					</el-col>

					
					<el-col :span="11" :offset="1">
						<el-form-item label="抵港时间">
					        <span>{{dialogForm.arrivalTime}}</span>
					    </el-form-item>	
					</el-col>
					
			  	</el-row>
					
	
			</el-form>
			<div slot="footer">
				<el-button  @click="dialogFormVisible = false" >取 消</el-button>
				<el-button type="primary" @click="saveDialog" v-if="dialogForm.status == 0">受 理</el-button>
			</div>
		</el-dialog>


	</div>
</template>
<script>
	import BreadTitle from '../common/BreadTitle'
	import QueryForm from '../common/QueryForm'
	import {getBerthingsForPage,updateBerthingById} from '@/api'
	export default{
		data:function(){
			return {
				title:'取消靠泊管理',
				formTemplate:{
					button:{add:false},
					model:[
						{name:"chName",type:"text",title:"船方中文名",value:''},
						{name:"status",type:"select",title:"处理状态",data:[
							{"label":"未受理", "value":"0"},
							{"label":"已受理", "value":"1"},
							{"label":"查询全部", "value":""}],
						value:'0'},
						{name:"portId",type:"select",title:"所属港口",data:[],value:''},
					]
				},

				// 查询条件-变量值
				queryFormInfo:{
					chName:'',
					portId:'',
					status:'0'
				},
				//查询条件-分页
				pageObj:{
					page: 1, //当前页
		            rows: 10, //每页条数
		            sort: "submitTime", //排序字段
            		order: "desc" //排序顺序
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
					chName:'',
					agentName:'',
					enName:'',
					companyName:'',
					nationality:'',
					submitTime:'',
					postdock:'',
					postpier:"",
					prepier:"",
					predock:"",
					prepier:"",
					shiftingTime:"",
					arrivalTime:"",
					quickReplyContent:"",
					replyList:[],
					reply:"",
					status:''
				},

			}

		},
		components:{
				BreadTitle,
				QueryForm
		},
		mounted:function(){
			debugger;
			let $this = this;
			this.formTemplate.model[2].data = this.$store.state.portList;

			this.queryFormInfo.portId = this.$store.state.portId;
			//初始化表格
			
			getBerthingsForPage(this.pageObj,this.queryFormInfo,function(resp){
				debugger;
				if(resp.continue){

					$this.tableData = resp.returnValue.rows;
					$this.pageData.total = resp.returnValue.total;
					
				}
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
		            sort: "submitTime", //排序字段
            		order: "desc" //排序顺序
				};

				getBerthingsForPage(this.pageObj,this.queryFormInfo,function(resp){
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
				getBerthingsForPage(this.pageObj,this.queryFormInfo,function(resp){
					debugger;
					$this.tableData = resp.returnValue.rows;
				})
			},
			dblClick:function(currentRowData){
				debugger; 
				this.dialogFormVisible = true;
				this.dialogForm.id =  currentRowData.id;
				this.dialogForm.chName = currentRowData.chName;
				this.dialogForm.enName = currentRowData.enName;
				this.dialogForm.nationality = currentRowData.nationality;
				this.dialogForm.agentName = currentRowData.agentName;
				this.dialogForm.submitTime = currentRowData.submitTime;
				this.dialogForm.arrivalDock = currentRowData.arrivalDock;
				this.dialogForm.arrivalPier = currentRowData.arrivalPier;
				this.dialogForm.status = currentRowData.status;
				this.dialogForm.arrivalTime = currentRowData.arrivalTime;

			},
			saveDialog:function(){
				debugger;
				let $this = this;
				var data = {
	                id: this.dialogForm.id,
	                status: 1
	            }

	            updateBerthingById(data,function(resp){
	            	if(resp.continue){
						//关闭弹框
						$this.dialogFormVisible = false;
						//更新表格
						getBerthingsForPage($this.pageObj, $this.queryFormInfo, function(resp){
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


		}

	}
</script>