<template>
	<div>
		<el-row style="padding-bottom: 10px;">
			<el-col :span="4">
				<span style="font-family: 'Source Sans Pro', sans-serif;font-size:24px;color:black">备案注册申请</span>
			</el-col>
			<el-col :span="4" :offset="16" style="padding-top: 16px">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  	<el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
				    <el-breadcrumb-item>备案注册申请</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
			
		</el-row>

		<el-row>
			<el-form :inline="true" label-position="right" label-width="70px"  size="mini" :model="queryFormInfo">
				<el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7" :offset="1">
					<el-form-item label="处理状态">
					    <el-select v-model="queryFormInfo.status">
					    	<el-option label="待执勤人员审核" value="0"></el-option>
					        <el-option label="通过" value="1"></el-option>
					        <el-option label="未通过" value="2"></el-option>
					        <el-option label="未备案" value="5"></el-option>
					        <el-option label="已失效" value="6"></el-option>
					        <el-option label="查询全部" value=""></el-option>
					    </el-select>
					</el-form-item>
				</el-col>
				
				<el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7" :offset="1">
					<el-form-item label="所属公司">
					    <el-select v-model="queryFormInfo.companyName">
					    	<el-option label="查询全部" value=""></el-option>
					        <el-option v-for="company in companyList" :label="company.companyName" :value="company.companyName" ></el-option>
					       
					    </el-select>
					</el-form-item>
				</el-col>
				
				<el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7" :offset="1">
					<el-form-item label="所属港口">
					    <el-select v-model="queryFormInfo.portId">
					        <el-option label="查询全部" value=""></el-option>
					        <el-option v-for="port in portList" :label="port.portName" :value="port.id"></el-option>
					    </el-select>
					</el-form-item>
				</el-col>
				
				<el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7" :offset="1">
					<el-form-item label="身份证号">
					    <el-input v-model="queryFormInfo.identityCard"></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7" :offset="1">
					<el-form-item>
					    <el-button type="primary" @click="onSubmit">查询</el-button>
					</el-form-item>	
				</el-col>
			</el-form>
		</el-row>

		<el-row>
			<el-table :data="tableData" :stripe="true" size="small" :highlight-current-row="true" @row-dblclick="dblClick($event)">
			    <el-table-column prop="name" label="姓名" min-width="60px">
			    </el-table-column>
			    <el-table-column prop="identityCard" label="身份证号" min-width="180px">
			    </el-table-column>
			    <el-table-column prop="companyName" label="所属公司" min-width="180px">
			    </el-table-column>
			     <el-table-column prop="sex" label="性别">
			    </el-table-column>
			     <el-table-column prop="duty" label="职位">
			    </el-table-column>
			     <el-table-column prop="status" label="状态">
			     	<template slot-scope="scope">
			     			<span>{{scope.row.status == '0'?'待执勤人员审核':(
			     				scope.row.status == '1'?'通过':(
			     											scope.row.status == '2'?'未通过':(
			     											scope.row.status == '5'?'未备案':(
			     											scope.row.status == '6'?'已失效':'--'
			     											))))}}</span>
			     	</template>
			    </el-table-column>
			    <el-table-column prop="serviceCode" label="批准人">
			    </el-table-column>
			</el-table>
		</el-row>
		<!-- 分页 -->
		<el-row class="pageComponent">
			<el-pagination background layout="prev, pager, next" :page-size="pageData.pageSize"  :total="pageData.total" @current-change="selectCurrentPage($event)"></el-pagination>
		</el-row>

		<!-- Form   弹框编辑-->
		
		<el-dialog title="个人详细信息" :visible.sync="dialogFormVisible" width="60%" >
			  <el-form :model="dialogForm"  inline="true" size="mini" label-position="right" label-suffix=" :">
			  	<el-row>
			  		<el-col :span="10" :offset='1'>
			  			<el-form-item label="姓名">
				        	<el-input v-model="dialogForm.name"  readonly="true"></el-input>
					    </el-form-item>
			  		</el-col>
					<el-col :span="10" :offset="2">
						<el-form-item label="身份证号">
					        <el-input v-model="dialogForm.identityCard" readonly="true"></el-input>
					    </el-form-item>	
					</el-col>
			  		<el-col :span="10" :offset='1'>
			  			<el-form-item label="性别">
						    <el-select v-model="dialogForm.sex">
						        <el-option label="男" value="男"></el-option>
						        <el-option label="女" value="女"></el-option>
						    </el-select>

					    </el-form-item>
			  		</el-col>
			  		<el-col :span="10" :offset="2">
					    <el-form-item label="联系电话">
				        	<el-input v-model="dialogForm.phone" ></el-input>
				    	</el-form-item>
					</el-col>  	
			  	</el-row>

			  	<el-row>
			  		<el-col :span="22" :offset="1">
			  			<el-form-item label="业务权限">
			  			 	<el-checkbox-group v-model="dialogForm.businessList">
							    <el-checkbox label="临时搭靠外轮许可证办理"></el-checkbox>
							    <el-checkbox label="随船工作证申请"></el-checkbox>
							    <el-checkbox label="在港船舶移泊申请"></el-checkbox>
							    <el-checkbox label="实际抵离港时间确保"></el-checkbox>
							    <el-checkbox label="团队旅客出境申报"></el-checkbox>
							    <el-checkbox label="取消靠泊计划"></el-checkbox>
							</el-checkbox-group>
			  			</el-form-item>
			  		</el-col>
			  		<el-col :span="22" :offset="1">
			  			<el-form-item label="登轮证权限">
			  			 	<el-checkbox-group v-model="dialogForm.boardingList">
							    <el-checkbox label="业务"></el-checkbox>
							    <el-checkbox label="供应"></el-checkbox>
							    <el-checkbox label="加油"></el-checkbox>
							    <el-checkbox label="加水"></el-checkbox>
							    <el-checkbox label="废旧回收"></el-checkbox>
							    <el-checkbox label="维修"></el-checkbox>
							    <el-checkbox label="劳务"></el-checkbox>
							    <el-checkbox label="绑扎"></el-checkbox>
							    <el-checkbox label="装卸"></el-checkbox>
							    <el-checkbox label="商品检验"></el-checkbox>
							    <el-checkbox label="船东"></el-checkbox>
							    <el-checkbox label="船员家属"></el-checkbox>
							</el-checkbox-group>
			  			</el-form-item>
			  		</el-col>
			  	</el-row>	

			  	<el-row>
			  		<el-col :span="10" :offset="1" >
			  			<el-form-item label="常用回复">
			  				<el-select v-model="dialogForm.reply"></el-select>
			  			</el-form-item>
			  		</el-col>
			  		<el-col :span="10" :offset="2" >
			  			<el-form-item label="申请回复">
			  				 <el-input type="textarea" v-model="dialogForm.replyContent"></el-input>
			  			</el-form-item>
			  		</el-col>
			  		<el-col :span="10" :offset="1" >
			  			<el-form-item label="处理状态">
			  				<el-select>
			  					<el-option label="通过" value="1"></el-option>
						        <el-option label="不通过" value="2"></el-option>
			  				</el-select>
			  			</el-form-item>
			  		</el-col>
			  	</el-row>
	
			  </el-form>
			  <div slot="footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="confirmDialog">确 定</el-button>
			  </div>
		</el-dialog>
	</div>
