import axios from 'axios'
import {Message} from 'element-ui'
let ajaxHistory = [];

axios.interceptors.response.use((resp) => {
    debugger;
    console.log(resp);
    let index = ajaxHistory.indexOf(resp.config.url);
    if(index > -1){
        ajaxHistory.splice(index,1);
    }
    if (resp && resp.data && resp.data.code == "0000") {
        debugger;
        resp.data.continue = true;
        return resp.data;

    } else if (resp.data.code == "0002") {
        debugger;
        alert(resp.message);
        Message.error(resp.data.message);
        resp.data.continue = false;
        return resp.data;
       
    } else if(resp.data.code){
        debugger;
    	Message.error(resp.data.message);
        resp.data.continue = false;
        return resp.data;
    }

}, (err) => {
    debugger;
    //TODO 待验证
    let index = ajaxHistory.indexOf(err.config.url);
    if(index > -1){
        ajaxHistory.splice(index,1);
    }
    Message.warning(err.response.data.message);
})

export default function(option){
    debugger;
	option.url ="/border" + option.url;
    if(option.method.toLowerCase() == "post") {
        if (ajaxHistory.indexOf(option.url) > -1) {
            return;
        } else {
            ajaxHistory.push(option.url);
        }
    }
    if(option.method.toLowerCase() == "post" && option.data != null) {
            if (typeof option.data == "object") {
                option.data = JSON.stringify(option.data);
            }
    }
    if (!option.headers || !option.headers.contentType) {
            option.contentType = "application/json;charset=utf-8";
    }
    return axios(option);
}

