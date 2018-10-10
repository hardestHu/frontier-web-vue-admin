<template>
	<el-row style="padding-bottom: 10px;">
		<el-col :span="5">
				<span style="font-family: 'Source Sans Pro', sans-serif;font-size:24px;color:black">{{currentTitle}}</span>
		</el-col>
		<el-col :span="4" :offset="15" style="padding-top: 16px">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  	<el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
			    <el-breadcrumb-item>{{currentTitle}}</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
	</el-row>
			
</template>

<script>
	export default {
		props:['currentTitle'],
	}
</script>