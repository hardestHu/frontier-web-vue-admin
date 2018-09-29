import $ajax from '@/axios'
import qs from 'qs'
/**
 * [login 登录接口]
 * @param  {[object]} data      [登录信息]
 * @param  {[function]} success [调用接口成功后的执行函数]
 * @return {[object]}           [返回登录成功的信息]
 */
export function login(data,success){
		$ajax({
			method:'post',
			url:"/login?username="+data.name + "&password=" +data.password,
			data:{}
		}).then(success)
}
/**
 * [addLog 添加登录日志]
 * @param {[object]} data    [接口入参]
 * @param {[function]} success [接口成功后的执行函数]
 */
export function	addLog(data,success){
		$ajax({
			method:"post",
			url: "/logging/addLog",
			data:data
		}).then(success)
}
/**
 * [getMenus 获取菜单列表数据]
 * @param  {[function]} success [调用接口成功后的执行函数]
 * @return {[object]}           [menu列表]
 */
export function	getMenus(success){
		$ajax({
			method:'get',
			url: "/authority/findAuthorityMenus",
		}).then(success)

}
/**
 * [getUser 获取登录用户信息]
 * @param  {[function]} success [调用接口成功后的执行函数]
 * @return {[object]}         	[用户信息]
 */
export function getUser(success){
		$ajax({
			method:"get",
			url:"/party/currentParty"
		}).then(success)
}
/**
 * [logOut 退出登录]
 * @param  {[function]} success [调用接口成功后的执行函数]
 * @return {[object]}         [接口成功标志]
 */
export function logout(success){
		$ajax({
			method:"get",
			url:"/user/logout",
		}).then(success);
}

/**
 * [getCompanys 获取公司名称列表]
 * 
 * @param  {[type]} success [description]
 * @return {[type]}         [description]
 */
export function getCompanys(success){
	    $ajax({
	    	method:'post',
	    	url:'/company/getCompanys',
	    	data:{},
	    	dataType: "json",
	    }).then(success)
}
 /**
  * [getPorts 获取港口名称列表]
  * @param  {[type]} success [description]
  * @return {[type]}         [description]
  */
 export function getPorts(success){
 	$ajax({
 		method:"post",
 		url:'/port/getPorts',
 		data:{},
 		dataType: "json",
 	}).then(success)
 }

 export function getUsersForPage(pageObj,data,success){
 	$ajax({
 		method:"post",
 		url:'/user/getUsersForPage?'+qs.stringify(pageObj),
 		data:data,
 		dataType: "json",
 	}).then(success)
 }