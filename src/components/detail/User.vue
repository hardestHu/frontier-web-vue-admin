<template>
	<div class="user">
		<bread-title :currentTitle="title"></bread-title>
		<el-row>
  			<el-button type="primary" size="medium" class="margin-left-20 margin margin-bottom-20" @click="addUser">新 增</el-button>
			<el-button size="medium" @click='deleteUser'>禁 用</el-button>
		</el-row>
		<!-- 表格数据展示 -->
		<el-row>
			<el-table :data="tableData" :stripe="true" size="small" :highlight-current-row="true" @row-dblclick="dblClick($event)" @selection-change="handleSelectionChange">
				<el-table-column type="selection"></el-table-column>
			    <el-table-column prop="partyId" label="编号" ></el-table-column>
			    <el-table-column prop="userName" label="登录名"></el-table-column>
			    <el-table-column prop="nickName" label="姓名"></el-table-column>
			    <el-table-column prop="phone" label="联系电话"></el-table-column>
			    <el-table-column prop="remark" label="职务"></el-table-column>
			    <el-table-column prop="cardNo" label="专员编号"></el-table-column>
			</el-table>
		</el-row>	
		<!-- 分页 -->
		<el-row class="pageComponent">
			<el-pagination background layout="prev, pager, next" :page-size="pageData.pageSize"  :total="pageData.total" :current-page.sync="pageData.currentPage" @current-change="selectCurrentPage($event)"></el-pagination>
		</el-row>

		<!-- 新增和审批弹框 -->

		<el-dialog title="操作员详细信息" :visible.sync="dialogFormVisible" width="50%" @close="closeDialog">
			<el-form :model="dialogForm"  :inline="true" size="mini" label-position="right" label-suffix=" :" ref="dialogForm" label-width="90px" :rules="rules">
				
			  	<el-row>
			  		<el-col :span="11" :offset='1'>
			  			<el-form-item label="登录名" prop="userName">
				        	<el-input type="text" v-model="dialogForm.userName" v-if="dialogForm.type == 'add'"></el-input>
				        	<span v-else>{{dialogForm.userName}}</span>
					    </el-form-item>
			  		</el-col>
					
			  		<el-col :span="11" :offset='1' v-if="dialogForm.type == 'add'">
			  			<el-form-item label="密 码" prop="password">
				        	<el-input type="password" v-model="dialogForm.password"></el-input>
					    </el-form-item>
			  		</el-col>

			  		<el-col :span="11" :offset='1'>
			  			<el-form-item label="姓 名" prop="name">
			  				<!-- <span>{{dialogForm.name}}</span> -->
				        	<el-input type="text" v-model="dialogForm.name"></el-input>
					    </el-form-item>
			  		</el-col>
			  		
			  		<el-col :span="11" :offset="1">
					    <el-form-item label="电 话" prop="phone">
				        	<el-input type="text" v-model="dialogForm.phone"></el-input>
				    	</el-form-item>
					</el-col>  	
					
					<el-col :span="11" :offset="1">
					    <el-form-item label="职 务" prop="duty">
				        	<el-input type="text" v-model="dialogForm.duty"></el-input>
				    	</el-form-item>
					</el-col>  	

					<el-col :span="11" :offset="1">
					    <el-form-item label="级 别" prop="level">
   							<el-select v-model="dialogForm.level">
  								<el-option value="3" label="执勤人员"></el-option>
  								<el-option value="2" label="科领导"></el-option>
  								<el-option value="1" label="站业务领导"></el-option>
  							</el-select>	
				    	</el-form-item>
					</el-col>  	

					<el-col :span="11" :offset="1" v-if="dialogForm.level != '1'">
					    <el-form-item label="上级领导" prop="parentName">
				        	<el-autocomplete v-model="dialogForm.parentName" :fetch-suggestions="querySearch" :hide-loading="true"  @select="handleSelect"></el-autocomplete>

				        	
				    	</el-form-item>
					</el-col>

					
					<el-col :span="11" :offset="1">
					    <el-form-item label="专员编号" prop="serviceCode">
				        	<el-input type="text" v-model="dialogForm.serviceCode"></el-input>
				    	</el-form-item>
					</el-col>

					<el-col :span="11" :offset="1">
					    <el-form-item label="港 口">
				        	<el-select v-model="dialogForm.port">
								<el-option :label="item.label" :value="item.value" v-for="item in dialogForm.portList" ></el-option>
							</el-select>
				    	</el-form-item>
					</el-col>
					
					<el-col :span="23" :offset="1">
						<el-form-item label="关联菜单" prop="roleIds">
					        <el-checkbox-group v-model="dialogForm.roleIds">
							    <el-checkbox v-for="item in dialogForm.roleList" :label="item.roleId" :key="item.roleId">{{item.roleName}}</el-checkbox>
							</el-checkbox-group>
					    </el-form-item>	
					</el-col>
					
				</el-row>
	
			</el-form>
			<div slot="footer">
				<el-button  @click="dialogFormVisible = false" >取 消</el-button>
				<el-button type="primary" @click="saveDialog" v-if="dialogForm.type == 'add'">保 存</el-button>
				<el-button @click="resetPWD" v-if="dialogForm.type == 'edit'">重置密码</el-button>
				<el-button type="primary" @click="updateDialog" v-if="dialogForm.type == 'edit'">保 存</el-button>
			</div>
		</el-dialog>



	</div>
