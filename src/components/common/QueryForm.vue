<!-- 
		使用方式：通过属性formTemplate，传入数据，遍历出表单
		formTemplate.button.add    【true:添加按钮显示,false:添加按钮不显示】
		formTemplate.model         【name:名称,type:[text/select],title:就是表单的label,value:给定的默认值,data:针对select，传入下拉框的option，一定要有label和name】
		例如：
		formTemplate:{
					button：{add：true}
					model:[
						{name:"name",type:"text",title:"姓名",value:''},
						{name:"serviceCode",type:"text",title:"处理人",value:''},
						{name:"portId",type:"select",title:"所属港口",data:[],value:''},
						{name:"status",type:"select",title:"处理状态",data:[
							{"label":"待执勤人员审核", "value":"0"},
							{"label":"已通过", value:"1"},
							{"label":"未通过", value:"2"},
						    {"label":"待科领导审核", value:"3"},
							{"label":"待业务领导审核", value:"4"},
							{"label":"查询全部",value:""}],
						value:'0'},
					]
				}

	 -->
<template>
	<el-row>
			<el-form :inline="true" label-position="right" label-width="85px"  size="mini" :model="queryFormInfo">
				<el-col :xs="24" :sm="12" :md="onePiece.type == 'datetimerange'?12:7" :offset="1" v-for="onePiece in formTemplate.model">
					<el-form-item :label="onePiece.title">
					    <!-- select -->
					    <el-select v-model="queryFormInfo[onePiece.name]" v-if="onePiece.type == 'select'">	
					    	<el-option  v-for="item in onePiece.data" :label="item.label" :value="item.value"></el-option>
					    </el-select>
						
						<!-- 时间选择器 -->
					    <el-date-picker v-model="queryFormInfo[onePiece.name]" v-else-if="onePiece.type=='datetimerange'" :type="onePiece.type" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
					    
					    <!-- input框 -->
					    <el-input v-model="queryFormInfo[onePiece.name]" v-else></el-input>
					
					</el-form-item>
				</el-col>

				<el-col :xs="7" :sm="7" :md="7"  :offset="1">
					<el-form-item>
					    <el-button type="primary" @click="onSubmit">查询</el-button>
					    <el-button type="primary" @click="add" v-if='formTemplate.button.add'>添加</el-button>
					</el-form-item>	
				</el-col>
			</el-form>
		</el-row>
	

</template>
<script>
	export default{
		data:function(){
			return {
				queryFormInfo:{}
			}
		},
		props:['formTemplate'],
		beforeMount:function(){
			let $this = this;
			this.formTemplate.model.forEach(function(item,index){
				// $this.queryFormInfo[item.name] = item.value;
				// 直接赋值，选择select不更新
				$this.$set($this.queryFormInfo,item.name,item.value);
			})

		},
		methods:{
			onSubmit:function(){
				this.$emit('queryData',this.queryFormInfo)
			},
			add:function(){
				this.$emit('addData',this.queryFormInfo)
			}
		}
	}
</script>
