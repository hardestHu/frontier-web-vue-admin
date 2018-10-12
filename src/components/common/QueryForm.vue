<template>
	<el-row>
			<el-form :inline="true" label-position="right" label-width="85px"  size="mini" :model="queryFormInfo">
				<el-col :xs="24" :sm="12" :md="7" :lg="7" :xl="7" :offset="1" v-for="onePiece in formTemplate.model">
					<el-form-item :label="onePiece.title">
					    <el-select v-model="queryFormInfo[onePiece.name]" v-if="onePiece.type == 'select'">	
					    	<el-option  v-for="item in onePiece.data" :label="item.label" :value="item.value" ></el-option>
					    </el-select>
					    <el-input v-model="queryFormInfo[onePiece.name]" v-else></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7" :offset="1">
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
