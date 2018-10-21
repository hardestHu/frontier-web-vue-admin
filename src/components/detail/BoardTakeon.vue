<template>
	<div class="board-takeon">
		<bread-title :currentTitle="title"></bread-title>
		<query-form :formTemplate="formTemplate" @queryData="onSubmit" @addData="addBoard"></query-form>
		<!-- 表格数据展示 -->
		<el-row>
			<el-table :data="tableData" :stripe="true" size="small" :highlight-current-row="true" @row-dblclick="dblClick($event)" @sort-change="sortChange($event)" >
			    <el-table-column prop="shipName" label="船方名称" min-width="60px">
			    </el-table-column>
			    <el-table-column prop="companyName" label="所属单位" min-width="140px">
			    </el-table-column>
			   
			     <el-table-column prop="stopPort" label="所搭靠船舶">
			    </el-table-column>
			    
			     <el-table-column prop="matter" label="搭靠事由">
			     	</el-table-column>
			     <el-table-column prop="termFlag" label="搭靠类型">
			     	<template slot-scope="scope">
			     			<span>{{scope.row.termFlag == '0'?'短期':(scope.row.termFlag == '1'?'长期':'--')}}</span>
			     	</template>
			    </el-table-column>
			    <el-table-column prop="applyTime" label="申请日期" min-width="115px" sortable>
			    </el-table-column>
			    <el-table-column prop="serviceCode" label="处理人">
			    </el-table-column>
			    
			    <el-table-column prop="channel" label="申请渠道">
			    	<template slot-scope="scope">
			    		{{scope.row.channel == 'LOCAL'?'线下':'线上'}}
			    	</template>
			    </el-table-column>
			     <el-table-column prop="status" label="处理状态" min-width="105px">
			     	<template slot-scope="scope">
			     			<span>{{scope.row.status == '0'?'待执勤人员审核':(
			     				scope.row.status == '1'?'通过':(
			     											scope.row.status == '2'?'未通过':(
			     											scope.row.status == '3'?'待科领导审核':(
			     											scope.row.status == '4'?'待业务领导审核':'--'
			     											))))}}</span>
			     	</template>
			    </el-table-column>
			    
			</el-table>
		</el-row>
			
		<!-- 分页 -->
		<el-row class="pageComponent">
			<el-pagination background layout="prev, pager, next" :page-size="pageData.pageSize"  :total="pageData.total" :current-page.sync="pageData.currentPage" @current-change="selectCurrentPage($event)"></el-pagination>
		</el-row>

		<!-- 审批弹框 -->

		<el-dialog title="搭靠证详细信息" :visible.sync="dialogFormVisible" width="80%" >
			<el-form :model="dialogForm"  :inline="true" size="mini" label-position="right" label-suffix=" :" ref="dialogForm">
				
			  	<el-row>
			  		<el-col :span="7" :offset='1'>
			  			<el-form-item label="船方名称">
				        	<span>{{dialogForm.shipName}}</span>
					    </el-form-item>
			  		</el-col>
					
			  		<el-col :span="7" :offset='1'>
			  			<el-form-item label="船舶用途">
			  				<span>{{dialogForm.shipUse}}</span>
					    </el-form-item>
			  		</el-col>

			  		<el-col :span="7" :offset='1'>
			  			<el-form-item label="船舶吨位">
			  				<span>{{dialogForm.tonnage}}</span>
					    </el-form-item>
			  		</el-col>	
			  		
			  		<el-col :span="7" :offset="1">
					    <el-form-item label="船舶马力">
				        	<span>{{dialogForm.horsepower}}</span>
				    	</el-form-item>
					</el-col>  	
					
					<el-col :span="7" :offset="1">
					    <el-form-item label="船籍港">
				        	<span>{{dialogForm.registerPort}}</span>
				    	</el-form-item>
					</el-col>

					<el-col :span="7" :offset="1">
						<el-form-item label="所属单位">
					        <span>{{dialogForm.companyName}}</span>
					    </el-form-item>	
					</el-col>

					<el-col :span="7" :offset="1">
						<el-form-item label="所搭靠船舶">
					        <span>{{dialogForm.stopPort}}</span>
					    </el-form-item>	
					</el-col>

					
					<el-col :span="7" :offset="1">
						<el-form-item label="申请时间">
					        <span>{{dialogForm.applyTime}}</span>
					    </el-form-item>	
					</el-col>
					<el-col :span="7" :offset="1">
						<el-form-item label="搭靠事由">
					        <span>{{dialogForm.matter}}</span>
					    </el-form-item>	
					</el-col>
					<el-col :span="7" :offset="1">
						<el-form-item label="相关证明">
					        <a style="color:#0099CC">相关证明查看</a>
					    </el-form-item>	
					</el-col>

					<!-- <el-col :span="7" :offset="1" v-if="dialogForm.hasChildren != null">
						<el-form-item label="携带儿童">
							<span v-if="dialogForm.hasChildren != '0'">携带</span>
							<span v-else>不携带</span>
					    </el-form-item>	
					</el-col> -->
			  	</el-row>
				
				<el-row>
					<el-col :span="11" :offset="1">
						<el-form-item label="起止时间">
							<el-date-picker v-model="dialogForm.rangeTime" type="daterange" range-separator="~"start-placeholder="开始日期" end-placeholder="结束日期" v-if="dialogForm.currentStatus == '0'">
							    </el-date-picker>
							    <span v-else> {{dialogForm.rangeTime[0]+'~'+dialogForm.rangeTime[1]}}</span>
					    </el-form-item>	
					</el-col>
					

					<el-col :span="11" :offset="1">
						<el-form-item label="处理状态">
							<el-radio-group v-model="dialogForm.status" v-if="dialogForm.currentStatus == '0'">
						      <el-radio label="1">通过</el-radio>
						      <el-radio label="2">不通过</el-radio>
						    </el-radio-group>					
					  		<span v-else>{{dialogForm.currentStatus == '1'?'通过':'不通过'}}</span>	
					    </el-form-item>	

					</el-col>

					<el-col :span="11" :offset="1">
						<el-form-item label="二维码" prop="qrcode" :rules="rules.ruleForQrcode" ref='qrcode'>
							 <el-input type="textarea" v-model="dialogForm.qrcode" :autosize="{minRows: 4,maxRows:8}" style="width:360px" :disabled="dialogForm.status == '2'" v-if="dialogForm.currentStatus == '0'"></el-input>
							 <span v-else>{{dialogForm.qrcodeText}}</span>

					    </el-form-item>	
					</el-col>

					
					

				</el-row>
				<el-row>
					<el-col :span="11" :offset="1" v-if="dialogForm.currentStatus == '0'">
						<el-form-item label="常用回复">
				  			<el-select v-model="dialogForm.quickReplyContent" @change="changeReply($event)" :disabled="dialogForm.status == '2'">
				  				<el-option v-for="reply in dialogForm.replyList" :label="reply.content" :value="reply.content"></el-option>
				  			</el-select>
				  		</el-form-item>
					</el-col>

					<el-col :span="11" :offset="1" >
				  		<el-form-item label="回复内容" prop='reply' :rules="rules.ruleForReply" ref='reply' >
				  			 <el-input type="textarea" v-model="dialogForm.reply" :rows="4" style='width:360px' v-if="dialogForm.currentStatus == '0'"></el-input>
				  			 <span v-else>{{dialogForm.replyText}}</span>
				  		</el-form-item>
				  	</el-col>

		
				  	<el-col :span="11" :offset="1" v-if="dialogForm.currentStatus != '0'">
				  		<el-form-item label="处理人">
				  			 <span>{{dialogForm.serviceCode}}</span>
				  		</el-form-item>
				  	</el-col>
				</el-row>

		
	
			</el-form>
			<div slot="footer">
				<el-button type="primary" @click="dialogFormVisible = false" v-if="dialogForm.currentStatus == '0'">取 消</el-button>
				<el-button type="primary" @click="saveDialog('dialogForm')" v-if="dialogForm.currentStatus == '0'">保 存</el-button>
				<el-button type="primary" @click="dialogFormVisible = false" v-else>关 闭</el-button>
			</div>
		</el-dialog>

			<!-- 新增弹框 -->
		<el-dialog title="新增搭靠证" :visible.sync="addDialogFormVisible" width="60%" >
			<el-form :model="addDialogForm"  :inline="true" size="mini" label-position="right" label-width="120px" label-suffix=" :" ref="addDialogForm" :rules='rules.ruleForAddTakeon'>
				<el-row>
					<el-col :span='11' :offset='1'>
						<el-form-item label="姓名" prop="name">
							<el-input type="text" v-model="addDialogForm.name">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span='11' :offset='1'>
						<el-form-item label="身份证号" prop="identityCard">
							<el-input type="text" v-model="addDialogForm.identityCard">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span='11' :offset='1'>
						<el-form-item label="搭靠事由" prop="matter">
							<el-select v-model="addDialogForm.matter">
								<el-option :label="item.label" :value="item.value" v-for="item in addDialogForm.matterList"></el-option>	
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span='11' :offset='1'>
						<el-form-item label="港口" prop="portId">
							<el-select v-model="addDialogForm.portId">
								<el-option :label="item.label" :value="item.value" v-for="item in addDialogForm.portList" ></el-option>
							</el-select>
							
						</el-form-item>
					</el-col>
					<el-col :span='11' :offset='1'>
						<el-form-item label="船方名称" prop="shipName">
							<el-input type="text" v-model="addDialogForm.shipName">
							</el-input>
						</el-form-item>
					</el-col>

					<el-col :span='11' :offset='1'>
						<el-form-item label="船舶用途" prop="shipUse">
							<el-input type="text" v-model="addDialogForm.shipUse">
							</el-input>
						</el-form-item>
					</el-col>

					<el-col :span='11' :offset='1'>
						<el-form-item label="船舶吨位" prop="tonnage">
							<el-input type="text" v-model="addDialogForm.tonnage">
							</el-input>
						</el-form-item>
					</el-col>

					<el-col :span='11' :offset='1'>
						<el-form-item label="船舶马力" prop="horsepower">
							<el-input type="text" v-model="addDialogForm.horsepower">
							</el-input>
						</el-form-item>
					</el-col>

					<el-col :span='11' :offset='1'>
						<el-form-item label="船舶IMO编号" prop="imo">
							<el-input type="text" v-model="addDialogForm.imo">
							</el-input>
						</el-form-item>
					</el-col>
					
					<el-col :span='11' :offset='1'>
						<el-form-item label="船籍港" prop="registerPort">
							<el-input type="text" v-model="addDialogForm.registerPort">
							</el-input>
						</el-form-item>
					</el-col>


					<el-col :span='11' :offset='1'>
						<el-form-item label="所属单位" prop="companyName">
							<el-input type="text" v-model="addDialogForm.companyName">
							</el-input>
						</el-form-item>
					</el-col>

					<el-col :span='11' :offset='1'>
						<el-form-item label="所搭靠船舶" prop="stopPort">
							<el-input type="text" v-model="addDialogForm.stopPort">
							</el-input>
						</el-form-item>
					</el-col>
					
					<el-col :span='11' :offset='1'>
						<el-form-item label="类型">
							<el-select v-model="addDialogForm.termFlag">
								<el-option label="短期登轮证" value="0"></el-option>
								<el-option label="长期登轮证" value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>

					
					<el-col :span='23' :offset='1'>
						<el-form-item label="有效期限" prop="rangeTime">
					    	<el-date-picker v-model="addDialogForm.rangeTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">

    						</el-date-picker>						
						</el-form-item>
					</el-col>

				</el-row>
			</el-form>
			<div slot="footer">
				<el-button @click="addDialogFormVisible = false">取 消</el-button>
      			<el-button type="primary" @click="confirmAddTakeon">确 认</el-button>
			</div>
		</el-dialog>

	</div>
