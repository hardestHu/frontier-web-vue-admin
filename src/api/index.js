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

/**
*新增等轮证 
*/
export function insertBoarding(data,success){
        $ajax({
        	method:'post',
            url:'/boarding/insertBoardingLocal',
            data:data,
        }).then(success)
}

// board-takon 相关
 /**
 * 根据筛选字段，分页、排序等条件查询搭靠外轮许可证相关数据表
 * @param data  dock对象，筛选字段
 * @param pageObj  {page,rows,sort,order}
 * @param callback
 */
export function getDocksForPage(pageObj, data, success) {
    $ajax({
    	method: 'post',
        url: "/dock/getDocksForPage?" + qs.stringify(pageObj),
        data: data,
    }).then(success)
}

 /**
 * 根据ID修改搭靠外轮许可证信息【审核】
 * @param data
 * @param callback
 */
export function updateDockById(data, success) {
    $ajax({
        method: "post",
        url: "/dock/updateDockById",
        data: data,
    }).then(success)
}

/** 
 *新增搭靠证 
 */
 export function addTakeon(data, success){
        $ajax({
            method:'post',
            url:"/dock/insertDockLocal",
            data:data,
        }).then(success)    
}

//shift 移泊相关
/**
 *
 * @param  {[type]} pageObj [分页信信息]
 * @param  {[type]} data    [查询信息]
 * @param  {[type]} success [回调函数]
 */
export function getShiftingsForPage(pageObj,data,success){
	$ajax({
            method: "post",
            url: "/shifting/getShiftingsForPage?" + qs.stringify(pageObj),
            data: data,
         }).then(success)

}
export function updateShiftingById(data,success){
	$ajax({
		method:'post',
		url:"/shifting/updateShiftingById",
		data:data
	}).then(success)
}

export function getUsers(data,success){
	$ajax({
		method:'post',
		url:"/user/getUsers",
		data:data
	}).then(success)
}

export function getShiftingCount(openid,success){
    $ajax({
    	method:'get',
    	url: "/shifting/getShiftingCount?openid=" + openid,
    }).then(success)
}            
              
//berthing-cancel
export function getBerthingsForPage(pageObj, data, success) {
    $ajax({
        method: "post",
        url: "/berthing/getBerthingsForPage?" + qs.stringify(pageObj),
        data: data
    }).then(success)
}

 /**
 * 【受理】根据id审批取消移泊
 * @param data
 * @param success
 */
export function updateBerthingById(data, success) {
	$ajax({
		method:'post',
		url:"/berthing/updateBerthingById",
		data: data
	}).then(success)
}

//conplain-main
/**
 * 根据筛选字段，分页、排序等条件查询举报相关数据
 * @param pageObj  complaint对象，筛选字段
 * @param data  {page,rows,sort,order}
 * @param success
 */
export function getComplaintsForPage(pageObj, data, success) {
    $ajax({
        method: "post",
        url: "/complaint/getComplaintsForPage?" + qs.stringify(pageObj),
        data: data,
    }).then(success)
}
/**
 * 根据ID修改举报数据【投诉回复】
 * @param data
 * @param success
 */
export function updateComplaintById(data, success) {
    $ajax({
        method: "post",
        url: "/complaint/updateComplaintById",
        data: data,
    }).then(success)
}

//log-find 
/**
 * 
 * @param  {[type]} pageObj [description]
 * @param  {[type]} data    [description]
 * @param  {[type]} success [description]
 * @return {[type]}         [description]
 */
export function getLoggingsForPage (pageObj, data, success) {
	$ajax({
	    method: "post",
	    url: "/logging/getLoggingsForPage?" + qs.stringify(pageObj),
	    data: data,
	}).then(success)
}
   /*获取用户*/

export function getPartys(success) {
    $ajax({
        method: "post",
        url: "/party/getPartys",
        data: {},
    }).then(success)
}

//user
/*获取用户列表*/
export function getPartysForPage(pageObj, data, success) {
	$ajax({
		method: "post",
		url: "/party/getPartysForPage?" + qs.stringify(pageObj),
		data: data,	
	}).then(success)
}

/**
 * 批量删除用户【禁用】
 * @param data [id,id,id]
 * @param success
 */
export function deleteParty(data, success) {
	$ajax({
		method: "post",
		url: "/authority/deleteParty",
		data: data,
	}).then(success)
}

/*获取权限列表*/
export function getRoles(success) {
	$ajax({
	    method: "get",
	    url: "/authority/findAllRoles",
	}).then(success)
}

/**
 *获取上级领导名字
 */
export function getLeaderList(data,success){
	$ajax({
		method:"post",
		url:"/authority/getPartys",
		data:data,
	}).then(success)
}

/**
 * 新增用户
 * @param data
 * @param success
 */
export function addParty (data, success) {
	$ajax({
		method: "post",
		url:"/authority/addParty",
		data:data
	}).then(success)
}

/**
 * 根据用户id获取当前用户详细信息
 * @param userId
 * @param success
 */
export function getPartyById (userId, success) {
	$ajax({
		method: "get",
		url: "/authority/getPartyById?id="+userId,
	}).then(success)
}

/**
 * 根据ID修改用户信息【修改信息、密码】
 * @param data
 * @param callback
 */
export function updatePartyById(data, success) {
	$ajax({
		method: "post",
		url: "/authority/updatePartyById",
		data: data,
	}).then(success)
}

//重置密码
export function resetPassword(partyId, success) {
	$ajax({
		url: "/party/resetPassword?partyId=" + partyId,
		method: "post",
	}).then(success)
}

//add-reply
export function getQuickReplysForPage(pageObj,data,success){
	$ajax({
		method:'post',
		url:"/quickReply/getQuickReplysForPage?" + qs.stringify(pageObj),
		data:data
	}).then(success)
}
export function deleteQuickReplyById(id,success){
	$ajax({
		method:"get",
		url:"/quickReply/deleteQuickReplyById?id="+id
	}).then(success);
}
export function insertQuickReply(data,success){
	$ajax({
		method:'post',
		url:"/quickReply/insertQuickReply",
		data:data
	}).then(success)
}

//port-main
/**
 * 根据筛选字段，分页、排序等条件查询登轮证相关数据表
 * @param pageObj {page,rows,sort,order}
 * @param data  筛选字段
 * @param success
 */
export function getPortsForPage(pageObj, data, success){
	$ajax({
		method:'post',
		url:"/port/getPortsForPage?"+qs.stringify(pageObj),
		data:data
	}).then(success)

}
 /**
 * 根据ID修改港口信息
 * @param data
 * @param success
 */
export function updatePortById(data, success){
    $ajax({
        method: "post",
        url: "/port/updatePortById",
        data: data,
    }).then(success)
}