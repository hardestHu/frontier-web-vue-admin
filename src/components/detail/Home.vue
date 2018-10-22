<template>
	<div class="home">
		<bread-title :currentTitle="title"></bread-title>
		<el-row>
			<el-col :span="5" :offset='index%4 == 0 ? 0 : 1' v-for="(onePiece,index) in statisticsData" style="margin-left: 3%;padding-bottom:2%" >
	  			 <el-card :body-style="{backgroundColor:onePiece.color}" >
	  			 	<template slot-scope='scope'>
	  			 		<div class="box" @click="routerSkip(onePiece.routerLink)"
	  			 		>
	  			 			<div class="inner">
	  			 					<span class="countNum">{{onePiece.countNum}}</span> 
	  			 					<span class="name">{{onePiece.name}}</span>
	  			 			</div> 
	  			 			<div class="icon" >
	  			 				<i class="fa" :class="onePiece.icon"></i>
	  			 			</div> 
	  			 			<a class="detail" >详细内容
	  			 				<i class="fa fa-arrow-circle-right"></i>
	  			 			</a>
	  			 		</div>
	  			 	</template>
			    </el-card>
	  		</el-col>

		</el-row>
	</div>
</template>
<script>
	import BreadTitle from '../common/BreadTitle'
	import {getStatistics} from '@/api'
	export default {
		data:function(){
			return {
				title:"待处理业务统计",
				statisticsData:[
					{routerLink:"record_person",icon:'fa-user-plus',color:'#dd4b39',key:10,name:"备案注册申请",countNum:0},
					{routerLink:"board_general",icon:'fa-file-text',color:'#00c0ef',key:20,name:"上下外国船舶许可",countNum:0},
					{routerLink:"board_takeon",icon:'fa-ship',color:'#00c0ef',key:21,name:"船舶搭靠外轮许可",countNum:0},
					{routerLink:"arrival",icon:'fa-level-down',color:'#00a65a',key:30,name:"抵港申请",countNum:0},
					{routerLink:"leave",icon:'fa-level-up',color:'#00a65a',key:31,name:"离港申请",countNum:0},
					{routerLink:"shift",icon:'fa-exchange',color:'#00a65a',key:40,name:"移泊申请",countNum:0},
					{routerLink:"berthing_cancel",icon:'fa-minus-square',color:'#00a65a',key:41,name:"取消靠泊申请",countNum:0},
					{routerLink:"complaint_main",icon:'fa-envelope-o',color:'#f39c12',key:50,name:"用户投诉",countNum:0},
					{routerLink:"entryexit_query",icon:'fa-inbox',color:'#dd4b39',key:80,name:"出入境查询申请",countNum:0},
				],
			}
		},
		components:{
			BreadTitle
		},
		mounted:function(){
			debugger;
			let $this = this;
			this.$store.dispatch('getCompanyList');
			this.$store.dispatch('getPortList');
			getStatistics(function(resp){
				let businessCount = resp.returnValue;
				$this.statisticsData.forEach(function(item,index){
					item.countNum = businessCount[item.key];
				})
				
			})
		},
		methods:{
			routerSkip:function(routerLink){
				debugger;
				this.$router.push(routerLink);
				
			}
		}
	}
</script>	
<style>
.home .el-card__body{
	padding:0px;
}

.box:hover{
	cursor:pointer;
}
.box:hover .icon{
	font-size:60px;
}
.inner{
	float: left;
	color: #fff;
	margin-left: 10px;
}
.inner .countNum{
	   font-size: 30px;
	   font-weight:600;		 		
}
.inner span{
	display:block;
}
.icon{
	float: right;
	font-size: 50px;
	padding-right: 10px;
	color: rgba(0, 0, 0, 0.15);
	width: 60px;
    height: 80px;
    line-height: 80px;
	-webkit-transition: all .3s linear;
    -o-transition: all .3s linear;
    transition: all .3s linear;
	
}
.detail{
	color: rgb(255, 255, 255);
	width: 100%;
	display: inline-block;
	height: 22px;
	background:rgba(0, 0, 0, 0.1);
	text-align: center;
	font-size: 12px;
	line-height: 22px;
}
</style>
