import ajax from '@/widget/ajax'
import store from '@/widget/store'
import utils from '@/widget/utils'
import config from '@/config/index'

function clearStorage () {
  const currentTime = new Date().getTime()
  let cacheStorage = localStorage
  if (!utils.isLocalStorageSupported()) { 
    cacheStorage = window.name
  }
  if (cacheStorage) {
    Object.keys(cacheStorage).forEach((item) => {
      const cacheData = store.get(item,'local')
      if (cacheData && 
        cacheData.times
      ) {
        if (currentTime > cacheData.times) {
          store.remove(item,'local')
        }
      }
    })
  }
}

export default function request (url,{
  type,
  timeout,
  dataType = 'json',
  data = {} ,
  cache = false,
  expires = 5 * 60 * 1000,
  headers,
  hostPath,
  ignoreLogin = false
}){

  const ut = utils.getUserToken()
  const errorCode = 99
  const options = {
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
      times: new Date().getTime(),
      platform: config.platform,
      companyId: config.companyId,
      platformId: config.platformId
    },data)
  }
  if (type == 'GET') {
    options.data.times = new Date().getTime()
  }
  let optionData = data

  if (utils.loggedIn()) {
    options.headers.ut = ut
  }
  if (headers &&
    headers['Content-Type'] == 'application/json'
  ) {
    options.headers["Content-Type"] = headers["Content-Type"]
    options.data = JSON.stringify(options.data)
  } else {
    options.data = utils.queryStringify(options.data)
    optionData = utils.queryStringify(optionData)
  }

  let cacheUrl = url
  if (type == 'GET' && dataType == 'json') {
    options.url =  options.data ?  url + '?' + options.data: url
    cacheUrl =  optionData ?  url + '?' + optionData : url
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
        utils.deleteUserToken()
        if (!ignoreLogin) {
          if (utils.isApp()) {
            utils.login()
          } else {
            const from = utils.getRelatedUrl()
            location.href = `/login.html?from=` + encodeURIComponent(from)
          }
          reject(results)
          return
        } else {
          resolve(results)
        }
      } else {
        if (results.code == 0 && cache) {
          store.set(cacheUrl, cacheData,'local')
        }
      }
      resolve(results)
    })
  }

  return new Promise((resolve, reject) => {
    const currentTime = new Date().getTime()
    const cacheData = store.get(cacheUrl,'local')
    clearStorage()
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
