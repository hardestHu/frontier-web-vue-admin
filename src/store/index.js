import Vue from 'vue'
import Vuex from 'vuex'
import {getCompanys,getPorts} from '@/api'
Vue.use(Vuex)
import loginStore from './modules/loginStore'
import recordPerson from './modules/recordPerson'
export default  new Vuex.Store({
	state:{
		roleLevel:'',
		portId:'',
		browseMenuList:['home'],
		companyList:[],
		portList:[],
		currentView:"home",
	},
	mutations:{
		storeRoleLevel:function(state,data){
			state.roleLevel = data;
		},
		storePortId:function(state,data){
			state.roleLevel = data;
		},
		
		storeBrowseMenu:function(state,data){
			debugger;
			if(state.browseMenuList.indexOf(data) < 0){
				state.browseMenuList.push(data);
			}else{
				return;
			}
			
		},
		deleteBrowseMenu:function(state,index){
			debugger;
			state.browseMenuList.splice(index,1);
		},
		storeCompany:function(state,data){
			state.companyList = data;
		},
		storePort:function(state,data){
			state.portList = data;
		},
		storeCurrentView:function(state,data){
			state.currentView = data;
		}

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
		recordPerson:recordPerson,
	}
})