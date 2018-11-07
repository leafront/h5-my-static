import Vue from 'vue'

import VueRouter from 'vue-router'

import config from '@/config/index'

Vue.use(VueRouter)

export default new VueRouter({
  mode:'history',
  scrollBehavior(to,from,savePosition){ 
    if (savePosition) {
      return savePosition
    } else{
      return {x:0,y:0}
    }
  },
  routes: [
    {
      path: '*',
      name: 'PageError',
      component: () => import('@/views/my/error/404.vue'),
      meta: {
        title: '找不到页面',
        bgColor: '#61b8ff'
      }
    }, {
      path: '/my/setting',
      name: 'MySetting',
      component: () => import('@/views/my/setting.vue'),
      meta: {
        title: '个人设置'
      }
    }, {
      path: '/my/personal',
      name: 'MyPersonal',
      component: () => import('@/views/my/personal.vue'),
      meta: {
        title: '个人资料',
        requireLogin: true
      }
    }, {
      path: '/my/aboutus',
      name: 'MyAboutUs',
      component: () => import('@/views/my/aboutus.vue'),
      meta: {
        title: '关于我们'
      }
    }, {
      path: '/my/protocol',
      name: 'MyProtocol',
      component: () => import('@/views/my/protocol.vue'),
      meta: {
        title: '软件使用许可协议'
      }
    }, {
      path: '/my/security',
      name: 'MySecurity',
      component: () => import('@/views/my/security.vue'),
      meta: {
        title: '特别说明'
      }
    }, {
      path: '/my/message',
      name: 'MyMessage',
      component: () => import('@/views/my/message.vue'),
      meta: {
        title: '消息设置',
        requireLogin: true
      }
    }, {
      path: '/my/group/list',
      name: 'MyGroupList',
      component: () => import('@/views/my/group/list.vue'),
      meta: {
        title: '我的团',
        requireLogin: true
      }
    }, {
      path: '/my/buy/list',
      name: 'MyBuyList',
      component: () => import('@/views/my/buy/list.vue'),
      meta: {
        title: '常购清单',
        requireLogin: true
      }
    }, {
      path: '/my/account/security',
      name: 'MyAccountSecurity',
      component: () => import('@/views/my/account/security.vue'),
      meta: {
        title: '账户安全',
        requireLogin: true
      }
    }, {
      path: '/my/wallet',
      name: 'MyWallet',
      component: () => import('@/views/my/wallet.vue'),
      meta: {
        title: '我的钱包',
        requireLogin: true
      }
    }, {
      path: '/my/vip/index',
      name: 'MyVipIndex',
      component: () => import('@/views/my/vip/index.vue'),
      meta: {
        title: '会员中心',
        requireLogin: true,
        bgColor: '#fff'
      }
    }, {
      path: '/my/vip/rule',
      name: 'MyVipRule',
      component: () => import('@/views/my/vip/rule.vue'),
      meta: {
        title: '会员升降级规则',
        requireLogin: true,
        bgColor: '#fff'
      }
    }, {
      path: '/my/vip/explain',
      name: 'MyVipExplain',
      component: () => import('@/views/my/vip/explain.vue'),
      meta: {
        title: '会员权益说明',
        requireLogin: true,
        bgColor: '#fff'
      }
    }, {
      path: '/my/index',
      name: 'MyIndex',
      component: () => import ('@/views/my/index.vue'),
      meta: {
        title: '我的'
      }
    }
  ]
})
