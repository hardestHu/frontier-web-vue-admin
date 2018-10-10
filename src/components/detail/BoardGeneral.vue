<template>
	<div>
		<bread-title :currentTitle="title"></bread-title>
		<query-form :formTemplate="formTemplate" @queryData="onSubmit"></query-form>
		<el-row>
			<el-table :data="tableData" :stripe="true" size="small" :highlight-current-row="true" @row-dblclick="dblClick($event)"@sort-change="sortChange($event)" >
			    <el-table-column prop="name" label="姓名" min-width="60px">
			    </el-table-column>
			    <el-table-column prop="sex" label="性别" min-width="40px">
			    </el-table-column>
			    <el-table-column prop="companyName" label="单位" min-width="160px">
			    </el-table-column>
			     <el-table-column prop="shipName" label="所登船舶">
			    </el-table-column>
			    
			     <el-table-column prop="matter" label="登轮事由">
			     	</el-table-column>
			     <el-table-column prop="termFlag" label="登轮类型">
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

		<!-- 弹框 -->

		<el-dialog title="临时登轮证详细信息" :visible.sync="dialogFormVisible" width="80%" >
			  <el-form :model="dialogForm"  :inline="true" size="mini" label-position="right" label-suffix=" :">
			  	<el-row>
			  		<el-col :span="7" :offset='1'>
			  			<el-form-item label="姓名">
				        	<span>{{dialogForm.name}}</span>
					    </el-form-item>
			  		</el-col>
					
			  		<el-col :span="7" :offset='1'>
			  			<el-form-item label="性别">
			  				<span>{{dialogForm.sex}}</span>
					    </el-form-item>
			  		</el-col>

			  		<el-col :span="7" :offset='1'>
			  			<el-form-item label="出生日期">
			  				<span>{{dialogForm.birthDate}}</span>
					    </el-form-item>
			  		</el-col>	
			  		
			  		<el-col :span="7" :offset="1">
					    <el-form-item label="单位">
				        	<span>{{dialogForm.companyName}}</span>
				    	</el-form-item>
					</el-col>  	
					
					<el-col :span="7" :offset="1">
					    <el-form-item label="职位">
				        	<span>{{dialogForm.duty}}</span>
				    	</el-form-item>
					</el-col>

					<el-col :span="7" :offset="1">
						<el-form-item label="身份证号">
					        <span>{{dialogForm.identityCard}}</span>
					    </el-form-item>	
					</el-col>

					<el-col :span="7" :offset="1">
						<el-form-item label="所登船舶">
					        <span>{{dialogForm.shipName}}</span>
					    </el-form-item>	
					</el-col>

					
					<el-col :span="7" :offset="1">
						<el-form-item label="申请时间">
					        <span>{{dialogForm.applyTime}}</span>
					    </el-form-item>	
					</el-col>
					<el-col :span="7" :offset="1">
						<el-form-item label="申请事由">
					        <span>{{dialogForm.matter}}</span>
					    </el-form-item>	
					</el-col>
					<el-col :span="7" :offset="1">
						<el-form-item label="相关证明">
					        <a style="color:#0099CC">相关证明查看</a>
					    </el-form-item>	
					</el-col>

					<el-col :span="7" :offset="1" v-if="dialogForm.hasChildren != null">
						<el-form-item label="携带儿童">
							<span v-if="dialogForm.hasChildren != '0'">携带</span>
							<span v-else>不携带</span>
					    </el-form-item>	
					</el-col>
			  	</el-row>
				
				<el-row>
					<el-col :span="11" :offset="1">
						<el-form-item label="起止时间">
							<el-date-picker v-model="dialogForm.rangTime" type="daterange" range-separator="~"start-placeholder="开始日期" end-placeholder="结束日期">
							    </el-date-picker>
					    </el-form-item>	
					</el-col>
					<el-col :span="11" :offset="1">
						<el-form-item label="">
							<el-checkbox v-model="dialogForm.enabled">本航次有效</el-checkbox>							
					    </el-form-item>	
					</el-col>
					
					<el-col :span="11" :offset="1">
						<el-form-item label="二维码">
							 <el-input type="textarea" v-model="dialogForm.qrcode" :autosize="{minRows: 4,maxRows:8}" style="width:360px"></el-input>
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
					
					


				</el-row>
				<el-row>
					<el-col :span="11" :offset="1">
						<el-form-item label="常用回复">
				  			<el-select v-model="dialogForm.quickReplyContent" @change="changeReply($event)">
				  				<el-option v-for="reply in dialogForm.replyList" :label="reply.content" :value="reply.content"></el-option>
				  			</el-select>
				  		</el-form-item>
					</el-col>

					<el-col :span="11" :offset="1" >
				  		<el-form-item label="回复内容" prop='reply'>
				  			 <el-input type="textarea" v-model="dialogForm.reply" :rows="4" style='width:360px'></el-input>
				  		</el-form-item>
				  	</el-col>
				</el-row>

		
	
			  </el-form>
			 <!--  <div slot="footer">
			   <el-button type="primary" @click="deleteDialog">删 除</el-button>
			   <el-button type="primary" @click="confirmDialog" v-if="dialogForm.status == '0'">审 核</el-button>
			   <el-button type="primary" @click="disableDialog">失 效</el-button>
			   <el-button type="primary" @click="updateDialog" v-if="dialogForm.status == '1'">更 新</el-button>
			 </div> -->
		</el-dialog>

	</div>
