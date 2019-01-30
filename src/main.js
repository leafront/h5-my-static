import Vue from 'vue'
import Application from './App'
import app from '@/widget/app'
import router from './router'
import store from './store'
import utils from '@/widget/utils'
import filter from '@/filters'
import Toast from '@/components/toast'
import Loading from '@/components/loading'
import PageLoading from '@/components/pageLoading'
import { sendTracker } from '@/widget/tracker'

Vue.use(Toast)
Vue.use(Loading)
Vue.use(PageLoading)

Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

app.getWeixinAppId()

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requireLogin) &&
    process.env.NODE_ENV != 'develop'
  ) {

    if (utils.loggedIn()) {  //判断用户已经登录
      next()
    } else {
      if (utils.isApp()) {
        utils.login()
      } else {
        const from = to.fullPath
        location.href = `/login.html?from=` + encodeURIComponent(from)
      }
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
  const bgColor = to.meta.bgColor
  if (bgColor) {
    document.body.style.backgroundColor = bgColor
  } else {
    document.body.style.backgroundColor = '#f5f5f5'
  }
  const trackerConfig = to.meta.trackerConfig || {}
  trackerConfig.referrer = from.name ? location.origin + from.fullPath : ''
  const shareConfig = to.meta.shareConfig
  if (shareConfig) {
    app.setShareContent(shareConfig)
  }
  if (utils.isApp()) {
    app.postMessage('hiddenHead', {'isHidden':'0'})
  }
  setTimeout(() => {
    sendTracker(trackerConfig)
  },0)
})

new Vue({
  el: '#app',
  router,
  store,
  components: { Application },
  template: '<Application/>'
})
