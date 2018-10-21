<template>
	<div>
		<bread-title :currentTitle="title"></bread-title>
		<query-form :formTemplate="formTemplate" @queryData="onSubmit"></query-form>
			
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
			<el-pagination background layout="prev, pager, next" :current-page.sync="pageData.currentPage" :page-size="pageData.pageSize"  :total="pageData.total" @current-change="selectCurrentPage($event)"></el-pagination>
		</el-row>

		<!-- Form   弹框编辑-->
		
		<el-dialog title="个人详细信息" :visible.sync="dialogFormVisible" width="60%" >
			  <el-form :model="dialogForm"  :inline="true" size="mini" label-position="right" label-suffix=" :">
			  	<el-row>
			  		<el-col :span="10" :offset='1'>
			  			<el-form-item label="姓名">
				        	<span>{{dialogForm.name}}</span>
					    </el-form-item>
			  		</el-col>
					<el-col :span="10" :offset="2">
						<el-form-item label="身份证号">
					        <!-- <el-input v-model="dialogForm.identityCard" readonly="true"></el-input> -->
					        <span>{{dialogForm.identityCard}}</span>
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
							    <el-checkbox label="1">搭靠外轮许可证办理</el-checkbox>
							    <!-- <el-checkbox label="2">随船工作证申请</el-checkbox> -->
							    <el-checkbox label="3">在港船舶移泊申请</el-checkbox>
							    <el-checkbox label="4">实际抵离港时间确保</el-checkbox>
							    <el-checkbox label="5">团队旅客出境申报</el-checkbox>
							    <el-checkbox label="6">出入境查询申请</el-checkbox>
							    <el-checkbox label="9">取消靠泊计划</el-checkbox>
							</el-checkbox-group>
			  			</el-form-item>
			  		</el-col>
			  		<el-col :span="22" :offset="1">
			  			<el-form-item label="登轮证权限">
			  			 	<el-checkbox-group v-model="dialogForm.boardingList">
							    <el-checkbox label="b0">业务</el-checkbox>
							    <el-checkbox label="b1">供应</el-checkbox>
							    <el-checkbox label="b2">加油</el-checkbox>
							    <el-checkbox label="b3">加水</el-checkbox>
							    <el-checkbox label="b4">废旧回收</el-checkbox>
							    <el-checkbox label="b5">维修</el-checkbox>
							    <el-checkbox label="b6">劳务</el-checkbox>
							    <el-checkbox label="b7">绑扎</el-checkbox>
							    <el-checkbox label="b8">装卸</el-checkbox>
							    <el-checkbox label="b9">商品检验</el-checkbox>
							    <el-checkbox label="b10">船东</el-checkbox>
							    <el-checkbox label="b11">船员家属</el-checkbox>
							</el-checkbox-group>
			  			</el-form-item>
			  		</el-col>
			  	</el-row>	

			  	<el-row v-if="dialogForm.status == 0">
			  		<el-col :span="10" :offset="1" >
			  			<el-form-item label="常用回复">
			  				<el-select v-model="dialogForm.quickReplyContent" @change="changeReply($event)">
			  					<el-option v-for="reply in dialogForm.replyList" :label="reply.content" :value="reply.content"></el-option>
			  				</el-select>
			  			</el-form-item>
			  		</el-col>
			  		<el-col :span="10" :offset="2" >
			  			<el-form-item label="申请回复" prop='reply' :rules="rules.ruleForReply">
			  				 <el-input type="textarea" v-model="dialogForm.reply"></el-input>
			  			</el-form-item>
			  		</el-col>
			  		<el-col :span="10" :offset="1" >
			  			<el-form-item label="处理状态" prop='status' :rules="{'required':true,'message':'请选择处理状态'}">
			  				<el-select v-model="dialogForm.status">
			  					<el-option label="通过"  value="1"></el-option>
						        <el-option label="不通过" value="2"></el-option>
			  				</el-select>
			  			</el-form-item>
			  		</el-col>
			  	</el-row>
	
			  </el-form>
			  <div slot="footer">
			    <el-button type="primary" @click="deleteDialog">删 除</el-button>
			    <el-button type="primary" @click="confirmDialog" v-if="dialogForm.status == '0'">审 核</el-button>
			    <!-- <el-button type="primary" @click="disableDialog">失 效</el-button> -->
			    <el-button type="primary" @click="updateDialog" v-if="dialogForm.status == '1'">更 新</el-button>
			   
			  </div>
		</el-dialog>
	</div>
