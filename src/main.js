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

Vue.use(Toast)
Vue.use(Loading)
Vue.use(PageLoading)

Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

router.beforeEach((to, from, next) => {

  document.title = to.meta.title
  if(
    to.matched.some(record => record.meta.requireLogin) &&
    process.env.NODE_ENV != 'develop'
  ) {

    //判断用户已经登录
    if (app.loggedIn()) {
      next()
    } else {
      if (utils.isApp()) {
        app.login()
      } else {
        const from = to.fullPath
        location.href = `/login.html?from=` + encodeURIComponent(from)
      }
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { Application },
  template: '<Application/>'
})
