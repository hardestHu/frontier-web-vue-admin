import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import loginStore from './modules/loginStore'
export default  new Vuex.Store({
	modules:{
		loginStore:loginStore,
	}
})