<template>
	<div class="shift">
		<bread-title :currentTitle="title"></bread-title>
		<query-form :formTemplate="formTemplate" @queryData="onSubmit"></query-form>
			
		<!-- 表格数据展示 -->
		<el-row>
			<el-table :data="tableData" :stripe="true" size="small" :highlight-current-row="true" @row-dblclick="dblClick($event)" >
			    <el-table-column prop="chName" label="船舶中文名称" ></el-table-column>
			    <el-table-column prop="enName" label="船舶英文名称"></el-table-column>
			    <el-table-column prop="nationality" label="船舶国籍"></el-table-column>
			    <el-table-column prop="agentName" label="代理人" >
			  		<template slot-scope="scope">
			     			<a class="agentName" @click="checkUser(scope.row.openid)">{{scope.row.agentName}}</a>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="companyName" label="代理公司" min-width="110px"></el-table-column>
			    <el-table-column prop="shiftingTime" label="移泊时间" min-width='100px'></el-table-column>
			    <el-table-column prop="arrivalTime" label="靠泊时间" min-width='100px'></el-table-column>
			    <el-table-column prop="serviceCode" label="处理人"></el-table-column>   
			</el-table>
		</el-row>
	

		<!-- 分页 -->
		<el-row class="pageComponent">
			<el-pagination background layout="prev, pager, next" :page-size="pageData.pageSize"  :total="pageData.total" :current-page.sync="pageData.currentPage" @current-change="selectCurrentPage($event)"></el-pagination>
		</el-row>

		<!-- 审批弹框 -->

		<el-dialog title="查询与更新" :visible.sync="dialogFormVisible" width="60%" @close="closeDialog">
			<el-form :model="dialogForm"  :inline="true" size="mini" label-position="right" label-suffix=" :" ref="dialogForm" >
				
			  	<el-row>
			  		<el-col :span="11" :offset='1'>
			  			<el-form-item label="船舶中文名称">
				        	<span>{{dialogForm.chName}}</span>
					    </el-form-item>
			  		</el-col>
					
			  		<el-col :span="11" :offset='1'>
			  			<el-form-item label="代理人">
			  				<span>{{dialogForm.agentName}}</span>
					    </el-form-item>
			  		</el-col>

			  		<el-col :span="11" :offset='1'>
			  			<el-form-item label="船舶英文名称">
			  				<span>{{dialogForm.enName}}</span>
					    </el-form-item>
			  		</el-col>	
			  		
			  		<el-col :span="11" :offset="1">
					    <el-form-item label="代理公司">
				        	<span>{{dialogForm.companyName}}</span>
				    	</el-form-item>
					</el-col>  	
					
					<el-col :span="11" :offset="1">
					    <el-form-item label="国籍">
				        	<span>{{dialogForm.nationality}}</span>
				    	</el-form-item>
					</el-col>

					<el-col :span="11" :offset="1">
						<el-form-item label="申请时间">
					        <span>{{dialogForm.submitTime}}</span>
					    </el-form-item>	
					</el-col>

					<el-col :span="11" :offset="1">
						<el-form-item label="移泊前码头">
					        <span>{{dialogForm.postdock}}</span>
					    </el-form-item>	
					</el-col>

					
					<el-col :span="11" :offset="1">
						<el-form-item label="移泊后码头">
					        <span>{{dialogForm.postpier}}</span>
					    </el-form-item>	
					</el-col>
					<el-col :span="11" :offset="1">
						<el-form-item label="移泊前泊位">
					        <span>{{dialogForm.prepier}}</span>
					    </el-form-item>	
					</el-col>
					<el-col :span="11" :offset="1">
						<el-form-item label="移泊后泊位">
					        <span>{{dialogForm.predock}}</span>
					    </el-form-item>	
					</el-col>
					<el-col :span="11" :offset="1">
						<el-form-item label="移泊时间">
					        <span>{{dialogForm.shiftingTime}}</span>
					    </el-form-item>	
					</el-col>
					<el-col :span="11" :offset="1">
						<el-form-item label="靠泊时间">
					        <span>{{dialogForm.arrivalTime}}</span>
					    </el-form-item>	
					</el-col>
			  	</el-row>
				
			
				<el-row class="borderTop">
					<el-col :span="11" :offset="1" >
						<el-form-item label="常用回复">
				  			<el-select v-model="dialogForm.quickReplyContent" @change="changeReply($event)">
				  				<el-option v-for="reply in dialogForm.replyList" :label="reply.content" :value="reply.content"></el-option>
				  			</el-select>
				  		</el-form-item>
					</el-col>
					
					<el-col :span="11" :offset="1">
						<el-form-item label="处理状态">
							<el-radio-group v-model="dialogForm.status">
						      <el-radio label="1">通过</el-radio>
						      <el-radio label="2">不通过</el-radio>
						    </el-radio-group>					
					    </el-form-item>	
					</el-col>

					<el-col :span="23" :offset="1" >
				  		<el-form-item label="回复内容" prop='reply'  ref='reply' >
				  			 <el-input type="textarea" v-model="dialogForm.reply" :rows="4" style='width:360px'></el-input>
				  		</el-form-item>
				  	</el-col>

					
				  
				</el-row>

		
	
			</el-form>
			<div slot="footer">
				<el-button type="primary" @click="dialogFormVisible = false" >取 消</el-button>
				<el-button type="primary" @click="saveDialog" >保 存</el-button>
			</div>
		</el-dialog>

		<!-- 备案个人详细信息 -->
		<el-dialog title="备案个人详细信息" :visible.sync="detailDialogFormVisible" width="60%" @close="closeDetailDialog">
			<el-form :model="detailDialogForm"  :inline="true" size="mini" label-position="right" label-suffix=" :" >
				
			  	<el-row>
			  		<el-col :span="9" :offset='1'>
			  			<el-form-item label="姓名">
				        	<span>{{detailDialogForm.name}}</span>
				        	<!-- <span>朱明</span> -->
					    </el-form-item>

					    <el-form-item label="电话">
				        	<span>{{detailDialogForm.phone}}</span>
				        	<!-- <span>13584490019</span> -->
					    </el-form-item>

						<el-form-item label="所属公司">
			  				<span>{{detailDialogForm.companyName}}</span>
			  				<!-- <span>张家港保税区瑞创国际物流有限公司</span> -->
					    </el-form-item>	

					    <el-form-item label="身份证号">
			  				<span>{{detailDialogForm.identityCard}}</span>
			  				<!-- <span>320219198209227014</span> -->
					    </el-form-item>	

					    <el-form-item label="移泊申请总次数">
			  				<span>{{detailDialogForm.count}}</span>
			  				<!-- <span>5</span> -->
					    </el-form-item>	
			  		</el-col>
					
			  		
			  			
			  		<el-col :span="6" :offset='1'>
			  			<el-form-item label="登轮证权限">
			  			 	<el-checkbox-group v-model="detailDialogForm.boardingList" >
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

			  		<el-col :span="6" :offset='1'>
			  			<el-form-item label="业务权限">
			  			 	<el-checkbox-group v-model="detailDialogForm.businessList" >
							    <el-checkbox label="1">搭靠外轮许可证办理</el-checkbox>
							    <el-checkbox label="3">在港船舶移泊申请</el-checkbox>
							    <el-checkbox label="4">实际抵离港时间确保</el-checkbox>
							    <el-checkbox label="5">团队旅客出境申报</el-checkbox>
							    <el-checkbox label="6">出入境查询申请</el-checkbox>
							    <el-checkbox label="9">取消靠泊计划</el-checkbox>
							</el-checkbox-group>
			  			</el-form-item>
			  		</el-col>
				  
				</el-row>
			</el-form>
		</el-dialog>

	</div>
