import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueApexCharts from 'vue-apexcharts'

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false


Vue.filter('splitNumber', function(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')