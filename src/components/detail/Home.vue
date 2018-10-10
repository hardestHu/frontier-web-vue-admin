<template>
	<div>
		home
	</div>
</template>
<script>
	export default {
		mounted:function(){
			this.$store.dispatch('getCompanyList');
			this.$store.dispatch('getPortList');
		}
	}
</script>	