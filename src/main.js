import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {post,fetch,patch,put, del} from './assets/utils/http'


import Mint from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'mint-ui/lib/index.js'

Vue.use(Mint);
Vue.use(InfiniteScroll);

//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$del=del;


// window.apiUrl = 'http://192.168.1.104:8080';//url
// window.apiUrl = 'http://192.168.1.107:8080';//url
//测试地址
// window.apiUrl = 'http://47.104.102.48:8083';//url
//线上地址
// window.apiUrl = 'http://online.yueyongyueyou.com:8080';
// window.apiUrl = 'http://test.yueyongyueyou.com:8082'
window.apiUrl = 'http://test.yueyongyueyou.com:8083'
//47.104.102.48



// window.apiUrl = 'http://192.168.1.197:8080';//url

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
