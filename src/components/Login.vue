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
									//todo
									 menus = [{
	"menuId": "1",
	"menuName": "注册备案",
	"parentId": "0",
	"statusCode": "00",
	"url": "/**",
	"icon": "",
	"remark": "注册备案",
	"createTime": "2016-08-30 00:00:00",
	"menuType": 0,
	"target": "",
	"isHidden": null,
	"sort": 1
},
{
	"menuId": "10",
	"menuName": "个人备案注册",
	"parentId": "1",
	"statusCode": "00",
	"url": "/user/**",
	"icon": null,
	"remark": "个人备案注册",
	"createTime": "2016-08-23 16:47:55",
	"menuType": 0,
	"target": "record_person",
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "2",
	"menuName": "许可证办理",
	"parentId": "0",
	"statusCode": "00",
	"url": "/**",
	"icon": null,
	"remark": "许可证办理",
	"createTime": "2016-08-23 16:49:22",
	"menuType": 0,
	"target": null,
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "20",
	"menuName": "登轮许可证",
	"parentId": "2",
	"statusCode": "00",
	"url": "/boarding/**",
	"icon": null,
	"remark": "登轮许可证",
	"createTime": "2016-08-23 16:49:55",
	"menuType": 0,
	"target": "board_general",
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "21",
	"menuName": "搭靠外轮许可证",
	"parentId": "2",
	"statusCode": "00",
	"url": "/dock/**",
	"icon": null,
	"remark": "搭靠外轮许可证",
	"createTime": "2016-08-23 16:50:55",
	"menuType": 0,
	"target": "board_takeon",
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "3",
	"menuName": "抵港离港申请",
	"parentId": "0",
	"statusCode": "00",
	"url": "/**",
	"icon": null,
	"remark": "抵港离港申请",
	"createTime": "2016-08-23 16:53:12",
	"menuType": 0,
	"target": null,
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "30",
	"menuName": "抵港申请",
	"parentId": "3",
	"statusCode": "00",
	"url": "/arriveDepart/**",
	"icon": null,
	"remark": "抵港申请",
	"createTime": "2016-08-23 16:53:37",
	"menuType": 0,
	"target": "arrival",
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "31",
	"menuName": "离港申请",
	"parentId": "3",
	"statusCode": "00",
	"url": "/arriveDepart/**",
	"icon": null,
	"remark": "离港申请",
	"createTime": "2016-08-23 16:54:15",
	"menuType": 0,
	"target": "leave",
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "4",
	"menuName": "船舶移泊申请",
	"parentId": "0",
	"statusCode": "00",
	"url": "/**",
	"icon": null,
	"remark": "船舶移泊申请",
	"createTime": "2016-08-23 16:56:03",
	"menuType": 0,
	"target": "",
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "40",
	"menuName": "船舶移泊申请",
	"parentId": "4",
	"statusCode": "00",
	"url": "/shifting/**",
	"icon": null,
	"remark": "船舶移泊申请",
	"createTime": "2016-08-23 16:56:40",
	"menuType": 0,
	"target": "shift",
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "41",
	"menuName": "取消靠泊计划",
	"parentId": "4",
	"statusCode": "00",
	"url": "/berthing/**",
	"icon": null,
	"remark": "取消靠泊计划",
	"createTime": "2016-08-23 17:03:27",
	"menuType": 0,
	"target": "berthing_cancel",
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "5",
	"menuName": "举报投诉",
	"parentId": "0",
	"statusCode": "00",
	"url": "/complaint/**",
	"icon": "",
	"remark": "举报投诉",
	"createTime": "2016-08-23 16:57:39",
	"menuType": 0,
	"target": "complaint_main",
	"isHidden": "",
	"sort": 0
},
{
	"menuId": "50",
	"menuName": "举报投诉",
	"parentId": "5",
	"statusCode": "00",
	"url": "/complaint/**",
	"icon": null,
	"remark": "举报投诉",
	"createTime": "2016-08-23 16:57:39",
	"menuType": 0,
	"target": "complaint_main",
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "6",
	"menuName": "日志管理",
	"parentId": "0",
	"statusCode": "00",
	"url": "/**",
	"icon": null,
	"remark": "日志管理",
	"createTime": "2016-08-23 16:57:58",
	"menuType": 0,
	"target": null,
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "60",
	"menuName": "日志管理",
	"parentId": "6",
	"statusCode": "00",
	"url": "/logging/**",
	"icon": null,
	"remark": "日志管理",
	"createTime": "2016-08-23 16:58:43",
	"menuType": 0,
	"target": "log_find",
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "7",
	"menuName": "系统管理",
	"parentId": "0",
	"statusCode": "00",
	"url": "/**",
	"icon": null,
	"remark": "系统管理",
	"createTime": "2016-08-23 16:59:37",
	"menuType": 0,
	"target": null,
	"isHidden": null,
	"sort": 99
},
{
	"menuId": "71",
	"menuName": "用户管理",
	"parentId": "7",
	"statusCode": "00",
	"url": "/authority/**",
	"icon": null,
	"remark": "用户管理",
	"createTime": "2016-08-23 17:00:56",
	"menuType": 0,
	"target": "user",
	"isHidden": null,
	"sort": 99
},
{
	"menuId": "72",
	"menuName": "常用回复",
	"parentId": "7",
	"statusCode": "00",
	"url": "/quickReply/**",
	"icon": null,
	"remark": "常用回复",
	"createTime": "2016-08-23 17:01:22",
	"menuType": 0,
	"target": "add_reply",
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "73",
	"menuName": "港口管理",
	"parentId": "7",
	"statusCode": "00",
	"url": "/port/**",
	"icon": null,
	"remark": "港口管理",
	"createTime": "2016-09-13 18:09:05",
	"menuType": 0,
	"target": "port_main",
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "8",
	"menuName": "出入境查询申请",
	"parentId": "0",
	"statusCode": "00",
	"url": "/**",
	"icon": null,
	"remark": "出入境查询申请",
	"createTime": "2018-08-28 15:28:37",
	"menuType": 0,
	"target": null,
	"isHidden": null,
	"sort": 0
},
{
	"menuId": "80",
	"menuName": "出入境查询申请",
	"parentId": "8",
	"statusCode": "00",
	"url": "/entryexit",
	"icon": null,
	"remark": "出入境查询申请",
	"createTime": "2018-08-28 15:30:35",
	"menuType": 0,
	"target": "entryexit_query",
	"isHidden": null,
	"sort": 0
}];
                            	
		                            localStorage.setItem("Menu", JSON.stringify(menus));
		                            localStorage.setItem("isLogin",'yes');
		                            $this.$store.commit('changeLoginState');

		                            // $this.$store.commit('storageMenuList',resp.returnValue);
		                            // todo 调试用
		                            $this.$store.commit('storageMenuList',menus);
		                            
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