import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Detail from '@/components/Detail'
import Home from '@/components/detail/Home'
import RecordPerson from '@/components/detail/RecordPerson'



Vue.use(Router)
const router = [
	{path:'/',name:'loginLink',component:Login},
	{path:'/detail',name:'detailLink', redirect:'/detail/home',component:Detail, 
	children:[
		 	// {path:'home',name:'homeLink',component:Home}, 
		 	{path:'home',name:'homeLink',component:Home}, 
		 	{path:'record_person',name:"recordPersonLink",component:RecordPerson}
		]
	},
	{path:'*',redirect:'/'}	
]

export default new Router({
	mode:'history',
	routes:router
})
