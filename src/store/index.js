import Vue from 'vue'
import Vuex from 'vuex'
import {getCompanys,getPorts} from '@/api'
Vue.use(Vuex)
import loginStore from './modules/loginStore'
export default  new Vuex.Store({
	state:{
		roleLevel:'',
		portId:'',
		companyList:[],
		portList:[]
	},
	mutations:{
		storeRoleLevel:function(state,data){
			state.roleLevel = data;
		},
		storePortId:function(state,data){
			state.roleLevel = data;
		},
		storeCompany:function(state,data){
			state.companyList = data;
		},
		storePort:function(state,data){
			state.portList = data;
		},

	},
	actions:{
		getCompanyList:function(context){
			getCompanys(function(resp){
					debugger;
					let nameList = resp.returnValue;
					nameList.forEach(function(item,index){
						item.label = item.companyName;
						item.value = item.companyName;
					})
					nameList.unshift({label:"查询全部", value:""});
					context.commit('storeCompany',nameList)
			})
		},
		getPortList:function(context){
			getPorts(function(resp){
					debugger;
					let portList = resp.returnValue;
					portList.forEach(function(item,index){
						item.label = item.portName;
						item.value = item.id;
					})
					portList.unshift({label:"查询全部", value:""});
					context.commit('storePort',portList)
				})
		}
	},
	modules:{
		loginStore:loginStore,
	}
})