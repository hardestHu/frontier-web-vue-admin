import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Detail from '@/components/Detail'
import Home from '@/components/detail/Home'
import RecordPerson from '@/components/detail/RecordPerson'
import BoardGeneral from '@/components/detail/BoardGeneral'
import BoardTakeon from '@/components/detail/BoardTakeon'
import Arrival from '@/components/detail/Arrival'
import Leave from '@/components/detail/Leave'
import EntryexitQuery from '@/components/detail/EntryexitQuery'
import Shift from '@/components/detail/Shift'
import BerthingCancel from '@/components/detail/BerthingCancel'
import ComplaintMain from '@/components/detail/ComplaintMain'
import LogFind from '@/components/detail/LogFind'
import User from '@/components/detail/User'
import AddReply from '@/components/detail/AddReply'
import PortMain from '@/components/detail/PortMain'

Vue.use(Router)
const router = [
	{path:'/',name:'loginLink',component:Login},
	{path:'/detail',name:'detailLink', redirect:'/detail/home',component:Detail, 
	children:[
		 	// {path:'home',name:'homeLink',component:Home}, 
		 	{path:'home',name:'homeLink',component:Home}, 
		 	{path:'record_person',name:"recordPersonLink",component:RecordPerson},
		 	{path:'board_general',name:"BoardGeneralLink",component:BoardGeneral},
		 	{path:'board_takeon',name:"BoardTakeonLink",component:BoardTakeon},
		 	
		 	{path:'arrival',name:"ArrivalLink",component:Arrival},
		 	{path:'leave',name:"LeaveLink",component:Leave},
		 	{path:'entryexit_query',name:"EntryexitQueryLink",component:EntryexitQuery},
		 	{path:'shift',name:"ShiftLink",component:Shift},
		 	{path:'berthing_cancel',name:"BerthingCancelLink",component:BerthingCancel},
		 	{path:'complaint_main',name:"ComplaintMainLink",component:ComplaintMain},
		 	{path:'log_find',name:"LogFindLink",component:LogFind},
		 	{path:'user',name:"UserLink",component:User},
		 	{path:'add_reply',name:"AddReplyLink",component:AddReply},
		 	{path:'port_main',name:"PortMainLink",component:PortMain},
		 	
		]
	},
	{path:'*',redirect:'/'}	
]

export default new Router({
	mode:'history',
	routes:router
})
