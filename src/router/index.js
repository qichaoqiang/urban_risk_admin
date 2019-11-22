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
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/lawyer/index.vue'),
      meta: {
        title: '高端律服'
      }
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/lawyer/order.vue'),
      meta: {
        title: '开通高端家庭律师服务'
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component: () => import('../views/lawyer/pay.vue'),
      meta: {
        title: '服务开通中'
      }
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../views/lawyer/result.vue'),
      meta: {
        title: '服务开通失败'
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
