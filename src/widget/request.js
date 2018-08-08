import ajax from './ajax'

import app from '@/widget/app'

import store from '@/widget/store'

import utils from './utils'

import config from '@/config/index'

export default function request (url,options){

  const ut = app.getUserToken()
  const data = Object.assign({ ut, platform: config.platform, companyId: config.companyId, platformId: config.platformId },options.data)
  const defaults = {
    isHeader:true,
    type: options.type,
    data,
    async: true,
    url: url,
    timeout: options.timeout || 6000,
    dataType: options.dataType || 'json',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
      "Accept": "application/json"
    }
  }

  if (defaults.type == 'GET') {

    defaults.data.cashe = new Date().getTime()
  }

  if (options.headers) {

    defaults.headers["Content-Type"] = options.headers["Content-Type"]
    defaults.data = JSON.stringify(options.data)

  } else {

    defaults.data = utils.queryStringify(defaults.data)
  }

  if (app.loggedIn()) {

    defaults.headers.ut = app.getUserToken()

  }
  if (defaults.type == "GET") {

    defaults.url =  defaults.data ?  defaults.url + '?' + defaults.data: defaults.url
  }

  const cache = options.cache || false

  const expires = options.expires || 30 * 60 * 1000

  function sendAjax (resolve) {

    ajax(defaults).then((results) => {
      let cacheData = {
        times: new Date().getTime() + expires,
        results
      }

      if (results.code == "99" && process.env.NODE_ENV != 'develop') {
        app.deleteUserToken()
        if (utils.isApp()) {
          app.login()
        } else {
          const from = utils.getRelatedUrl()
          window.location.href = `/login.html?from=` + encodeURIComponent(from);
        }
      } else {
        if (results.code == 0 && cache) {
          store.set(url, cacheData,'local')
        }
      }

      resolve(results)

    })
  }

  return new Promise((resolve, reject) => {

    let currentTime = new Date().getTime()

    if (cache && store.get(url,'local')) {

      const getCacheTime = store.get(url,'local').times

      if (currentTime < getCacheTime) {

        resolve(store.get(url,'local').results)

      } else {

        store.remove(url,'local')

        sendAjax(resolve)

      }

    } else {

      sendAjax (resolve)

    }
  })
}
