import Vue from 'vue'
import Router from 'vue-router'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.back()
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/bindPhone'
    },
    {
      path: '/bindPhone',
      name: 'bindPhone',
      component: () => import('../views/Login/bindPhone.vue'),
      meta: {
        title: '商户绑定'
      }
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('../views/Login/success.vue'),
      meta: {
        title: '绑定成功'
      }
    }
  ],
  scrollBehavior(to, from, saveTop){
    if (saveTop) {
      return saveTop
    } else {
      return { x: 0, y: 0 }
    }
  }
})
