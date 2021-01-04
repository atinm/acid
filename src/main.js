import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(Buefy)
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
