
import config from '@/config/index'

import * as Model from '@/model/mall_setting'

import store from '@/widget/store'

import utils from '@/widget/utils'

const companyId = config.companyId

const oneHour = 1000 * 60 * 60

const MallSettings = {
  settingsKey: "mallSettings",
  expireDateKey: "settingExpireDate",
  appIdKey: "weixinAppId",
  appIdexpireDateKey: "appIdExpireDate",
  settings: {},
  init () {
    this._loadSettings()
    if (utils.weixin()) {
      this._getWeixinAppId()
    }
  },

  /**
   * 获取商城名称
   * @returns {String} mobileMallName
   */
  getMallName() {
    return  this._getSetting("mobileMallName")
  },

  /**
   * 获取商城的域名
   * @returns {String} mobileMallDomain
   */
  getMallDomain() {
    return  this._getSetting("mobileMallDomain")
  },

  /**
   *
   * 获取商城的logo
   * @returns {String} mobileMallLogo
   */
  getMallLogo() {
    return  this._getSetting("mobileMallLogo")
  },

  /**
   * 获取商城版权信息
   * @returns {String} mobileRight
   */
  getMallCopyright() {
    return  this._getSetting("mobileRight")
  },

  /**
   * 获得网站的appId
   * @returns {String} appId
   */
  getAppId() {
    return this._getSetting("appId")
  },

  /**
   * 设置配置参数
   * @param {String} settingName
   * @returns {Object} settings
   * @private
   */
  _getSetting(settingName) {
    return this.settings[settingName]
  },
  /**
   *
   * 加载设置
   * @private
   */
  _loadSettings() {
    var localSettings = store.get(this.settingsKey,'local')
    var expired = false

    if(store.get(this.expireDateKey),'local') { //检测settings是否过期
      var expDate = new Date(store.get(this.expireDateKey,'local'))
      var now = new Date()

      if (expDate.getTime() < now.getTime()) {
        expired = true
      }
    }

    if (localSettings && !expired) { //优先使用本地存储的内容(未过期时)
      this.settings = localSettings
      return
    }

    Model.getMobileMallBasicSetting({
      type: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        data: {
          companyId
        }
      }
    })
    .then((result) => {

      const data = result.data
      if (result.code == 0) {
        this.settings = result.resultData || {}
        store.set(this.settingsKey, this.settings,'local')
        store.set(this.expireDateKey, this._getExpireDate(),'local')
      }
    })
  },

  /**
   *
   *  获取微信appId
   * @returns {String} appId
   * @private
   */
  _getWeixinAppId() {
    return new Promise ((resolve,reject) => {
      var appId = store.get(this.appIdKey,'local')
      var expired = false

      if(store.get(this.appIdexpireDateKey,'local')) {  //检测settings是否过期
        var expDate = new Date(store.get(this.appIdexpireDateKey,'local'))
        var now = new Date()

        if (expDate.getTime() < now.getTime()) {
          expired = true
        }
      }

      if (appId && !expired) {  //优先使用本地存储的内容(未过期时)
        this.settings['appId'] = appId
        resolve(appId)
      }

      Model.getWxpayAppId({
        type: 'POST',
        data:  { companyId }
      }).then((result) => {
        const data = result.data
        if (result.code == 0 && data) {
          const {
            appId
          } = data
          this.settings['appId'] = appId
          store.set(this.appIdKey, appId,'local')
          store.set(this.appIdexpireDateKey, this._getExpireDate(),'local')
          resolve(appId)
        } else {
          reject('')
        }
      })
    })

  },

  /**
   * 获取当前时间后的一个小时
   * @returns {Date} String
   * @private
   */
  _getExpireDate() {
    var now = new Date()
    return  new Date(now.getTime() + oneHour)
  }
}

MallSettings.init()

export default MallSettings
