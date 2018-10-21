<template>
	<div class="port-main">
		<bread-title :currentTitle="title"></bread-title>
		<!-- 表格数据展示 -->
		<el-row>
			<el-table :data="tableData" :stripe="true" size="small" :highlight-current-row="true">
				<!-- <el-table-column type="selection"></el-table-column> -->
			    <el-table-column prop="id" label="港口编号" ></el-table-column>
			    <el-table-column prop="portName" label="港口名称"></el-table-column>
			    <el-table-column prop="phone" label="热线电话"></el-table-column>
			    <el-table-column prop="status" label="状态">
			    	<template slot-scope="scope">
			    		<span>{{scope.row.status == '0'?'启用':'禁用'}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="remark" label="备注"></el-table-column>
			    <el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click.native.prevent="modifyRow(scope.$index,scope.row)" type="text"size="small"> 修改 </el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>	
		<!-- 分页 -->
		<el-row class="pageComponent">
			<el-pagination background layout="prev, pager, next" :page-size="pageData.pageSize"  :total="pageData.total" :current-page.sync="pageData.currentPage" @current-change="selectCurrentPage($event)"></el-pagination>
		</el-row>

		<!-- 新增弹框 -->

		<el-dialog title="修改港口信息" :visible.sync="dialogFormVisible" width="40%" @close="closeDialog">
			<el-form :model="dialogForm"  :inline="true" size="medium" label-position="right" label-suffix=" :" ref="dialogForm" label-width="120px" :rules="rules">
				
			  	<el-row>			  	
			  		<el-col :span="23" :offset='1'>
			  			<el-form-item label="港口编号" prop="portCode">
				        	<el-input type="text" v-model="dialogForm.portCode"></el-input>
					    </el-form-item>
			  		</el-col>
					

			  		<el-col :span="23" :offset='1'>
			  			<el-form-item label="港口名称" prop="portName">
				        	<el-input type="text" v-model="dialogForm.portName"></el-input>
					    </el-form-item>
			  		</el-col>

			  		<el-col :span="23" :offset='1'>
			  			<el-form-item label="联系电话" prop="phone">
				        	<el-input type="text" v-model="dialogForm.phone"></el-input>
					    </el-form-item>
			  		</el-col>

			  		<el-col :span="23" :offset='1'>
			  			<el-form-item label="经度" prop="lon">
				        	<el-input type="text" v-model="dialogForm.lon"></el-input>
					    </el-form-item>
					    <el-form-item label="纬度" prop="lat">
				        	<el-input type="text" v-model="dialogForm.lat"></el-input>
					    </el-form-item>
			  		</el-col>
			  		
			  		<el-col :span="23" :offset='1'>
			  			<el-form-item label="备注" prop="remark">
				        	<el-input type="textarea" v-model="dialogForm.remark" :autosize="{minRows: 4,maxRows:8}"  style="width:300px"></el-input>
					    </el-form-item>
			  		</el-col>
	

					

				</el-row>
	
			</el-form>
			<div slot="footer">
				<el-button  @click="dialogFormVisible = false" >取 消</el-button>
				<el-button type="primary" @click="saveDialog">保 存</el-button>
			</div>
		</el-dialog>


<!-- id: "1835150862795776"
lat: "34.724527"
lon: "119.354985"
phone: "0518-82310663"
portCode: "P0008"
portName: "连云港出入境边防检查站"
portType: null
remark: "连云港边检站"
status: 0 -->
	</div>
</template>
<script>
	import BreadTitle from '../common/BreadTitle'
	import {getPortsForPage,updatePortById} from '@/api'
	export default{
		data:function(){
			return {
				title:"港口管理",
				tableData:[],
				//查询条件-分页
				pageObj:{
					page: 1, //当前页
		            rows: 10, //每页条数
		            sort: "", //排序字段
	        		order: "" //排序顺序
				},
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
					id:'',
					portCode:"",
					portName:"",
					phone:"",
					lon:"",
					lat:"",
					remark:''	
				},
				rules:{
					portCode:[
						{ required: true, message: "请输入港口编号", trigger: 'blur' }
					],
					portName:[
						{ required: true, message: "请输入港口名称", trigger: 'blur' }
					],
					phone:[
						{ required: true, message: "请输入联系电话", trigger: 'blur' }
					],
					lon:[
						{ required: true, message: "请输入经度", trigger: 'blur' }
					],
					lat:[
					    { required: true, message: "请输入纬度", trigger: 'blur' }
					]
				}

			}	
		},
		components:{
			BreadTitle
		},
		mounted:function(){
			debugger;
			let $this = this;
			
			//初始化表格
			getPortsForPage(this.pageObj,{},function(resp){
				debugger;
				if(resp.continue){
					$this.tableData = resp.returnValue.rows;
					$this.pageData.total = resp.returnValue.total;
				}
			})
			
		},
		methods:{
			modifyRow:function(index,currentRowData){
				debugger;
				this.dialogFormVisible = true;
				this.dialogForm.id = currentRowData.id;
				this.dialogForm.portCode = currentRowData.portCode;
				this.dialogForm.portName = currentRowData.portName;
				this.dialogForm.phone = currentRowData.phone;
				this.dialogForm.lon = currentRowData.lon;
				this.dialogForm.lat = currentRowData.lat;
				this.dialogForm.remark = currentRowData.remark;


			},
			selectCurrentPage:function(currentPageNum){
				debugger
				this.pageObj.page = currentPageNum;
				let $this = this;
				getPortsForPage(this.pageObj,{},function(resp){
					debugger;
					$this.tableData = resp.returnValue.rows;
				})
			},
			closeDialog:function(){
				debugger;
				this.dialogForm.id = "";
				this.dialogForm.portCode = "";
				this.dialogForm.portName = "";
				this.dialogForm.phone = "";
				this.dialogForm.lon = "";
				this.dialogForm.lat = "";
				this.dialogForm.remark = "";
			},
			saveDialog:function(){
				debugger;
				let $this = this;
				this.$refs['dialogForm'].validate((valid) =>{
					if(valid){
						updatePortById($this.dialogForm,function(resp){
							debugger;
							if(resp.continue){
								//关闭弹框
								$this.dialogFormVisible = false;

								//更新表格
								getPortsForPage($this.pageObj,{},function(resp){
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

			}
		} 

	}
</script>