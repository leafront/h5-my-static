import Vue from 'vue'

import Router from 'vue-router'

const PageError = r => require.ensure([], () => r(require('@/views/my/error/404.vue')),'PageError')

const MySetting = r => require.ensure([], () => r(require('@/views/my/setting.vue')),'MySetting')

const MyPersonal = r => require.ensure([], () => r(require('@/views/my/personal.vue')),'MyPersonal')

const MyAboutUs = r => require.ensure([], () => r(require('@/views/my/aboutus.vue')),'MyAboutUs')

const MyProtocol = r => require.ensure([], () => r(require('@/views/my/protocol.vue')),'MyProtocol')

const MySecurity = r => require.ensure([], () => r(require('@/views/my/security.vue')),'MySecurity')

const MyMessage = r => require.ensure([], () => r(require('@/views/my/message.vue')),'MySecurity')

const MyGroupList = r => require.ensure([], () => r(require('@/views/my/group/list.vue')),'MyGroupList')

const MyBuyList = r => require.ensure([], () => r(require('@/views/my/buy/list.vue')),'MyBuyList')

const MyAccountSecurity = r => require.ensure([], () => r(require('@/views/my/account/security.vue')),'MyAccountSecurity')

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
    }, {
      path: '/my/message',
      name: 'MyMessage',
      component: MyMessage,
      meta: {
        title: '消息设置',
        requireLogin: true
      }
    }, {
      path: '/my/group/list',
      name: 'MyGroupList',
      component: MyGroupList,
      meta: {
        title: '我的团',
        requireLogin: true
      }
    }, {
      path: '/my/buy/list',
      name: 'MyBuyList',
      component: MyBuyList,
      meta: {
        title: '常购清单',
        requireLogin: true
      }
    }, {
      path: '/my/account/security',
      name: 'MyAccountSecurity',
      component: MyAccountSecurity,
      meta: {
        title: '账户安全',
        requireLogin: true
      }
    }
  ]
})
