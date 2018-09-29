<template>
	<div class="container">	
		<el-container>
			<el-header class="header">
				<head-top></head-top>
			</el-header>
			<el-container>
				<el-aside style="width:auto">
					<sider-bar></sider-bar>
				</el-aside>
				<el-container>
					<el-main style="padding:10px 5px">
						<router-view></router-view>	
					</el-main>
					
				</el-container>
			</el-container>
			<el-footer>
						<foot-bottom></foot-bottom>
			</el-footer>
			
		</el-container>
	</div>
</template>
<script>
	
	import HeadTop from './common/HeadTop'
	import SiderBar from './common/SiderBar'
	import FootBottom from './common/FootBottom.vue'
	export default {
		name:'detail',
		components:{
			HeadTop,
			SiderBar,
			FootBottom
		}
	}

</script>
<style scoped>
.container{
	width:100%;
	height:auto;
	background:#ecf0f5;
}
.header{
	background:#073f89;
}
@media only screen and (max-width: 768px){
		.header{
			height:100px;
		}
	}
</style>