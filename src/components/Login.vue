<template>
	<div id="login">
			<div class="login_header">
				<img src="../assets/image/logo.png" alt="logo_img" class="logo">
				<span class="logo_txt">边检“V通关”微信服务平台</span>		
			</div>
			<div>
				<div>
					<el-row type="flex">
						<el-col :span="14"></el-col>
						<el-col :span="8" style="padding:20px">
							<el-form :model="loginForm" ref="loginForm">
								<el-form-item :rules="{ required: true, message: '请输入姓名', trigger: 'blur'}" prop="name">
									<el-input type="text" placeholder="姓名" prefix-icon="el-icon-search" v-model="loginForm.name"></el-input>
								</el-form-item>
								<el-form-item :rules="{required :true,message:'请输入密码',trigger:'blur'}" prop="password">
									<el-input type="password" placeholder="密码" prefix-icon="el-icon-search" v-model="loginForm.password"></el-input>
								</el-form-item>
								<el-form-item>
							    	<el-button type="primary" style="width:100%" @click="submit('loginForm')">登录</el-button>
							  	</el-form-item>
							</el-form>
						</el-col>
					</el-row>
				</div>
				 

			</div>		
	</div>				
	
</template>
<script>
	
	import Router from '@/router'
	import {Message} from 'element-ui'
	import {login,addLog,getMenus} from '@/api'
	export default {
		data:function(){
			return {
				loginForm:{
					name:'',
					password:''
				}
			}
		},

		computed:{
			isLogin:function(){
				return this.$store.isLogin;
			}
		},
		methods:{
			submit:function(formData){

				debugger;
				let $this = this;
				console.log(this.$refs[formData]);
				this.$refs[formData].validate((valid)=>{
					debugger;
					console.log(valid);
					if(valid){
						let data = {
							name : this.loginForm.name,
							password: this.loginForm.password
						}
						login(data,function(resp){
							console.log('login',resp);
							if(resp.continue){
								//TODO 下面两个接口是不是可以放在loginStore里面
								addLog({"operation": "登录系统",
                                	"module": "登录系统"},function(){})

								getMenus(function(resp){
									let menus = resp.returnValue;
                            		console.log('menu',menus);
		                            localStorage.setItem("Menu", JSON.stringify(menus));
		                            localStorage.setItem("isLogin",'yes');
		                            $this.$store.commit('changeLoginState');
		                            $this.$store.commit('storageMenuList',resp.returnValue);
		                            Router.push("detail");
								})
							}
						})	
					}else{
						return false;
					}
					
				})
				
			},//submit
			

		},//methods 
		watch:{
			isLogin:function(newValue,oldValue){
				debugger
				console.log(newValue);
				console.log(oldValue);
			}
		}
	}

</script>
<style scoped>
	body{
		background-color: #D7E9F6;
	}
	#login{
		width: 890px;
   	 	height: 474px;
   	 	margin:70px auto;
		box-shadow: 0px 2px 10px 0px rgba(27,45,58,0.50);
    	margin: 71px auto;
    	background: url(../assets/image/login-bg.png) no-repeat #fff;
	}
	.logo{
		width: 74px; 
	    height: 69px;
	    padding-top: 6px;
	    padding-left: 67px;
	    float: left;
	}
	.logo_txt{
		font-size: 28px;
	    color: #517EBA;
	    margin-left: 54px;
	    display: inline-block;
	    height: 101px;
	    line-height: 101px;
	    font-weight: 500;
	    font-family: "Microsoft YaHei";
	}
	.login_header{
		    overflow: hidden;
    		height: 101px;
	}
	.login_header:after{
		content: "";
	    background: url(../assets/image/up.png) no-repeat;
	    display: block;
	    height: 37px;
	    width: 100%;
	    position: relative;
	    top: -45px;
	}
</style>