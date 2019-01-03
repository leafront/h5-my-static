import Vue from 'vue'
import Application from './Application'
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

const setHeader = () => {
  const hideHead = utils.query('hideHead')
  if (utils.isApp()) {
    app.postMessage('hiddenHead',{'isHidden':'0'})
  }
}

router.beforeEach((to, from, next) => {

  document.title = to.meta.title
  const bgColor = to.meta.bgColor
  const shareConfig = to.meta.shareConfig
  const trackerConfig = to.meta.trackerConfig || {}
  trackerConfig.referrer = from.name ? location.origin + from.fullPath : ''
  setHeader()
  if (bgColor) {
    document.body.style.backgroundColor = bgColor
  } else {
    document.body.style.backgroundColor = '#f8f8f8'
  }
  if (
    to.matched.some(record => record.meta.requireLogin) &&
    process.env.NODE_ENV != 'develop'
  ) {

    //判断用户已经登录
    if (utils.loggedIn()) {
      next()
      if (shareConfig) {
        app.setShareContent(shareConfig)
      }
      sendTracker(trackerConfig)
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
    if (shareConfig) {
      app.setShareContent(shareConfig)
    }
    sendTracker(trackerConfig)
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { Application },
  template: '<Application/>'
})
