<template>
	<div>
		<el-dialog title="图片查看" :visible.sync='visible' width="50%" @close="closeDialog">
			 <el-carousel  arrow="always" :autoplay="false">
			    <el-carousel-item v-for="item in imageSource" :key="item">
			      <img :src="item" alt="" width="100%" height="100%">
			    </el-carousel-item>
			  </el-carousel>
		</el-dialog>
	</div>
</template>
<script>
	export default{
		data:function(){
			return {
				visible:false
			}
		},
		props:['imageSource','show'],
		methods:{
			closeDialog:function(){
				debugger;
				this.$emit('closeDialog');
			}
		},
		watch:{
			show:function(newValue){
				debugger;
				this.visible = newValue;
			}
		}
	}
</script>