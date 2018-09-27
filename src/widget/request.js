import ajax from './ajax'

import app from '@/widget/app'

import store from '@/widget/store'

import utils from './utils'

import config from '@/config/index'

export default function request (url,{
  type,
  timeout,
  dataType,
  data,
  cache = false,
  expires = 30 * 60 * 1000,
  headers
}){

  const ut = app.getUserToken()
  const errorCode = 99
  const options = {
    isHeader:true,
    type,
    data,
    async: true,
    url: url,
    timeout,
    dataType,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
      "Accept": "application/json"
    }
  }
  options.data = Object.assign({
    ut,
    platform: config.platform,
    companyId: config.companyId,
    platformId: config.platformId
  },data)

  if (app.loggedIn()) {
    options.headers.ut = ut
  }

  if (type == 'GET') {
    options.data.cashe = new Date().getTime()
  }

  if (headers &&
    headers['Content-Type'] == 'application/json'
  ) {
    options.headers["Content-Type"] = headers["Content-Type"]
    options.data = JSON.stringify(options.data)
  } else {
    options.data = utils.queryStringify(options.data)
  }
  if (type == "GET") {

    options.url =  options.data ?  url + '?' + options.data: url
  }

  function httpRequest (resolve,reject) {

    ajax(options).then((results) => {
      const cacheData = {
        times: new Date().getTime() + expires,
        results
      }

      if (results.code == errorCode &&
        process.env.NODE_ENV != 'develop'
      ) {
        app.deleteUserToken()
        if (utils.isApp()) {
          app.login()
        } else {
          const from = utils.getRelatedUrl()
          location.href = `/login.html?from=` + encodeURIComponent(from)
        }
        reject(results)
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

        httpRequest(resolve,reject)

      }

    } else {

      httpRequest (resolve,reject)

    }
  })
}
