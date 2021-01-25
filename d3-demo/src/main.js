import Vue from 'vue'
import App from './App.vue'
import BMap from 'BMap'
import echarts from 'echarts' 
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false 
new Vue({
  render: h => h(App),
}).$mount('#app')
