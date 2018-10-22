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
						<div class="tags">
							<el-tag size="medium" v-for="(item,index) in tagList " :closable='true' :key="index"  @close="closeTag(index)" @click.native="skipToCurrentTag(item.routerLink)" :color="item.bgColor">{{item.name}}</el-tag>
						</div>
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
	import FootBottom from './common/FootBottom'
	
	export default {
		name:'detail',
		data:function(){
			return {
				
			}
		},
		components:{
			HeadTop,
			SiderBar,
			FootBottom,
		},

		mounted:function(){
			
		},
		computed:{
			tagList:function(){
				let $this = this;
				debugger;
				let nameList = {
					"home":"主页",
					"record_person":"备案注册申请",
					"board_general":"上下外国船舶许可",
					"board_takeon":"船舶搭靠外轮许可",
					"arrival":"抵港申请",
					"leave":"离港申请",
					"shift":"移泊申请",
					"berthing_cancel":"取消靠泊申请",
					"complaint_main":"用户投诉",
					"log_find":"日志管理",
					"user":"用户管理",
					"add_reply":"常用回复",
					"port_main":"港口管理",
					"entryexit_query":"出入境查询申请"
				};
				let tagList = [];
				this.$store.state.browseMenuList.forEach(function(item,index){
					tagList.push({name:nameList[item],routerLink:item,bgColor:"#fff"});
					if(item == $this.$store.state.currentView){
						tagList[index].bgColor = 'rgba(64,158,255,.1)'
					}
				})
				return tagList;

			}
		},
		methods:{
			closeTag:function(tagIndex){
				debugger;
				//关闭tag
				this.$store.commit('deleteBrowseMenu',tagIndex);
			},
			skipToCurrentTag:function(routerLink){
				debugger;
				if(routerLink == this.$store.state.currentView){
					return;
				}
				//跳转tag
				this.$store.commit('storeCurrentView',routerLink);
				this.$router.push(routerLink);
			}
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
.tags{
	position: relative;
    height: 30px;
    line-height: 34px;
    padding: 5px 5px;
    overflow: hidden;
    background: #fff;
    -webkit-box-shadow: 0 5px 10px #ddd;
    box-shadow: 0 5px 10px #ddd;
    margin-bottom: 10px;
}	

.tags .el-tag:hover{
	cursor:pointer;
}
.tags .el-tag:not(first-child){
	margin-left:10px;
}
</style>