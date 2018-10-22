export default {
	state:{
		'loaded':false,	
		queryFormInfo:{
			status:"0",
			companyName:"",
			portId:"",
			identityCard:""
		},
		pageObj:{
			currentPageNum:'1'
		}
		
	},
	mutations:{
		storeRecordPersonQueryFormInfo(state,queryInfo){
			debugger;
			state.loaded = true;
			state.queryFormInfo = queryInfo;
		},
		storeRecordPersonPageObj(state,currentPageNum){
			debugger;
			state.pageObj.currentPageNum = currentPageNum;
		}
		
		
	}
}