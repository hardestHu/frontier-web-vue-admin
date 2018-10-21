<template>
	<div class="board-shipwork">
		<bread-title :currentTitle="title"></bread-title>
		<query-form :formTemplate="formTemplate" @queryData="onSubmit"></query-form>
		<!-- 表格数据展示 -->
		<el-row>
			<el-table :data="tableData" :stripe="true" size="small" :highlight-current-row="true" @row-dblclick="dblClick($event)" @sort-change="sortChange($event)" >
			    <el-table-column prop="name" label="姓名" >
			    </el-table-column>
			    <el-table-column prop="sex" label="性别">
			    </el-table-column>
			   
			    <el-table-column prop="identityCard" label="证件号">
			    </el-table-column>
			    
			    <el-table-column prop="shipName" label="所登船舶">
			    </el-table-column>
			    <el-table-column prop="shipName" label="随船事由">
			    </el-table-column>
			     	
			    <el-table-column prop="applyTime" label="申请日期" min-width="115px" sortable>
			    </el-table-column>
			    <el-table-column prop="serviceCode" label="处理人">
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

	</div>
</template>
<script>
	import BreadTitle from '../common/BreadTitle'
	import QueryForm from '../common/QueryForm'
	import {getWorkcardsForPage} from '@/api'
	export default{
		data:function(){
			return {
				title:"随船工作证申请",
				formTemplate:{
					button:{add:false},
					model:[
						{name:"name",type:"text",title:"姓名",value:''},
						{name:"serviceCode",type:"text",title:"处理人",value:''},
						{name:"portId",type:"select",title:"所属港口",data:[],value:''},
						{name:"status",type:"select",title:"处理状态",data:[
							{"label":"待执勤人员审核", "value":"0"},
							{"label":"已通过", value:"1"},
							{"label":"未通过", value:"2"},
							{"label":"查询全部",value:""}],
						value:'0'},
					]
				},
				// 查询条件-变量值
				queryFormInfo:{
					name:'',
					serviceCode:'',
					portId:"",
					status:"0",
				},
				//查询条件-分页
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
			
			getWorkcardsForPage(this.pageObj,this.queryFormInfo,function(resp){
				debugger;
				$this.tableData = resp.returnValue.rows;
				$this.pageData.total = resp.returnValue.total;
				
			})


		},
		methods:{
			onSubmit:function(data){
				debugger;
				debugger;
				let $this = this;
				this.queryFormInfo = data;
				this.pageObj = {
					page: 1, //当前页
		            rows: 10, //每页条数
		            sort: "applyTime", //排序字段
		            order: "desc" //排序顺序
				};

				getWorkcardsForPage(this.pageObj,this.queryFormInfo,function(resp){
					debugger;
					$this.tableData = resp.returnValue.rows;
					$this.pageData.total = resp.returnValue.total;
					//$this.pageData.currentPage = 1;
					$this.$set($this.pageData,'currentPage',1);
				})
			},
			dblClick:function(){
				debugger;
			},
			sortChange:function(){
				debugger;
			},
			selectCurrentPage:function(currentPageNum){
				debugger;
				this.pageObj.page = currentPageNum;
				let $this = this;
				getWorkcardsForPage(this.pageObj,this.queryFormInfo,function(resp){
					debugger;
					$this.tableData = resp.returnValue.rows;
				})
			}
		}


	}		

</script>