import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/common.css' //样式

import axios from 'axios'
import qs from 'qs'

import common from './common' // 引入插件
import api from './api-config'

Vue.config.productionTip = false

var is_test = process.env.NODE_ENV === 'development' ? true : false;


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.timeout = 60000; //请求超时时间

// 发送数据前
axios.interceptors.request.use((config) => {
  if (is_test) {
    config.url = '/api' + config.url
  }
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  // console.log(response);
  // 对响应数据做点什么
  if (response.data.errno == 401) {
    localStorage.setItem('loginState', false);
    router.push('/login');
    console.log(this);
  } else {
    return response.data;
  }

}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

Vue.prototype.$http = axios;

var webUrl = '';
Vue.use(common, {
  api: api,
  url: webUrl
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')