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
			url:"/logout",
		}).then(success);
}

/**
 * [getCompanys 获取公司名称列表]
 * 
 * @param  {[type]} success [description]
 * @return {[type]}         [description]
 */
export function getCompanys(success){
		debugger;
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
 	}).then(success)
 }

 export function getUsersForPage(pageObj,data,success){
 	$ajax({
 		method:"post",
 		url:'/user/getUsersForPage?'+qs.stringify(pageObj),
 		data:data,
 	}).then(success)
 }

export function getDictionarys(data,success){
	$ajax({
		method:'post',
		url:'/dictionary/getDictionarys',
		data:data,
	}).then(success)
}

export function getQuickReplay(data,success){
			$ajax({
				method: "post",
				url:"/quickReply/getQuickReplys",
				data:data
			}).then(success)
}

/*record_person 相关*/
/**
 * [updateUserById 审批注册申请接口]
 * @param  {[object]} data    []
 * @param  {[function]} success [接口成功调用后的处理函数]
 * @return {[object]}         [返回处理结果]
 */
export function updateUserById(data,success){
		$ajax({
			method:"post",
			url:"/user/updateUserById",
			data:data
		}).then(success)
}
/**
 * 
 * @param  {[string]} id      [申请记录partyid]
 * @param  {[function]} success [接口成功后调用的处理函数]
 */
export function deleteUserById(id,success){
		$ajax({
			method:"get",
			url:"/user/deleteUserById?id="+id,
		}).then(success)
}

export function updateUserAuthorityById(data,success){
		$ajax({
			method:'post',
			url:"/user/updateUserAuthorityById",
			data:data
		}).then(success)
}
/*border_general 相关*/
export function getBoardingsForPage(pageObj,data,success){
		$ajax({
			method:'post',
			url:"/boarding/getBoardingsForPage?"+qs.stringify(pageObj),
			data:data
		}).then(success)
}

export function updateBoardingById(data, success) {
        $ajax({
            method: "post",
            url: "/boarding/updateBoardingById",
            data:data
        }).then(success)
}