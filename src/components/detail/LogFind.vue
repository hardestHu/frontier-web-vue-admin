<template>
	<div class="log-find">
		<bread-title :currentTitle="title"></bread-title>
		<query-form :formTemplate="formTemplate" @queryData="onSubmit"></query-form>
		<!-- 表格数据展示 -->
		<el-row>
			<el-table :data="tableData" :stripe="true" size="small" :highlight-current-row="true">

			    <el-table-column prop="id" label="编号" ></el-table-column>
			    <el-table-column prop="userName" label="操作员姓名"></el-table-column>
			    <el-table-column prop="operation" label="操作内容"></el-table-column>
			    <el-table-column prop="module" label="操作模块"></el-table-column>
			    <el-table-column prop="operationTime" label="操作时间"></el-table-column>
			 
			     
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
	import {getLoggingsForPage,getPartys} from '@/api'
	export default{
		data:function(){
			return {
				title:'日志管理',
				formTemplate:{
					button:{add:false},
					model:[
						{name:"userName",type:"select",title:"操作员",data:[],value:''},
						{name:"module",type:"text",title:"模块名称",value:''},
						{name:"rangTime",type:"datetimerange",title:"发生时间",value:''}
					]
				},

				// 查询条件-变量值
				queryFormInfo:{
	                userName: "",
	                module: "",
	                startTime: "",
	                endTime: ""
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
				}
			}
		},
		components:{
				BreadTitle,
				QueryForm,
				
		},
		mounted:function(){
			debugger;
			let $this = this;
			getPartys(function(resp){
				if(resp.continue){
					let userList = resp.returnValue;
					userList.forEach(function(item,index){
						item.label = item.userName;
						item.value = item.userName;
					})
					$this.formTemplate.model[0].data = userList;
				}
			})

			//初始化表格
			
			getLoggingsForPage(this.pageObj,this.queryFormInfo,function(resp){
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
				this.queryFormInfo.userName = data.userName;
				this.queryFormInfo.module = data.module;
				this.queryFormInfo.startTime = data.rangTime[0];
				this.queryFormInfo.endTime = data.rangTime[1];

				this.pageObj = {
					page: 1,  //当前页
		            rows: 10, //每页条数
		            sort: "", //排序字段
            		order: "" //排序顺序
				};

				getLoggingsForPage(this.pageObj,this.queryFormInfo,function(resp){
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
				getLoggingsForPage(this.pageObj,this.queryFormInfo,function(resp){
					debugger;
					$this.tableData = resp.returnValue.rows;
				})
			},
		}


	}
</script>