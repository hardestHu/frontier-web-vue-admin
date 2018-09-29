export default {
	state:{
		isLogin:false,
		menuList:[]
	},
	mutations:{
		changeLoginState(state){
			debugger;
			state.isLogin = !state.isLogin;
		},
		storageMenuList:function(state,data){
			debugger;
			console.log('storageMenuList',data);
			state.menuList = data;
		}
	}
}