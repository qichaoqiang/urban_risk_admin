import Vue from 'vue'
import 'amfe-flexible'
import 'babel-polyfill'
import sa from 'sa-sdk-javascript'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import '@/common/css/reset.css'
import '@/common/css/animate.css'
import '@/common/css/share.css'
import 'swiper/css/swiper.css'
import { config } from '@/utils/global'
// import VConsole from 'vconsole'

Vue.config.productionTip = false
/* eslint-disable no-new */
// new VConsole()

let server_url = ''
if (process.env.VUE_APP_DEPLOY == "prod") {
  server_url = config.SC_server_prod_url
} else {
  server_url = config.SC_server_sit_url
}

sa.init({
	name: 'sa',
	// 正式地址：
	server_url: server_url,
	// 是否开启 debug 模式，true 开启，false 关闭，开启 debug 模式，每发送一条数据会在页面弹出一次
	// debug_mode: true,
	// 配置打通 App 与 H5 的参数
	use_app_track: true,
	is_track_single_page: true,
	heatmap: {
    // 是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
    clickmap: 'default',
    // 是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
    scroll_notice_map: 'default',
    loadTimeout: 2000,
    ollect_input: function(){ return true; }
	}
})

window.sa = sa;

// 从神策获取deviceId
sa.quick('isReady', function() {
  if (!localStorage.getItem('clientId')) {
    let clientId = sa.store.getDistinctId();
    localStorage.setItem('clientId', clientId);
  }
}); 

router.beforeEach((to, from, next) => {
	// sa.registerPage({})
  document.title = to.meta.title;
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
