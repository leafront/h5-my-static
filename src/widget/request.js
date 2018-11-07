import ajax from '@/widget/ajax'
import store from '@/widget/store'
import utils from '@/widget/utils'
import config from '@/config/index'

const clearStorage = () => {
  const currentTime = new Date().getTime()
  if (utils.isLocalStorageSupported()) {

    for (let i = 0; i < localStorage.length; i++) {

      const key = localStorage.key(i);
      const cacheData = store.get(key,'local')
      if (cacheData && cacheData.times) {
        if (currentTime > cacheData.times) {
          store.remove(key,'local')
        }
      }
    }
  } else {
    if (window.name) {
      const storage = utils.deserialize(window.name)
      for (let attr in storage) {
        const cacheData = store.get(attr,'local')
        if (cacheData && cacheData.times) {
          if (currentTime > cacheData.times) {
            store.remove(attr,'local')
          }
        }
      }
    }
  }
}

export default function request (url,{
  type,
  timeout,
  dataType = 'json',
  data,
  cache = false,
  expires = 5 * 60 * 1000,
  headers,
  hostPath,
  ignoreLogin = false
}){

  const ut = utils.getUserToken()
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
  clearStorage()
  if (dataType !== 'text') {
    options.data = Object.assign({
      ut,
      platform: config.platform,
      companyId: config.companyId,
      platformId: config.platformId
    },data)
  }

  let optionData = Object.assign({
    platform: config.platform,
    companyId: config.companyId,
    platformId: config.platformId
  },data)

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
    cacheUrl =  optionData ?  url + '?' + optionData: url
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
          reject(results)
          if (utils.isApp()) {
            utils.login()
          } else {
            const from = utils.getRelatedUrl()
            location.href = `/login.html?from=` + encodeURIComponent(from)
          }
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