</template>

<script>
	import {getCompanys,getPorts,getUsersForPage} from '@/api'
	export default{
		data:function(){
			return {

				tableData:[],
		        dialogFormVisible: false,
				formLabelWidth: '120px',
				// 查询变量-变量值
				queryFormInfo:{
					status:"0",
					companyName:"",
					portId:"",
					identityCard:""
				},
				//查询变量-数量信息
				pageObj:{
					page: 1, //当前页
					rows: 10, //每页条数
					sort: "", //排序字段
					order: "" //排序顺序
				},
				//分页组件变量
				pageData:{
					total:1,
					pageSize:10
				},
				companyList:[],
				portList:[],
				dialogForm:{
					name:'',
					identityCard:'',
					sex:'',
					phone:'',
					businessList:[],
					boardingList:[]
				}
		    
			}	
		},
		mounted:function(){
			let $this = this;
			getCompanys(function(resp){
				debugger;
				$this.companyList = resp.returnValue;
			})
			getPorts(function(resp){
				debugger;
				$this.portList = resp.returnValue;
			})
			
			getUsersForPage(this.pageObj,this.queryFormInfo,function(resp){
				debugger;
				if(resp.returnValue && resp.returnValue.total > 0){
					$this.tableData = resp.returnValue.rows;
					$this.pageData.total = resp.returnValue.total;
				}
			})
		},
		methods:{
			/**
			 * [onSubmit 查询数据]
			 * @return {[type]} [description]
			 */
			onSubmit:function(){
				debugger;
				let $this = this;
				getUsersForPage(this.pageObj,this.queryFormInfo,function(resp){
					debugger;
					if(resp.returnValue && resp.returnValue.total > 0){
						$this.tableData = resp.returnValue.rows;
						$this.pageData.total = resp.returnValue.total;

					}

				})

				
			},
			
			selectCurrentPage:function(currentPageNum){
				debugger;
				console.log(currentPageNum);
				this.pageObj.page = currentPageNum;
				let $this = this;
				getUsersForPage(this.pageObj,this.queryFormInfo,function(resp){
					debugger;
					$this.tableData = resp.returnValue.rows;
				})

			},
			dblClick:function(currentData){
				debugger;
				console.log(currentData);
				this.dialogFormVisible = true;
			},
			confirmDialog:function(){
				debugger;
				console.log('aa');
			}

		}
	}
</script>
<style>
	.pageComponent{
		float: right;
    	padding-top: 10px;
	}
	.el-table--small td, .el-table--small th {
    	padding: 5px 0;
	}
	.el-checkbox-group .el-checkbox{
		margin-left:0;
		margin-right:15px;
	}

</style>