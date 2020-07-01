import Vue from 'vue'
import Router from 'vue-router'
import storage from 'good-storage'
import store from '@/store/index'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.back()
}

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login/login.vue'], resolve),
      meta: {
        hideInMenu: true,
        notCache: true,
        title: '登录'
      },
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../views/login/login.vue'),
    //   meta: {
    //     title: '登录'
    //   }
    // }
  ],
  scrollBehavior(to, from, saveTop){
    if (saveTop) {
      return saveTop
    } else {
      return { x: 0, y: 0 }
    }
  }
})
