import Vue from 'vue'

import Router from 'vue-router'


const PageError = r => require.ensure([], () => r(require('@/views/my/error/404.vue')),'PageError')

const MySetting = r => require.ensure([], () => r(require('@/views/my/setting.vue')),'MySetting')

const MyPersonal = r => require.ensure([], () => r(require('@/views/my/personal.vue')),'MyPersonal')

const MyAboutUs = r => require.ensure([], () => r(require('@/views/my/aboutus.vue')),'MyAboutUs')

const MyProtocol = r => require.ensure([], () => r(require('@/views/my/protocol.vue')),'MyProtocol')

const MySecurity = r => require.ensure([], () => r(require('@/views/my/security.vue')),'MySecurity')

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
    }, {
      path: '/my/aboutus',
      name: 'MyAboutUs',
      component: MyAboutUs,
      meta: {
        title: '关于我们'
      }
    }, {
      path: '/my/protocol',
      name: 'MyProtocol',
      component: MyProtocol,
      meta: {
        title: '软件使用许可协议'
      }
    }, {
      path: '/my/security',
      name: 'MySecurity',
      component: MySecurity,
      meta: {
        title: '特别说明'
      }
    }
  ]
})
