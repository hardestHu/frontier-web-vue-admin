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
/*一些校验器*/
/**
 * 身份证号校验
 * @param  {[type]} code [description]
 * @return {[type]}      [description]
 */
export function  cardIdValid(code) {
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };
    var tip = "";
    var pass = true;

    if (!code || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/i.test(code)) {
        tip = "身份证号格式错误";
        pass = false;
    } else if (!city[code.substr(0, 2)]) {
        tip = "身份证地址编码错误";
        pass = false;
    } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
                tip = "身份证校验位错误";
                pass = false;
            }
        }
    }
    return {
        code: pass,
        msg: tip
    };
}

