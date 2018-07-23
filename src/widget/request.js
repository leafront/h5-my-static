import ajax from './ajax'

import app from '@/widget/app'

import utils from './utils'

import config from '@/config/index'

export default function request (url,options){

  const ut = app.getUserToken()
  const data = Object.assign({ ut, platformId: config.platformId },options.data)
  const defaults = {
    isHeader:true,
    type: options.type,
    data,
    async: true,
    url:url,
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

  return new Promise((resolve, reject) => {

    ajax(defaults).then((results) => {

      if (results.code == "99" && process.env.NODE_ENV != 'develop') {
        app.deleteUserToken()
        if (utils.isApp()) {
          app.login()
        } else {
          const from = utils.getRelatedUrl()
          window.location.href = `/login.html?from=` + encodeURIComponent(from);
        }
      }
      resolve(results)
    })

  })

}
