import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible/index.min.js'
import './styles/index.less'
import axios from 'axios'
import VeeValidate, { Validator } from 'vee-validate'

import zhCN from 'vee-validate/dist/locale/zh_CN'

Vue.use(Vant)
Vue.use(VeeValidate)
Validator.localize('zh_CN', zhCN)

// 自定义验证规则
// 自定义规则
Validator.extend('phone', {
  // 提示信息
  getMessage: field => '请输入正确的手机号码',
  // 自定义规则的具体代码
  validate: value =>
    value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
})

// 睡眠
// 看到异步->
// 1 cd ->回调地狱 -> 层层嵌套
// 2.Promise ->缺点
//  2.1: 一个promise 对应一个异步
//  2.2 .them().cath()
// 3.async await
Vue.prototype.$sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
