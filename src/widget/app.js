import utils from './utils'

//回调函数计数
var count = 0;

/**
 * 访问app的API工具类
 */
const app = {
  /**
   * 发送app消息，通过callback处理返回
   *
   * @param func app提供的消息名称 [必填]
   * @param params 传递给app的参数 [非必填]
   * @param callback 消息处理后的回调函数 [非必填]
   */
  postMessage (func, params, callback) {
    //只有在app才执行
    if (!utils.isApp()) {
      return;
    }

    if (!func) {
      throw new Error("param [func]  is required");
    }

    if (typeof params == "function") {
      callback = params;
      params = null;
    }

    var msgParams = {"function": func};
    if (params) {
      msgParams["param"] = params;
    }

    if (callback) {
      var funcName = this.getFunctionName(func);
      window[funcName] = callback;
      msgParams["callback"] = funcName;
      // console.log("callback:" + funcName)
    }

    if (utils.ios()) {
      window.webkit.messageHandlers.mobileAPI.postMessage(msgParams);
    } else if (utils.android()) {
      window.mobileAPI.postMessage(JSON.stringify(msgParams));
    }
  },

  //生成全局函数名字
  getFunctionName (func) {
    return "App_" + func + "_callback_" + (++count);
  },

  //通知app返回上一页，refresh指定是否刷新上一页内容。
  //@params forceBack 是否强制app退出当前webview网页
  back (refresh,forceBack) {
    this.postMessage("webViewBack", {refresh: refresh ? 1 : 0, forceBack: forceBack ? 1 : 0});
  },
  requireLogin (from) {
    if (utils.isApp()) {
      utils.login()
    } else {

      const from = utils.getRelatedUrl()
      window.location.href = `/login.html?from=` + encodeURIComponent(from)
    }
  },
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
          window.location.href = `/login.html?from=` + encodeURIComponent(from)
        } else {
          window.location.href = '/login.html'
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
    imgUrl
  }) {
    if (utils.getVersion() >= 5320) {
      app.postMessage('setShareContent', {
        url: link,
        title,
        description: desc,
        url160x160: imgUrl,
        pic: imgUrl
      }, () => {
       
      })
    }
  }
}

export default app