</template>
<script>
	import BreadTitle from '../common/BreadTitle'
	import QueryForm from '../common/QueryForm'
	import {getShiftingsForPage,getQuickReplay,updateShiftingById,getUsers,getShiftingCount} from '@/api'
	
	export default{
		data:function(){
			return {
				title:"船舶移泊申请",
				formTemplate:{
					button:{add:false},
					model:[
						{name:"chName",type:"text",title:"船舶名称",value:''},
						{name:"agentName",type:"text",title:"代理人",value:''},
						{name:"companyId",type:"select",title:"代理公司",data:[],value:''},
						{name:"serviceCode",type:"text",title:"处理人",value:''},
						{name:"status",type:"select",title:"处理状态",data:[
							{"label":"待执勤人员审核", "value":"0"},
							{"label":"已通过", value:"1"},
							{"label":"未通过", value:"2"},
							{"label":"查询全部",value:""}],
						value:'0'},
						{name:"portId",type:"select",title:"所属港口",data:[],value:''},
					]
				},
				// 查询条件-变量值
				queryFormInfo:{
					chName:'',
					agentName:'',
					companyId:'',
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
				//查看代理人详细信息
				detailDialogFormVisible:false,
				detailDialogForm:{
					name:'',
					phone:'',
					companyName:'',
					identityCard:'',
					count:'',
					boardingList:[],
					businessList:[],
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
			this.formTemplate.model[5].data = this.$store.state.portList;
			this.formTemplate.model[2].data = this.$store.state.companyList;

			this.queryFormInfo.portId = this.$store.state.portId;
			//初始化表格
			
			getShiftingsForPage(this.pageObj,this.queryFormInfo,function(resp){
				debugger;
				$this.tableData = resp.returnValue.rows;
				$this.pageData.total = resp.returnValue.total;
				
			})

			//初始化审批框的快速回复下拉
			getQuickReplay({module:"移泊"},function(resp){
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

				getShiftingsForPage(this.pageObj,this.queryFormInfo,function(resp){
					debugger;
					$this.tableData = resp.returnValue.rows;
					$this.pageData.total = resp.returnValue.total;
					$this.pageData.currentPage = 1;
					
				})

			},
			selectCurrentPage:function(currentPageNum){
				debugger;
				this.pageObj.page = currentPageNum;
				let $this = this;
				getShiftingsForPage(this.pageObj,this.queryFormInfo,function(resp){
					debugger;
					$this.tableData = resp.returnValue.rows;
				})
			},
			dblClick:function(currentRowData){
				debugger; 
				this.dialogFormVisible = true;
				this.dialogForm.id =  currentRowData.id;
				this.dialogForm.chName = currentRowData.chName;
				this.dialogForm.agentName = currentRowData.agentName;
				this.dialogForm.enName = currentRowData.enName;
				this.dialogForm.companyName = currentRowData.companyName;
				this.dialogForm.nationality = currentRowData.nationality;
				this.dialogForm.submitTime = currentRowData.submitTime;
				this.dialogForm.postdock = currentRowData.postdock;
				this.dialogForm.postpier = currentRowData.postpier;
				this.dialogForm.prepier = currentRowData.prepier;
				this.dialogForm.predock = currentRowData.predock;
				this.dialogForm.shiftingTime = currentRowData.shiftingTime;
				this.dialogForm.arrivalTime = currentRowData.arrivalTime;

				this.dialogForm.reply = currentRowData.reply || "";
				if(currentRowData.status == '0'){
					this.dialogForm.status = '1';
				}else{
					this.dialogForm.status = currentRowData.status + '';
				}
				

			},
			checkUser:function(openid){
				debugger;
				let $this = this;
				this.detailDialogFormVisible  = true;
				let data = {
					openid : openid || ''
				}
				getShiftingCount(openid,function(resp){
					if(resp.continue && resp.returnValue){
						$this.detailDialogForm.count = resp.returnValue;

					}else{
						$this.detailDialogForm.count = 0;
					}
				})
				getUsers(data,function(resp){
					if(resp.continue && resp.returnValue.length >0){
						let result = resp.returnValue[0];
						$this.detailDialogForm.name = result.name;
						$this.detailDialogForm.phone = result.phone;
						$this.detailDialogForm.companyName = result.companyName;
						$this.detailDialogForm.identityCard = result.identityCard;
		
						if(result.authority != null && result.authority != ''){
							let authority = result.authority.split(',');
							authority.forEach(function(item,index){
								if(/^b\d+$/.test(item)){
									$this.detailDialogForm.boardingList.push(item)
								}else{
									$this.detailDialogForm.businessList.push(item);
								}
							})
						}
							

					}
				})


			},
			changeReply:function(item){
				debugger;
				this.dialogForm.reply = item;
			},
			closeDialog:function(){
				debugger;
				this.dialogForm.reply = '';
				this.dialogForm.status = '';
			},
			saveDialog:function(){
				debugger;
				let $this = this;
				var data = {
	                id: this.dialogForm.id,
	                reply: this.dialogForm.reply,
	                status: this.dialogForm.status
	            }

	            if(data.reply.length > 300){
	            	this.$message({
	            		type:'warning',
	            		message:"回复内容过长，请重新输入"
	            	})
	            	return;
	            }
	            updateShiftingById(data,function(resp){
	            	if(resp.continue){
						//关闭弹框
						$this.dialogFormVisible = false;
						//更新表格
						getShiftingsForPage($this.pageObj, $this.queryFormInfo, function(resp){
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
			closeDetailDialog:function(){
				debugger;
				$this.detailDialogForm.name = '';
				$this.detailDialogForm.phone = '';
				$this.detailDialogForm.companyName = '';
				$this.detailDialogForm.identityCard = '';
				$this.detailDialogForm.count = "";
				$this.detailDialogForm.boardingList = [];
				$this.detailDialogForm.businessList = [];
			}

		}
	}
</script>
<style>
	.borderTop{
		border-top: 1px solid #ccc;
    	padding-top: 10px;
	}
	.agentName{
		color:#0099CC;
	}
	.agentName:hover{

		color:#FF6600;
	}
</style>
