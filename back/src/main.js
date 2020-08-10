import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './plugins/element.js'

import '@/assets/css/global.css'
import '@/assets/css/reset.css'
import '@/assets/font-awesome-4.7.0/css/font-awesome.min.css'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'

import moment from 'moment'

Vue.prototype.$moment = moment

axios.defaults.baseURL = 'xxx'

axios.interceptors.request.use(config => {
  NProgress.start()
  let tokenStr = 'Bearer '+window.sessionStorage.getItem('token')
  config.headers.Authorization = tokenStr
  return config
})

axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$http = axios

Vue.use(VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