</template>
<script>
	import BreadTitle from '../common/BreadTitle'
	import QueryForm from '../common/QueryForm'
	import {getDocksForPage,getQuickReplay,updateDockById,addTakeon,getDictionarys} from '@/api'
	//导入校验方法
	import {ruleForContent,ruleForQrcode,validateId} from '@/api/validate'
	export default {

		data:function(){
			return {
				title:'船舶搭靠外轮许可',
				formTemplate:{
					button:{add:true},
					model:[
						{name:"shipName",type:"text",title:"船舶名称",value:''},
						{name:"serviceCode",type:"text",title:"处理人",value:''},
						{name:"status",type:"select",title:"处理状态",data:[
							{"label":"待执勤人员审核", "value":"0"},
							{"label":"已通过", value:"1"},
							{"label":"未通过", value:"2"},
							{"label":"待科领导审核", value:"3"},
							{"label":"待业务领导审核", value:"4"},
							{"label":"查询全部",value:""}],
						value:'0'},

						{name:"portId",type:"select",title:"所属港口",data:[],value:''},
						{name:"termFlag",type:"select",title:"搭靠证类型",data:[
                            {"label":"短期", "value":"0"},
							{"label":"长期", "value":"1"},
						],value:'0'},
					]
				},
				// 查询变量-变量值
				queryFormInfo:{
					shipName:'',
					serviceCode:'',
					portId:"",
					status:"0",
					termFlag:"0"
				},
				tableData:[],
				//查询变量-分页
				pageObj:{
					page: 1, //当前页
		            rows: 10, //每页条数
		            sort: "applyTime", //排序字段
		            order: "desc" //排序顺序
				},
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
					shipName:'',
					shipUse:'',
					tonnage:'',
					horsepower:'',
					registerPort:'',
					companyName:'',
					stopPort:'',
					applyTime:'',
					matter:"",
					rangeTime:"",
					
					replyList:[],
					qrcode:'',
					quickReplyContent:'',
					reply:'',
					status:'',
					currentStatus:'',
					qrcodeText:"",//用于展示态下二维码展示
					replyText:'',//同上
					serviceCode:""//同上
				},
				//新增按钮的弹框
				addDialogFormVisible:false,
				addDialogForm:{
					name:"",
					identityCard:"",
					matter:"油污水回收",
					portId:"1835150862795776",
					shipName:'',
					shipUse:"",
					tonnage:'',
					horsepower:"",
					imo:"",
					registerPort:"",
					companyName:"",
					stopPort:"",
					rangeTime:[],
					termFlag:"0",

					portList:[],
					matterList:[]
				},
				rules:{
					ruleForQrcode:[{validator:ruleForQrcode,trigger: 'blur'}],
					ruleForReply:[{required:true,validator:ruleForContent, trigger: 'blur'}],
					ruleForAddTakeon:{
						name:[{required:true,message:"请填写姓名",trigger:'blur'}],
						identityCard:[{required:true,validator:validateId,trigger:'blur'}],
						shipName:[{required:true,message:"请填写船舶名称",trigger:'blur'}],
						shipUse:[{required:true,message:"请填写船舶用途",trigger:'blur'}],
						tonnage:[{required:true,message:"请填写船舶吨位",trigger:'blur'}],
						horsepower:[{required:true,message:"请填写船舶马力",trigger:'blur'}],
						imo:[{required:true,message:"请填写船舶用途",trigger:'blur'}],
						registerPort:[{required:true,message:"请填写船舶所在港",trigger:'blur'}],
						companyName:[{required:true,message:"请填写单位名称",trigger:'blur'}],
						stopPort:[{required:true,message:"请填写搭靠船舶",trigger:'blur'}],
						rangeTime:[{required:true,message:"请选择日期",trigger:'blur'}]
					}
					
				}


			
			}
		},
		components:{
			QueryForm,
			BreadTitle
		},
		mounted:function(){
			debugger;
			let $this = this;
			this.formTemplate.model[3].data = this.$store.state.portList;

			this.queryFormInfo.portId = this.$store.state.portId;

			//初始化表格
			getDocksForPage(this.pageObj,this.queryFormInfo,function(resp){
				debugger;
				$this.tableData = resp.returnValue.rows;
				$this.pageData.total = resp.returnValue.total;
				
			})

			//获取搭靠事由下拉列表
			getDictionarys({ index: "takeonMatter" },function(resp){
				let matterList = resp.returnValue;
				matterList.forEach(function(item,index){
					item.label = item.name;
					item.value = item.name;
				})
				//添加弹框里的事由下拉
				$this.addDialogForm.matterList = JSON.parse(JSON.stringify(matterList));

			})

			//新增登轮 弹框里的港口下拉, 利用深拷贝的一种方式
			this.addDialogForm.portList = JSON.parse(JSON.stringify(this.$store.state.portList));
			this.addDialogForm.portList.shift();


			//todo
			//初始化审批框的快速回复下拉
			getQuickReplay({"module": "许可证"},function(resp){
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
					page: 1, //当前页
		            rows: 10, //每页条数
		            sort: "applyTime", //排序字段
		            order: "desc" //排序顺序
				};

				getDocksForPage(this.pageObj,this.queryFormInfo,function(resp){
					debugger;
					$this.tableData = resp.returnValue.rows;
					$this.pageData.total = resp.returnValue.total;
					//$this.pageData.currentPage = 1;
					$this.$set($this.pageData,'currentPage',1);
				})
			},
			addBoard:function(){
				debugger;
				this.addDialogFormVisible = true;

				this.addDialogForm.name = '';
				this.addDialogForm.identityCard = '';
				this.addDialogForm.matter = '油污水回收';
				this.addDialogForm.portId = '1835150862795776';
				this.addDialogForm.shipName = '';
				this.addDialogForm.shipUse = '';
				this.addDialogForm.tonnage = '';
				this.addDialogForm.horsepower = '';
				this.addDialogForm.imo = '';
				this.addDialogForm.registerPort = '';
				this.addDialogForm.companyName = '';
				this.addDialogForm.stopPort = '';
				this.addDialogForm.termFlag = '0';
				this.addDialogForm.rangeTime = [];

				//重置校验
				if(this.$refs['addDialogForm'] != undefined){
			        this.$refs["addDialogForm"].resetFields();  
				}
			},
			dblClick:function(currentRowData){
				debugger;
				this.dialogFormVisible = true;
				this.dialogForm.id = currentRowData.id;
				this.dialogForm.shipName = currentRowData.shipName;
				this.dialogForm.shipUse = currentRowData.shipUse;
				this.dialogForm.tonnage = currentRowData.tonnage;
				this.dialogForm.horsepower = currentRowData.horsepower;
				this.dialogForm.registerPort = currentRowData.registerPort;
				this.dialogForm.companyName = currentRowData.companyName;
				this.dialogForm.stopPort = currentRowData.stopPort;
				this.dialogForm.applyTime = currentRowData.applyTime;
				this.dialogForm.matter = currentRowData.matter;

				this.dialogForm.rangeTime = [currentRowData.startTime,currentRowData.endTime];
				this.dialogForm.status = '1';
				this.dialogForm.qrcode = "";
				this.dialogForm.quickReplyContent = '';
				this.dialogForm.reply = '';

				//用来切换弹框是展示还是编辑状态
				this.dialogForm.currentStatus = currentRowData.status;
				this.dialogForm.qrcodeText = currentRowData.qrcode;
				this.dialogForm.replyText = currentRowData.reply;
				this.dialogForm.serviceCode = currentRowData.serviceCode;

				//重置校验
				if(this.$refs['dialogForm'] != undefined){
			        this.$refs["dialogForm"].resetFields();  
				}

			},
			selectCurrentPage:function(currentPageNum){
				debugger;
				this.pageObj.page = currentPageNum;
				let $this = this;
				getDocksForPage(this.pageObj,this.queryFormInfo,function(resp){
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
				getDocksForPage(orderObj,this.queryFormInfo,function(resp) {
                    debugger;
				    $this.tableData = resp.returnValue.rows;
				    $this.pageData.total = resp.returnValue.total;
                })

			},
			changeReply:function(item){
				debugger;
				this.dialogForm.reply = item;
			},
			saveDialog:function(formName){
				debugger;
				let $this = this;
				let valiResult = true;
				if(this.dialogForm.status == '1'){
					$this.$refs['dialogForm'].validate((valid)=>{
						if(valid){
							$this.updateDock();
						}else{
							return false
						}
					});

				}else{
					$this.$refs['dialogForm'].validateField('reply',(errorMesg)=>{
						if(!errorMesg){
							$this.updateDock();
						}else{
							return false
						}
					});
				}
					
				
			},
			updateDock:function(){
				
				let $this = this;
				let takeonDialog = {
							id: this.dialogForm.id,
							status: this.dialogForm.status,
							qrcode: this.dialogForm.qrcode,
							startTime: this.dialogForm.rangeTime[0],
							endTime: this.dialogForm.rangeTime[1],
							reply: this.dialogForm.reply
						} 
				
				updateDockById(takeonDialog,function(resp){

					if(resp.continue){
						//关闭弹框
						$this.dialogFormVisible = false;

						//更新表格
						getDocksForPage($this.pageObj,$this.queryFormInfo,function(resp){
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
			confirmAddTakeon:function(){
				debugger;
				let $this = this;
				this.$refs['addDialogForm'].validate((valid)=>{
						if(valid){
							let data = {};
							//data.name = this.addDialogForm.name; //name不用传
							data.identityCard = this.addDialogForm.identityCard;
							data.matter = this.addDialogForm.matter;
							data.portId = this.addDialogForm.portId;
							data.shipName = this.addDialogForm.shipName;
							data.shipUse = this.addDialogForm.shipUse;
							data.tonnage = this.addDialogForm.tonnage;
							data.horsepower = this.addDialogForm.horsepower;
							data.imo = this.addDialogForm.imo;
							data.registerPort = this.addDialogForm.registerPort;
							data.companyName = this.addDialogForm.companyName;
							data.stopPort =	this.addDialogForm.stopPort;
							data.termFlag =	this.addDialogForm.termFlag;
							data.startTime = this.addDialogForm.rangeTime[0];
							data.endTime  = this.addDialogForm.rangeTime[1];

							//找吉力看个日志
							addTakeon(data,function(resp){
									if(resp.continue){
										//关闭弹框
										$this.addDialogFormVisible = false;
										//更新表格
										getDocksForPage($this.pageObj,$this.queryFormInfo,function(resp){
											debugger;
											$this.tableData = resp.returnValue.rows;
											$this.pageData.total = resp.returnValue.total;
											$this.$message({
								          		message: "新增成功",
								          		type:"success"
									        });	

										})	

									}
							})


						}else{
							return false
						}
					});
				
				

			}		

		}
	}
</script>
