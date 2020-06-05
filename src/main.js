import Vue from 'vue'
import storage from 'good-storage'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import axios from './api/axios'
import { config } from '@/utils/global'
// import 'viewerjs/dist/viewer.css'
// import Viewer from 'v-viewer'
import iView from 'view-design'
import 'view-design/dist/styles/iview.css';
import { Menu, Submenu, MenuItem, MenuItemGroup, } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/common/css/share.less'
import '@/permission'
import '@/mixins'

Vue.config.productionTip = false
Vue.config.devtools = true;
/* eslint-disable no-new */

Vue.use(iView)
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);

Vue.prototype.$storage = storage
Vue.prototype.$axios = axios

let server_url = ''
if (process.env.VUE_APP_DEPLOY == "prod") {
  server_url = config.SC_server_prod_url
} else {
  server_url = config.SC_server_sit_url
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
