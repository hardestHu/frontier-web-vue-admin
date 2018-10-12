<template>
	<div class="board-takeon">
		<bread-title :currentTitle="title"></bread-title>
		<query-form :formTemplate="formTemplate" @queryData="onSubmit" @addData="addBoard"></query-form>
	</div>
</template>
<script>
	import BreadTitle from '../common/BreadTitle'
	import QueryForm from '../common/QueryForm'
	import {} from '@/api'
	export default {
		data:function(){
			return {
				title:'船舶搭靠外轮许可',
				formTemplate:{
					button:{add:true},
					model:[
						{name:"name",type:"text",title:"船舶名称",value:''},
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
					name:'',
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
			}
		},
		components:{
			BreadTitle,
			QueryForm
		},
		mounted:function(){
			debugger;
			this.formTemplate.model[3].data = this.$store.state.portList;
		},
		methods:{
			onSubmit:function(){

			},
			addBoard:function(){

			}
		}
	}
</script>