</template>
<script>
	import BreadTitle from '../common/BreadTitle'
	import QueryForm from '../common/QueryForm'
	import {getDictionarys,getBoardingsForPage} from '@/api'
	export default {
		data:function(){
			return {
				title:"上下外国船舶许可",
				formTemplate:{
					button:{add:true},
					model:[
						{name:"name",type:"text",title:"姓名",value:''},
						{name:"serviceCode",type:"text",title:"处理人",value:''},
						{name:"matter",type:"select",title:"登轮事由",data:[],value:''},
						{name:"portId",type:"select",title:"所属港口",data:[],value:''},
						{name:"status",type:"select",title:"处理状态",data:[
							{"label":"待执勤人员审核", "value":"0"},
							{"label":"已通过", value:"1"},
							{"label":"未通过", value:"2"},
							{"label":"待科领导审核", value:"3"},
							{"label":"待业务领导审核", value:"4"},
							{"label":"查询全部",value:""}],
						value:'0'},
						{name:"termFlag",type:"select",title:"登轮类型",data:[
                            {"label":"短期", "value":"0"},
							{"label":"长期", "value":"1"},
						],value:'0'},
					]
				},
				// 查询变量-变量值
				queryFormInfo:{
					name:'',
					serviceCode:'',
					matter:'',
					portId:"",
					status:"0",
					termFlag:"0"
				},
				//查询变量-分页
				pageObj:{
					page: 1, //当前页
		            rows: 10, //每页条数
		            sort: "applyTime", //排序字段
		            order: "desc" //排序顺序
				},
				tableData:[],
				//分页组件变量
				pageData:{
					total:0,
					pageSize:10,
					currentPage:1
				},
				dialogFormVisible:false,
				//审批弹框
				dialogForm:{
					id:'',
					name:'',
					identityCard:'',
					sex:'',
					duty:'',
					birthDate:'',
					shipName:'',
					matter:'',
					applyTime:'',
					hasChildren:'',
					businessList:[],
					boardingList:[],
					replyList:'',
					quickReplyContent:'',
					reply:'',
					status:'1'
				},
			}
		},
		components:{
			BreadTitle,
			QueryForm
		},
		mounted:function(){
			let $this = this;
			//获取登轮事由下拉列表
			getDictionarys({ index: "boardMatter" },function(resp){
				let matterList = resp.returnValue;
				matterList.forEach(function(item,index){
					item.label = item.name;
					item.value = item.name;
				})
				matterList.unshift({label:'请选择登轮事由',value:''});
				$this.formTemplate.model[2].data = matterList;
			})
			this.formTemplate.model[3].data = this.$store.state.portList;

			//初始化表格
			this.queryFormInfo.portId = this.$store.state.portId;
			getBoardingsForPage(this.pageObj,this.queryFormInfo,function(resp){
				debugger;
				if(resp.returnValue && resp.returnValue.total > 0){
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
					page: 1, //当前页
		            rows: 10, //每页条数
		            sort: "applyTime", //排序字段
		            order: "desc" //排序顺序
				};
				getBoardingsForPage(this.pageObj,data,function(resp){
					debugger;
					$this.tableData = resp.returnValue.rows;
					$this.pageData.total = resp.returnValue.total;
					//$this.$set($this.pageData,'currentPage',1);
					$this.pageData.currentPage = 1;

				})
			},
			selectCurrentPage:function(currentPageNum){
				debugger;
				this.pageObj.page = currentPageNum;
				let $this = this;
				getBoardingsForPage(this.pageObj,this.queryFormInfo,function(resp){
					debugger;
					$this.tableData = resp.returnValue.rows;
				})

			},
			sortChange:function(orderInfo){
				debugger;
				let $this = this;
				console.log('col',orderInfo);
				let orderObj = {
					sort:orderInfo.prop,
					order:orderInfo.order == 'descending' ? 'desc' : 'asc' 
				}
				getBoardingsForPage(orderObj,this.queryFormInfo,function(resp) {
                    debugger;
				    $this.tableData = resp.returnValue.rows;
                })
			},
			dblClick:function(currentRowData){
				debugger;
				console.log(JSON.stringify(currentRowData));
				
				this.dialogFormVisible = true;	

				this.dialogForm.name = currentRowData.name;
				this.dialogForm.sex = currentRowData.sex;
				this.dialogForm.birthDate = currentRowData.birthDate;
				this.dialogForm.companyName = currentRowData.companyName;
				this.dialogForm.duty = currentRowData.duty;
				this.dialogForm.identityCard = currentRowData.identityCard;
				this.dialogForm.shipName = currentRowData.shipName;
				this.dialogForm.applyTime = currentRowData.applyTime;
				this.dialogForm.matter = currentRowData.matter;
				this.dialogForm.hasChildren = currentRowData.hasChildren;
				this.dialogForm.rangTime = currentRowData.startTime+'~'+currentRowData.endTime;
				this.dialogForm.enabled = currentRowData.enabled;
				this.dialogForm.qrcode = currentRowData.qrcode;
				this.dialogForm.status = currentRowData.status;

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