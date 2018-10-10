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
  expires = 5 * 60 * 1000,
  headers,
  hostPath
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
    },
    hostPath
  }
  if (dataType !== 'text') {
    options.data = Object.assign({
      ut,
      platform: config.platform,
      companyId: config.companyId,
      platformId: config.platformId
    },data)
  }

  let cacheData = Object.assign({
    platform: config.platform,
    companyId: config.companyId,
    platformId: config.platformId
  },data)

  if (app.loggedIn()) {
    options.headers.ut = ut
  }

  if (headers &&
    headers['Content-Type'] == 'application/json'
  ) {
    options.headers["Content-Type"] = headers["Content-Type"]
    options.data = JSON.stringify(options.data)
  } else {
    options.data = utils.queryStringify(options.data)
    cacheData = utils.queryStringify(cacheData)
  }

  let cacheUrl = url
  if (type == "GET") {
    options.url =  options.data ?  url + '?' + options.data: url
    cacheUrl =  cacheData ?  url + '?' + cacheData: url
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
          store.set(cacheUrl, cacheData,'local')
        }
      }
      resolve(results)

    })
  }

  return new Promise((resolve, reject) => {

    let currentTime = new Date().getTime()

    const cacheData = store.get(cacheUrl,'local')

    if (cache && cacheData) {

      const getCacheTime = cacheData.times
      if (currentTime < getCacheTime) {
        resolve(cacheData.results)
      } else {
        store.remove(cacheUrl,'local')

        httpRequest(resolve,reject)
      }
    } else {

      store.remove(cacheUrl,'local')
      httpRequest (resolve,reject)

    }
  })
}
