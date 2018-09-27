import utils from '@/widget/utils'

import * as Model from '@/model/wx_share'

import mall_setting from '@/widget/mall_setting'

import wx from 'weixin-js-sdk'

const weixin_share = {

  /**
   * 初始化微信分享
   */
  initWeixinShare () {

    if (utils.weixin()) {

      const returnURL = location.href
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
  }
}

if (utils.weixin()) {
  utils.loadScript('/webapp-static/weixin-js-sdk/index.js',() => {

    //初始化微信分享
    weixin_share.initWeixinShare()
  })
}

export default weixin_share

