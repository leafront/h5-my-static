
import store from '@/widget/store'

import utils from '@/widget/utils'

import config from '@/config/index'

import distribution from './distribution'

import * as Model from '@/model/wx_share'

import mall_setting from '@/widget/mall_setting'

import wx from 'weixin-js-sdk'

import app from '@/widget/app'

//调用getUnionId的页面
const SKEY_INVOLKEPAGE = "s_invokepage";
//是否是在微信里首次打开h5页面
const SKEY_ACCESSED = "s_accessed";
//微信用户信息
const SKEY_WXUSERINFO = "s_wxuserinfo";

//当前用户的shareCode
const SKEY_SHARECODE = "s_currentsharecode"

const weixin_share = {
  /**
   * 获取当前用户微信unionid
   * @return {String} unionid
   */
  getUnionid () {
    if(!utils.weixin()) {
      return ""
    }

    return this.getWxUserInfo().unionId || ""
  },
  /**
   * 当前用户是否已关注了微信公众号
   */
  isSubscribe () {
    if(!utils.weixin()) {
      return false
    }

    //如果session里没有值，默认返回已关注
    const subscribe = this.getWxUserInfo().subscribe
    if (subscribe == undefined) {
      return true
    }
    return subscribe == 1
  },

  /**
   * 获取微信的用户信息
   * @return Object
   */
  getWxUserInfo () {
    return store.get(SKEY_WXUSERINFO,'session') || {}
  },

  //处理url里的上家分享码并保存进cookie
  processInviterShareCode () {

    var urlParams = utils.query()   //缓存的上家的shareCode

    var hashParams = utils.hashFormat(location.href)

    var s_shareCode = distribution.getInviterShareCode()  //1. 获取url里的sharecode，复制链接的shareCode是在hash里，分享朋友圈的shareCode是在url里的

    // 当前url里带的上家的shareCode
    var shareCode= hashParams.shareCode || urlParams.shareCode
    //2.  本人的shareCode要和url里的shareCode比较，如果相同就不处理
    //自己的shareCode

    var ownShareCode = distribution.getCurUserShareCode()

    //如果url里有上家的shareCode，且自己本地没有存shareCode，就保存上家的shareCode，在注册，预绑定，联合登录场景使用
    if(shareCode && shareCode != ownShareCode) {

      distribution.setInviterShareCode(shareCode)
    }
  },
  //处理url里的上家分享码并保存进cookie
  checkShareCode () {
    var urlParams = utils.query()
    var hashParams = utils.hashFormat(location.href)
    //缓存的上家的shareCode
    //上家的sharecode key要用常量并注释

    var s_shareCode = utils.getCookie("shareCode");
    //1. 获取url里的sharecode，复制链接的shareCode是在hash里，分享朋友圈的shareCode是在url里的
    // 上家的shareCode
    var shareCode = hashParams.shareCode || urlParams.shareCode
    // 本人的shareCode要和url里的shareCode比较，如果相同就不处理
    //自己的shareCode的
    var ownShareCode = store.get(SKEY_SHARECODE,'session')
    //如果url里有上家的shareCode，且自己本地没有存shareCode，就保存上家的shareCode，在注册，预绑定，联合登录场景使用
    if(shareCode && shareCode != ownShareCode) {
      utils.setCookie("shareCode", shareCode , {day:1})
    }
    this.rewrite()
  },
  /**
   * 重写url-在hash中添加shareCode参数（复制分享需要）
   * 注意：因微信中无法复制history.replaceState修改后的url，这里通过location.hash来记录这些值
   */
  rewriteUrl () {

    //有可能包含的是上家的shareCode
    var hashParams = utils.hashFormat(location.href)
    var urlParams = utils.query()
    delete urlParams.shareCode
    delete hashParams.shareCode
    //本地有缓存，或者接口返回成功才有
    var shareCode = store.get(SKEY_SHARECODE, 'session')
    if (shareCode) {
      // hashParams.shareCode = shareCode;
      urlParams.shareCode = shareCode

      var hashStr = utils.queryStringify(hashParams)
      if (hashStr) {
        //微信里只能更改hash的值，这里使用hash追踪分享人的信息
        location.hash = "#" + hashStr
      }

      var urlStr = utils.queryStringify(urlParams)
      if (urlStr) {
        var url = utils.getHost() + location.pathname + '?' + urlStr
        history.replaceState(null, "", url)

        this.initWeixinShare()
      }
    }
  },
  /**
   * 重写url
   * 需要初始化用户的shareCode信息
   */
  rewrite ( ) {
    this.loadCurrentDistributionData()
    .then((result) => {
      const data = result.data
      if (result.code == 0) {
        this.rewriteUrl()
      } else {
        app.toast('当前分享功能异常，建议刷新页面')
      }
    })
  },
  /**
   * 初始化微信分享
   */
  initWeixinShare () {

    if (utils.weixin()) {

      const returnURL = window.encodeURIComponent(config.hostPath + location.pathname)
      Model.getSign({
        type: 'GET',
        data: {
          url: returnURL
        }
      }).then((data) => {
        return data
      }).then((result) => {
        mall_setting._getWeixinAppId().then(() => {
          const {
            data: {
              data: {
                timestamp,
                nonceStr,
                signature
              }
            }
          } = result

          const appId = mall_setting.getAppId()
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId, // 必填，公众号的唯一标识
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature,// 必填，签名，见附录1
            jsApiList: [
              'showAllNonBaseMenuItem',
              'hideAllNonBaseMenuItem',
              'showMenuItems',
              'hideMenuItems',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
        })
      })

    }
  },

  /**
   * 微信分享
   * 朋友圈和发送给朋友的success不会触发，未知原因，放在trigger中触发回调
   */
  weixinShare (data) {
    if (utils.weixin()) {
      wx.ready(() => {
        return new Promise ((resolve,reject) => {
          wx.onMenuShareTimeline({
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: data.link, // 分享链接
            imgUrl: data.imgUrl, // 分享图标
            trigger: function (res) {
              resolve(res)
            }
          })
          wx.onMenuShareAppMessage({
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: data.link, // 分享链接
            imgUrl: data.imgUrl, // 分享图标
            trigger: function (res) {
              resolve(res)
            }
          });
          wx.onMenuShareQQ({
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: data.link, // 分享链接
            imgUrl: data.imgUrl, // 分享图标
            success: function (res) {
              resolve(res)
            }
          })
          wx.onMenuShareWeibo({
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: data.link, // 分享链接
            imgUrl: data.imgUrl, // 分享图标
            success (res) {
              resolve(res)
            }
          })
          wx.onMenuShareQZone({
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: data.link, // 分享链接
            imgUrl: data.imgUrl, // 分享图标
            success (res) {
              resolve(res)
            }
          })
        })
      })
    }
  },
  /**
   * 重新获取并设置用户的分销商信息
   */
  loadCurrentDistributionData () {

    const unionid = this.getUnionid()
    const shareCode = utils.getCookie('shareCode') || ""

    return Model.getCurrDistributor({
      type: 'GET',
      data: {
        unionid,
        shareCode
      }
    }).then((result) => {
      const data = result.data

      if (result.code == 0 && data && data.id) {
        app.setDistributorId(2, data.id)
        store.set('currDistributor', data,'session')

        if (data.shareCode) {
          store.set('s_currentsharecode', data.shareCode,'session')
        }
      }
      return result
    })
  }
}

if (utils.weixin()) {
  utils.loadScript('/webapp-static/weixin-js-sdk/index.js',() => {

  //初始化微信分享
  weixin_share.initWeixinShare()
  //默认分享内容
  weixin_share.weixinShare({
    link: window.location.href,
    title: mall_setting.getMallName(),
    desc: window.location.href,
    imgUrl: 'http://cdn.oudianyun.com/lyf/prod/back-cms/1497702554228_508_32.png@base@tag=imgScale&q=80'
  })
  //初始化微信分享
   weixin_share.checkShareCode()
  })
}

export default weixin_share

