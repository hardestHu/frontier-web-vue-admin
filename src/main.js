import Vue from 'vue'
import App from './App'
import router from './router'
import $ajax from './axios'
import store from './store'

import './styles/base.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI)

debugger;
Vue.prototype.$ajax = $ajax
 
new Vue({
  router,
  store,
  created () {
  	//解决页面刷新数据丢失的问题
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
    	debugger;
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
  components: { App },
  template: '<App/>'
}).$mount("#app")
