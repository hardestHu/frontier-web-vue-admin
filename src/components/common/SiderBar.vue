<template>
	<div style="width:230px">
		<el-menu background-color="#222d32" text-color="#b8c7ce" active-text-color="#fff" default-active='home' :unique-opened="true" :router="true" :collapse="isCollapse">
			 <el-menu-item  index="home">
			 	<i class="el-icon-location"></i>
			 	<span slot="title" class="menuText">首页</span>
			 </el-menu-item>	
				
			 <el-submenu v-for = 'firstMenu in firstMenuList' :index="firstMenu.menuId">
				<template slot="title">
				 	<i class="el-icon-setting"></i>
				 	<span slot="title" class="menuText">{{firstMenu.menuName}}</span>
				</template>
				<el-menu-item v-for="secondMenu in secondMenuList" :index='secondMenu.target' v-if='secondMenu.parentId == firstMenu.menuId'>
 					<i class="el-icon-document"></i>
 					<span slot="title" class="menuText">{{secondMenu.menuName}}</span>
				</el-menu-item>
			 </el-submenu>
	 
			
		</el-menu>
	</div>
</template>
<script>
	import Router from '@/router'
	import {mapState} from 'vuex'
	export default {
		data:function(){
			return {
				//TODO menu折叠
				isCollapse:false
			}
		},

		mounted:function(){
			
		},
		
		computed:{
			/**
			 * 
			 * @return {[array]} [筛选出一级菜单]
			 */
			firstMenuList:function(){
				debugger;
				console.log('firtMenuList',this.$store.state.loginStore.menuList);
			    return this.$store.state.loginStore.menuList.filter(function(item){
					return item.parentId == '0';
				})
			},
			/**
			 * 
			 * @return {[array]} [筛选出二级菜单]
			 */
			secondMenuList:function(){
				debugger;
				console.log('secondMenuList',this.$store.state.loginStore.menuList);
				return	this.$store.state.loginStore.menuList.filter(function(item){
					return item.parentId != '0';
				})
			}
		},
		methods:{

		}
	}
</script>
<style>
	.menuText{
		font-size:12px;
	}

</style>