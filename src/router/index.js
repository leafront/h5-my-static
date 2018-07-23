import Vue from 'vue'

import Router from 'vue-router'


const PageError = r => require.ensure([], () => r(require('@/views/my/error/404.vue')),'PageError')

const MySetting = r => require.ensure([], () => r(require('@/views/my/setting.vue')),'MySetting')

const MyPersonal = r => require.ensure([], () => r(require('@/views/my/personal.vue')),'MyPersonal')

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '*',
      name: 'PageError',
      component: PageError,
      meta: {
        title: '找不到页面'
      }
    }, {
      path: '/my/setting',
      name: 'MySetting',
      component: MySetting,
      meta: {
        title: '个人设置'
      }
    }, {
      path: '/my/personal',
      name: 'MyPersonal',
      component: MyPersonal,
      meta: {
        title: '个人资料'
      }
    }
  ]
})