</template>

<script>
	import {getCompanys,getPorts,getUsersForPage,getDictionarys,getQuickReplay,updateUserById,deleteUserById,updateUserAuthorityById} from '@/api'
	//导入校验项
	import {ruleForContent} from '@/api/validate'
	import {Message} from 'element-ui'
	import BreadTitle from  '../common/BreadTitle'
	import QueryForm from '../common/QueryForm'
	export default{
		data:function(){
			let ruleForContent = (rule, value, callback) => {
				debugger;
				if(value.length == 0){
					return callback(new Error('回复内容不能为空'));
				}else if(value.length > 300){
					return callback(new Error('回复内容过长，请重新输入'));
				}
			}	
			return {
				title:'备案注册申请',
				formTemplate:{
							button:
								{"add":false},	
							model:[{
								name:"status",
								type:'select',
								title:"处理状态",
								data:[{"label":"待执勤人员审核", "value":"0"},{"label":"通过", value:"1"},{"label":"未通过", value:"2"},
									  {"label":"未备案", value:"5"},{"label":"已失效", value:"6"},{"label":"查询全部",value:""}],
								value:'0'
							},
							{
								name:"companyName",
								type:"select",
								title:"所属公司",
								data:[],
								value:''
							},
							{
								name:'portId',
								type:"select",
								title:"所属港口",
								data:[],
								value:''
							},
							{
								name:'identityCard',
								type:"text",
								title:"身份证号",
								value:'',
							}]
						},
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
					pageSize:10,
					currentPage:1
				},
				//弹框
				dialogForm:{
					id:'',
					name:'',
					identityCard:'',
					sex:'',
					phone:'',
					businessList:[],
					boardingList:[],
					replyList:[],
					quickReplyContent:'',
					reply:'',
					status:'1'
				},
				//可以抽到VUEx里面,可以删掉了
				dictionarys:{
					/*{
						"index": "auth",
					};*/
					auth:{
						"1": "临时搭靠外轮许可证办理",
						"2": "随船工作证申请",
						"3": "在港船舶移泊申请",
						"4": "实际抵离港时间确保",
						"5": "团队旅客出境申报",
						"9": "取消靠泊计划"
					},
						/*{
							"index": "boardMatter",
						}*/
					boardMatter:{	
						"b0": "业务",
						"b1": "供应",
						"b2": "加油",
						"b3": "加水",
						"b4": "废旧回收",
						"b5": "维修",
						"b6": "绑扎",
						"b7": "劳务",
						"b8": "装卸",
						"b9":"商品检验",
						"b10": "船东",
						"b11": "船员家属"
					}
				},
				rules:{
					ruleForReply:[{validator:ruleForContent, trigger: 'blur'}]
				}
		    
			}	
		},
		components:{BreadTitle,QueryForm},
		mounted:function(){
			let $this = this;
			//公司名字下拉列表
			this.formTemplate.model[1].data = this.$store.state.companyList;
			//港口名称下拉列表
			this.formTemplate.model[2].data = this.$store.state.portList;
			
			//初始化表格数据
			this.queryFormInfo.portId = this.$store.state.portId;
			getUsersForPage(this.pageObj,this.queryFormInfo,function(resp){
				debugger;
				if(resp.returnValue && resp.returnValue.total > 0){
					$this.tableData = resp.returnValue.rows;
					$this.pageData.total = resp.returnValue.total;
				}
			})
			//审批回复用语
			getQuickReplay({module: "备案"},function(resp){
				debugger;
				$this.dialogForm.replyList = resp.returnValue;
			})
			 
		},
		methods:{
			/**
			 * [onSubmit 查询数据]
			 * @return {[type]} [description]
			 */
			onSubmit:function(data){
				debugger;
				let $this = this;
				this.queryFormInfo = data;
				this.pageObj = {
					page: 1, //当前页
		            rows: 10, //每页条数
		            sort: "", //排序字段
		            order: "" //排序顺序
				};
				getUsersForPage(this.pageObj,data,function(resp){
					debugger;
					$this.tableData = resp.returnValue.rows;
					$this.pageData.total = resp.returnValue.total;
					$this.$set($this.pageData,'currentPage',1);
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
			dblClick:function(currentRowData){
				debugger;
				let $this = this;

				this.dialogFormVisible = true;
				this.dialogForm.id = currentRowData.id;
				this.dialogForm.name = currentRowData.name;
				this.dialogForm.identityCard = currentRowData.identityCard;
				this.dialogForm.sex = currentRowData.sex;
				this.dialogForm.phone = currentRowData.phone;
				this.dialogForm.businessList = [];
				this.dialogForm.boardingList = [];
				this.dialogForm.quickReplyContent = '';
				this.dialogForm.reply = '';
				this.dialogForm.status = '1';

				if(currentRowData.authority != null && currentRowData.authority != ''){
					let authority = currentRowData.authority.split(',');
					authority.forEach(function(item,index){
						if(/^b\d+$/.test(item)){
							$this.dialogForm.boardingList.push(item)
						}else{
							$this.dialogForm.businessList.push(item);
						}
					})
				}
				

			},
			changeReply:function(item){
				debugger;
				this.dialogForm.reply = item;
			},
			deleteDialog:function(){
				debugger;
				let id = this.dialogForm.id;
				let $this = this;
				deleteUserById(id,function(resp){
					Message.success({
						message:"删除成功"
					})
					//关闭弹框
					$this.dialogFormVisible = false;
					//更新表格
					getUsersForPage($this.pageObj,$this.queryFormInfo,function(resp){
						debugger;
						$this.tableData = resp.returnValue.rows;
					})	
				})
			},
			confirmDialog:function(){
				debugger;
				console.log('aa');
				let $this = this;
				let auth = [];
				auth = [].concat($this.dialogForm.businessList,$this.dialogForm.boardingList);
				let data = {
					id:this.dialogForm.id,
					authority: auth.join(','),
					phone: this.dialogForm.phone,
					sex: this.dialogForm.sex,
					//startTime: getNowFormatDate(),因为不再有失效的概念，所有不考虑时间了	
					reply: this.dialogForm.reply,
					status: this.dialogForm.status,
				}
				
				updateUserById(data,function(resp){
					Message.success({
						message:"更新成功"
					})
					//关闭弹框
					$this.dialogFormVisible = false;
					//更新表格
					getUsersForPage($this.pageObj,$this.queryFormInfo,function(resp){
						debugger;
						$this.tableData = resp.returnValue.rows;
					})	

				})

			},

			disableDialog:function(){
				//todo 已经没有失效一说，是不是就可以不用管了
			},
			updateDialog:function(){
				debugger;
				let $this = this;
				let auth = [];
				Object.keys(this.dictionarys.auth).forEach(function(item,index){
					console.log($this.dictionarys.auth[item]);
					if($this.dialogForm.businessList.indexOf($this.dictionarys.auth[item]) !=-1){
						auth.push(item);
					}
				})

				Object.keys(this.dictionarys.boardMatter).forEach(function(item,index){
					if($this.dialogForm.boardingList.indexOf($this.dictionarys.boardMatter[item]) !=-1){
						auth.push(item);
					}
				})
				
				let data = {
					id: this.dialogForm.id,
					authority: auth.join(','),
					phone: this.dialogForm.phone,
					sex: this.dialogForm.sex,
				}

				updateUserAuthorityById(data,function(resp){
					if(resp.continue){
						Message.success({
							message:"更新成功"
						})
						//关闭弹框
						$this.dialogFormVisible = false;
						//更新表格
						getUsersForPage($this.pageObj,$this.queryFormInfo,function(resp){
							debugger;
							$this.tableData = resp.returnValue.rows;
							$this.pageData.total = resp.returnValue.total;
						})	
					}
					
				})


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