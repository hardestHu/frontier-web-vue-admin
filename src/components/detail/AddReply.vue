<template>
	<div class="add-reply">
		<bread-title :currentTitle="title"></bread-title>
		<el-row>
  			<el-button type="primary" size="medium" class="margin-left-20 margin margin-bottom-20" @click="addReply">新 增</el-button>
			<!-- <el-button size="medium" @click='deleteReply'>删 除</el-button> -->
		</el-row>
		<query-form :formTemplate="formTemplate" @queryData="onSubmit"></query-form>
		<!-- 表格数据展示 -->
		<el-row>
			<el-table :data="tableData" :stripe="true" size="small" :highlight-current-row="true" @row-dblclick="dblClick($event)" @selection-change="handleSelectionChange">
				<!-- <el-table-column type="selection"></el-table-column> -->
			    <el-table-column prop="id" label="编号" ></el-table-column>
			    <el-table-column prop="content" label="常用回复内容"></el-table-column>
			    <el-table-column prop="module" label="所属模块"></el-table-column>
			    <el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click.native.prevent="deleteRow(scope.$index,scope.row)" type="text"size="small"> 移除 </el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>	
		<!-- 分页 -->
		<el-row class="pageComponent">
			<el-pagination background layout="prev, pager, next" :page-size="pageData.pageSize"  :total="pageData.total" :current-page.sync="pageData.currentPage" @current-change="selectCurrentPage($event)"></el-pagination>
		</el-row>
		<!-- 新增弹框 -->

		<el-dialog title="新增常用回复" :visible.sync="dialogFormVisible" width="40%" @close="closeDialog">
			<el-form :model="dialogForm"  :inline="true" size="mini" label-position="right" label-suffix=" :" ref="dialogForm" label-width="120px" :rules="rules">
				
			  	<el-row>
			  	
			  		<el-col :span="23" :offset='1'>
			  			<el-form-item label="常用回复内容" prop="content">
				        	<el-input type="textarea" v-model="dialogForm.content" :autosize="{minRows: 10,maxRows:16}"  style="width:300px"></el-input>
					    </el-form-item>
			  		</el-col>
					

			  		<el-col :span="23" :offset='1'>
			  			<el-form-item label="应用模块" prop="module">
				        	<el-select v-model="dialogForm.module">
				  				<el-option v-for="module in dialogForm.moduleList" :label="module.name" :value="module.name"></el-option>
				  			</el-select>
					    </el-form-item>
			  		</el-col>
				</el-row>
	
			</el-form>
			<div slot="footer">
				<el-button  @click="dialogFormVisible = false" >取 消</el-button>
				<el-button type="primary" @click="saveDialog">保 存</el-button>
			</div>
		</el-dialog>
	

	</div>
</template>
<script>
	import BreadTitle from '../common/BreadTitle'
	import QueryForm from '../common/QueryForm'
	import {getQuickReplysForPage,getDictionarys,deleteQuickReplyById,insertQuickReply} from '@/api'
	export default{
		data:function(){
			return {
				title:"常用回复",
				// 查询条件-变量值
				queryFormInfo:{
	                content: "",
	                module: "",
				},
				formTemplate:{
					button:{add:false},
					model:[
						{title:"回复内容",type:"text",name:"content",value:""},
						{title:"模块名称",type:"select",name:"module",data:[],value:""},

					]
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
				multipleSelection:[],
				//添加弹框
				dialogFormVisible:false,
				dialogForm:{
					content:"",
					module:"备案",
					moduleList:[]
				},
				rules:{
					content:[
			            { required: true, message: '请输入回复内容', trigger: 'blur' },
			            { max:300, message: '长度需要小于 300 个字符', trigger: 'blur' }
					],
				}

			}
		},
		components:{
			BreadTitle,
			QueryForm
		},
		mounted:function(){
			debugger;
			let $this = this;
			
			//初始化表格
			getQuickReplysForPage(this.pageObj,this.queryFormInfo,function(resp){
				debugger;
				if(resp.continue){
					$this.tableData = resp.returnValue.rows;
					$this.pageData.total = resp.returnValue.total;
				}
			})
			getDictionarys({ "index": "replyModule" },function(resp){
				debugger;
				let moduleList = resp.returnValue;
				//新增框里面的下拉
				$this.dialogForm.moduleList = JSON.parse(JSON.stringify(moduleList));


				//查询表单的弹框
				moduleList.forEach(function(item,index){
					item.label = item.name;
					item.value = item.name;
				})
				moduleList.unshift({label:'所有模块',value:""});
				$this.formTemplate.model[1].data = moduleList;
			})

		},
		methods:{
			addReply:function(){
				debugger;
				this.dialogFormVisible = true;

			},
			onSubmit:function(data){
				debugger;
				let $this = this;
				this.queryFormInfo.content = data.content;
				this.queryFormInfo.module = data.module;

				this.pageObj = {
					page: 1,  //当前页
		            rows: 10, //每页条数
		            sort: "", //排序字段
            		order: "" //排序顺序
				};

				getQuickReplysForPage(this.pageObj,this.queryFormInfo,function(resp){
					debugger;
					if(resp.continue){

						$this.tableData = resp.returnValue.rows;
						$this.pageData.total = resp.returnValue.total;
						$this.pageData.currentPage = 1;
						
					}
				})


			},
			dblClick:function(){
				debugger

			},
			deleteRow:function(index,data){
				debugger;
				let $this = this;
				let id = data.id;

				deleteQuickReplyById(id,function(resp){
					debugger;
					if(resp.continue){
						$this.$message({
							type:"success",
							message:"移除成功"
						})
						getQuickReplysForPage($this.pageObj,$this.queryFormInfo,function(resp){
							debugger;
							if(resp.continue){
								$this.tableData = resp.returnValue.rows;
								$this.pageData.total = resp.returnValue.total;
							}
						})
					}
				})
			},
			handleSelectionChange:function(rows){
				debugger
				let partyIdList = [];
				rows.forEach(function(item,index){
					partyIdList.push(item.partyId);
				})
				this.multipleSelection = partyIdList;
			},
			selectCurrentPage:function(currentPageNum){
				debugger
				this.pageObj.page = currentPageNum;
				let $this = this;
				getQuickReplysForPage(this.pageObj,this.queryFormInfo,function(resp){
					debugger;
					$this.tableData = resp.returnValue.rows;
				})
			},
			saveDialog:function(){
				debugger;
				let $this = this;
				this.$refs['dialogForm'].validate((valid) => {
					if(valid){
						let data = {
							content: $this.dialogForm.content,
                			module: $this.dialogForm.module
						}
						insertQuickReply(data, function(resp){
							debugger;
							if(resp.continue){
								//关闭弹框
								$this.dialogFormVisible = false;

								//更新表格
								getQuickReplysForPage($this.pageObj,$this.queryFormInfo,function(resp){
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
						


					}else{
						return false;
					}
				})
			},
			closeDialog:function(){
				debugger;
				this.dialogForm.content = '';
				this.dialogForm.module = '备案';
			}
		}
	}
</script>
	