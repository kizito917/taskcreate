import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import JQuery from 'jquery'
window.$ = JQuery
import {faBars, faTimes, faTrash, faCreditCard, faUpload, faEye, faUser} from '@fortawesome/free-solid-svg-icons'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add([faBars, faTimes, faTrash, faCreditCard, faUpload, faEye, faUser])

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
