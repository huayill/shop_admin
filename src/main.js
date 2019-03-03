// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入路由
import router from './router/router.js'

// 处理axios的一些问题
import axios from 'axios'
// 引入element-tree-grid
import ElTreeGrid from 'element-tree-grid'
Vue.component(ElTreeGrid.name, ElTreeGrid)
// 处理第一个问题
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 处理第二个问题
Vue.prototype.$axios = axios
// 处理第三个问题(每次携带token需要我们手动去写)
// 方式1:axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
// 方式2:拦截器
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    config.headers.Authorization = localStorage.getItem('token')

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 安裝element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
