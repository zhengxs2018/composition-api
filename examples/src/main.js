import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import CompositionAPI from '@zhengxs/composition-api'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(CompositionAPI)

new Vue({
  render: h => h(App),
}).$mount('#app')

if (process.env.NODE_ENV === 'development') {
  const imp = require.context('./mocks', true, /\.mock.js/)
  imp.keys().forEach(imp)
}