</template>
<script>
	import BreadTitle from '../common/BreadTitle'
	import {getPartysForPage,deleteParty,getRoles,getLeaderList,addParty, getPartyById, updatePartyById,resetPassword} from '@/api'
	export default{
		data:function(){

			return {
				title:"用户管理",
				multipleSelection:[],
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
				//添加弹框
				dialogFormVisible:false,
				dialogForm:{
					type:"",
					userId:'',
					userName:"",
					password:"",
					name:"",
					phone:"",
					duty:"",
					level:"3",
					parentId:"",
					parentName:"",
					serviceCode:"",
					port:"",
					portList:[],
					roleIds:[],
					roleList:[]
				},
				rules:{
					userName:[
			            { required: true, message: '请输入登录名', trigger: 'blur' },
			            { max: 30, message: '长度小于 30 个字符', trigger: 'blur' }
					],
					password:[
						{ required: true, message: '请输入登录密码', trigger: 'blur' },
			            { max: 30, message: '长度小于 30 个字符', trigger: 'blur' }
					],
					name:[
						{ required: true, message: '请输入姓名', trigger: 'blur' },
			            { max: 30, message: '长度小于 30 个字符', trigger: 'blur' }
					],
					phone:[
						{ required: true, message: '请输入电话号码', trigger: 'blur' },
			            { min:11, max: 11, message: '手机号长度为11', trigger: 'blur' }
					],
					duty:[
						{ required: true, message: '请输入职务信息', trigger: 'blur' },
			            { max: 20, message: '长度小于 20 个字符', trigger: 'blur' }
					],
					parentName:[
						{ required: true, message: '请输入上级领导', trigger: 'change' }
					],
					serviceCode:[
						{ required: true, message: '请输入专员编号', trigger: 'blur' },
			            { max: 15, message: '长度小于 15 个字符', trigger: 'blur' }
					],
					roleIds:[
						{ required: true, message: '请选择关联菜单', trigger: 'blur' }
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
			getPartysForPage(this.pageObj,{},function(resp){
				debugger;
				if(resp.continue){
					$this.tableData = resp.returnValue.rows;
					$this.pageData.total = resp.returnValue.total;
				}
			})

			//弹框里面菜单权限列表
			getRoles(function(resp){
				debugger;
				if(resp.continue){
					$this.dialogForm.roleList = resp.returnValue;
				}
			})
			//弹框里面港口下拉
			let portList = JSON.parse(JSON.stringify(this.$store.state.portList));
			portList[0].label="所有港口";
			portList[0].value="-1";

			this.dialogForm.portList = portList;

		},
		methods:{
			addUser:function(){
				debugger;
				this.dialogFormVisible = true;
				this.dialogForm.type = 'add';
				this.dialogForm.level = '3';
				this.dialogForm.port = '-1';


			},
			querySearch:function(queryString, cb){
				debugger;
				let data = {
						name:queryString,
						level:this.dialogForm.level
					}

				getLeaderList(data,function(resp){
					debugger;
					let leaderList = resp.returnValue;
					leaderList.forEach(function(item,index){
						item.value = item.nickName;

					})
					cb(leaderList);
				})
			},
			handleSelect:function(item){
				debugger;
				this.dialogForm.parentId = item.partyId;
			},
			dblClick:function(currentRowData){
				debugger;
				let $this = this;
				this.dialogFormVisible = true;
				if(this.$refs['dialogForm'] != undefined){
 			        this.$refs["dialogForm"].resetFields();  
				}
				this.dialogForm.type = 'edit';
				this.dialogForm.userId = currentRowData.partyId;

				getPartyById(currentRowData.partyId,function(resp){
					debugger;
					let userInfo = resp.returnValue;

					if(resp.continue){
						$this.dialogForm.userName = userInfo.userName;
						$this.dialogForm.name = userInfo.name;
						$this.dialogForm.phone = userInfo.phone;
						$this.dialogForm.duty = userInfo.duty;
						$this.dialogForm.level = userInfo.level;
						$this.dialogForm.parentId = userInfo.parentId;
						$this.dialogForm.parentName = userInfo.parentName;
						$this.dialogForm.serviceCode = userInfo.serviceCode;
						$this.dialogForm.port = userInfo.port;
						$this.dialogForm.roleIds = userInfo.roleIds;
					}
					

				})


			},
			deleteUser:function(){
				debugger;
				let $this = this;
				if(this.multipleSelection.length>0){
					deleteParty(this.multipleSelection,function(resp){

						if(resp.continue){
							//更新表格
							getPartysForPage($this.pageObj, {}, function(resp){
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
					return; 
				}

			},
			handleSelectionChange:function(rows){
				debugger;
				let partyIdList = [];
				rows.forEach(function(item,index){
					partyIdList.push(item.partyId);
				})
				this.multipleSelection = partyIdList;


			},
			selectCurrentPage:function(currentPageNum){
				debugger;
				this.pageObj.page = currentPageNum;
				let $this = this;
				getPartysForPage(this.pageObj,{},function(resp){
					debugger;
					$this.tableData = resp.returnValue.rows;
				})
			},
			closeDialog:function(){
				debugger;
				this.dialogForm.userName = "";
				this.dialogForm.password = "";
				this.dialogForm.name = "";
				this.dialogForm.phone = "";
				this.dialogForm.duty = "";
				this.dialogForm.level = "";
				this.dialogForm.parentId = "";
				this.dialogForm.parentName = "";
				this.dialogForm.serviceCode = "";
				this.dialogForm.port = "";
				this.dialogForm.roleIds = [];

				//重置校验
				if(this.$refs['dialogForm'] != undefined){
 			        this.$refs["dialogForm"].resetFields();  
				}



			},
			saveDialog:function(){
				debugger;
				let $this = this;
				this.$refs['dialogForm'].validate((valid)=>{
					if(valid){
						let data = {
							userName:this.dialogForm.userName,
							password:this.dialogForm.password,
							name:this.dialogForm.name,
							phone:this.dialogForm.phone,
							duty:this.dialogForm.duty,
							level:this.dialogForm.level,
							serviceCode:this.dialogForm.serviceCode,
							port:this.dialogForm.port,
							roleIds:this.dialogForm.roleIds,
						}
						if(data.level != '1'){
							data.parentId = this.dialogForm.parentId;
						}

						addParty(data,function(resp){
							debugger;
							if(resp.continue){
								//关闭弹框
								$this.dialogFormVisible = false;

								//更新表格
								getPartysForPage($this.pageObj,{},function(resp){
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

			updateDialog:function(){
				debugger;
				let $this = this;
				this.$refs['dialogForm'].validate((valid) => {
					if(valid){
					
						let data = $this.getFormData();
						data.userId = this.dialogForm.userId;
						updatePartyById(data,function(resp){
							debugger;
							if(resp.continue){
								//关闭弹框
								$this.dialogFormVisible = false;

								//更新表格
								getPartysForPage($this.pageObj,{},function(resp){
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
			resetPWD:function(){
				debugger;
				let $this = this;
				resetPassword(this.dialogForm.userId,function(resp){
					debugger;
					if(resp.continue){
						//关闭弹框
						$this.dialogFormVisible = false;

						//更新表格
						getPartysForPage($this.pageObj,{},function(resp){
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
			getFormData:function(){
				debugger;
				let data;
				if(this.dialogForm.type == 'add'){
					data = {
							userName:this.dialogForm.userName,
							password:this.dialogForm.password,
							name:this.dialogForm.name,
							phone:this.dialogForm.phone,
							duty:this.dialogForm.duty,
							level:this.dialogForm.level,
							serviceCode:this.dialogForm.serviceCode,
							port:this.dialogForm.port,
							roleIds:this.dialogForm.roleIds,
					}
				}else{
					data = {
							name:this.dialogForm.name,
							phone:this.dialogForm.phone,
							duty:this.dialogForm.duty,
							level:this.dialogForm.level,
							serviceCode:this.dialogForm.serviceCode,
							port:this.dialogForm.port,
							roleIds:this.dialogForm.roleIds,
					}
				}
				
				if(data.level != '1'){
					data.parentId = this.dialogForm.parentId;
				}
				return data;	
			}
		},


	}	

</script>
