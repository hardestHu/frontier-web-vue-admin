<template>
	<div class="head_top">
		<el-row>
			<el-col :lg="5" :md="6" :sm="8" :xs="12">
				<img src="../../assets/image/logo.png" alt="" class="little_icon">
				<span class="logo_title">
                    边检"V通关"微信服务平台
                </span>
			</el-col>
			<el-col :lg="19" :md="18" :sm="16" :xs="12" class="head_right">
				<!-- <span class="fl side-menu"><a href="javascript:void(0)" class=""><i class="el-icon-d-arrow-left"></i></a></span> -->
				<!-- <span class="fr user">
					<img src="../../assets/image/logo-mini.png" height="25" width="25" alt="">
					<span>{{userName}}</span>
				</span> -->
				<el-dropdown @command="changePwdOrLoginOut" class="fr">
				  <span class="user">
				    <img src="../../assets/image/logo-mini.png" height="25" width="25" alt="">
					<span>{{userName}}</span>
				  </span>
				  <el-dropdown-menu slot="dropdown" >
				    <el-dropdown-item command="changePWD">修改密码</el-dropdown-item>
				    <el-dropdown-item command="logout">退出</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			<!-- 	<span class="fr info"><a href="javascript:void(0)"><i class="el-icon-info"></i></a></span> -->
			</el-col>
		</el-row>
	</div>

</template>
<script>
	import {getUser, logout} from '@/api'
	import Router from '@/router'
	export default{
		data:function(){
			return {
				userName:'',
			}
		},
		mounted:function(){
			debugger;
			let $this = this;
			getUser(function(resp){
				debugger;
				if(resp.returnValue){

					$this.userName = resp.returnValue.nickName?resp.returnValue.nickName:resp.returnValue.userName;
				}else{
					Router.push('/')
				}
				
			})

		},
		methods:{
			changePwdOrLoginOut:function(command){
				debugger
				console.log(command);
				if(command == 'changePWD'){
					
				}else if(command == 'logout'){
					logout(function(resp){
						debugger
						console.log(resp);
						//TODO 接口404
						Router.push('/');
					})
				}
			}
		}
	}
</script>
<style scoped>
	.head_top{
		height:50px;
		width:100%;
		
	}
	.little_icon{
		width:65px;
		height:45px;
	}
	.logo_title{
	    font-size: 12px;
	    color: #fff;
	    height: 50px;
	    line-height: 50px;
	}
	.side-menu,.user,.info{
		height: 50px;
    	line-height: 50px;
	}
	.side-menu a{
		color: #fff;
	    padding: 12px 10px 22px 10px;
	    font-size: 20px;
	}

	.side-menu a:hover{
		color:#ccc;
	}
	{
		height: 50px;
		line-height: 50px;
	}
	.user span{
		color:#fff;
		margin-left:5px;
		font-size:12px;
	}
	.user img{
		padding-bottom: 15px;
	}
	.info a{
		padding: 12px 10px 22px 10px;
		font-size: 20px;
	}
	@media only screen and (max-width: 768px){
		.head_right{
			background:#073f89;
		}
	}
</style>