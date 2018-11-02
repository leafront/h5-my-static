import utils from './utils'
import store from './store'
import weixin_share from '@/common/weixin_share'

var count = 0  //回调函数计数

const app = {
  /**
   * @param {String} func
   * @param {Object} params
   * @param {Function} callback
   */
  postMessage (func, params, callback) {
    // 只有在app才执行
    if (!utils.isApp()) {
      return
    }

    if (!func) {
      throw new Error("param [func]  is required")
    }

    if (typeof params == "function") {
      callback = params
      params = null
    }

    var msgParams = {"function": func}
    if (params) {
      msgParams["param"] = params
    }

    if (callback) {
      var funcName = this.getFunctionName(func)
      window[funcName] = callback
      msgParams["callback"] = funcName
    }

    if (utils.ios()) {
      window.webkit.messageHandlers.mobileAPI.postMessage(msgParams)
    } else if (utils.android()) {
      window.mobileAPI.postMessage(JSON.stringify(msgParams))
    }
  },
  /**
   * 生成全局函数名字
   * @param  {String} func
   * @return {String} val
   */
  getFunctionName (func) {
    const val = "App_" + func + "_callback_" + (++count)
    return val
  },
  /**
   * forceBack 是否强制app退出当前webview网页
   * 通知app返回上一页，refresh指定是否刷新上一页内容。
   * @param  {String} refresh
   * @param  {String} forceBack
   */
  back (refresh,forceBack) {
    this.postMessage("webViewBack", {refresh: refresh ? 1 : 0, forceBack: forceBack ? 1 : 0});
  },
  /**
   * 提示框
   * @param  {String} text
   * @param  {Number} tims
   */
  toast (text,times = 1500) {
    const tpl = `
      <div class="ui-toast-mask">
      <div class="ui-toast">
      <span>${text}</span>
      </div>
    </div>`
    if (document.querySelector('.ui-toast-mask')) {
      return
    }
    app.append(document.body,tpl)

    const toastMask = document.querySelector('.ui-toast-mask')
    const toast = document.querySelector('.ui-toast')

    setTimeout(() =>{
      toastMask.parentNode.removeChild(toastMask)
      toast.parentNode.removeChild(toast)
    },times)
  },
  /**
   * @param {Object} el
   * @param {String} html
   */
  append (el, html) {

    var divTemp = document.createElement("div"),
      nodes = null,
      fragment = document.createDocumentFragment()
    divTemp.innerHTML = html

    nodes = divTemp.childNodes

    for (var i = 0, length = nodes.length; i < length; i += 1) {

      fragment.appendChild(nodes[i].cloneNode(true))
    }

    el.appendChild(fragment)

    // 清除
    nodes = null
    fragment = null
  },
  loginAction () {
    if (utils.loggedIn()) {
      return
    } else {
      if (utils.isApp()) {
        utils.login()
      } else {
        const from = utils.getRelatedUrl()
        if (from) {
          location.href = `/login.html?from=` + encodeURIComponent(from)
        } else {
          location.href = '/login.html'
        }
      }
    }
  },
  /**
   * @param {String} link. 链接
   * @param {String} title 标题
   * @param {String} desc  描述
   * @param {String} imgUrl 图片地址
   */
  setShareContent ({
    link,
    title,
    desc,
    imgUrl,
    platforms = null
  }) {
    if (utils.getVersion() >= 5320) {
      app.postMessage('setShareContent', {
        url: link,
        title,
        description: desc,
        url160x160: imgUrl,
        pic: imgUrl,
        platforms: platforms
      }, () => {
        
      })
    }
  },
  /**
   * 分享操作
   * @param {String} link
   * @param {String} title
   * @param {String} description
   * @param {String} imgUrl
   */
  shareAction ({
    link,
    title,
    description,
    imgUrl,
    platforms = null  //WechatMoments,朋友圈 Wechat,微信 QQ,QZone,qq空间,ShortMessage 短信,IM 无聊
  },callback) {
    const shareConfig = {
      link: link,
      url: link,
      title,
      desc: description,
      description,
      imgUrl,
      pic: imgUrl,
      platforms: platforms
    }
    if (utils.isApp()) {
      app.postMessage('share', {
        url: shareConfig.url,
        title: shareConfig.title,
        description: shareConfig.description,
        url160x160: shareConfig.pic,
        pic: shareConfig.pic,
        platforms: shareConfig.platforms
      },() => {
        callback && callback()
      })
      setTimeout(() => {
        callback && callback()
      },2000)
    } else {
      if (utils.weixin()) {
        this.updateShareMenu(true)
        weixin_share.weixinShare(shareConfig).then(() => {
          callback && callback()
        })
      }
    }
  }
}

export default app
