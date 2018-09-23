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
   *
   * Example1:
   * app.postMessage("getLocation", {x: 1, y: 2}, (data1, data2) => {
     *          alert("x=" + data1 + ",y=" + data2 + ",z=" + this.pageSize);
     *  });
   *
   * Example2:
   * app.postMessage("getLocation",  (data1, data2) => {
     *          alert("x=" + data1 + ",y=" + data2 + ",z=" + this.pageSize);
     *  });
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

  //唤起app登录
  login () {
    window.location.href = "lyf://login";
  },

  //通知app退出
  logout () {
    window.location.href = "lyf://logout";
  },
  //user token name
  utName: "lyfh5ut",
  distributorId: 'distributorId',
  distributorType: 'distributorType',//0接口获取1地址栏获取2登录成功后获取

  //判断用户是否已登录
  loggedIn () {
    // 优先判断后端写入的ut是否存在
    let checkUt = utils.getCookie('ut');
    let ut = utils.getCookie(this.utName);

    //后端ut不存在，并且不是app，直接判断为未登录,并且将备份的lyfh5ut设置为‘’
    if(!utils.isApp() && !checkUt){
      // 微信端ut 有效期是session级别，微信退出后 会需要重新登录
      if (utils.weixin()) {
        return !!ut
      }
      utils.setCookie(this.utName, "");
      return false;
    }
    //如果存在 后端有ut，但前端this.utName不存在的情况，将前端的this.utName，设置为后端的ut值
    if(!ut && checkUt){
      if(!utils.isApp()){
        utils.setCookie(this.utName,checkUt);
        ut = checkUt;
      }
    }
    if(utils.isApp()){
      if(!ut){//部分手机不能正常写入cookie
        ut = utils.getUaParams().ut;
      }
    }
    return ut && ut.length > 0;
  },

  //获取UT
  getUserToken () {
    // 优先判断后端写入的ut是否存在
    let checkUt = utils.getCookie('ut');
    let ut = utils.getCookie(this.utName);
    //后端ut不存在，并且不是app，直接判断为未登录,并且将备份的lyfh5ut设置为‘’
    if(!utils.isApp() && !checkUt){
      // 微信端ut 有效期是session级别，微信退出后 会需要重新登录
      if (utils.weixin() && !!ut) {
        return ut
      }
      utils.setCookie(this.utName, "");
      return '';
    }
    //如果存在 后端有ut，但前端this.utName不存在的情况，将前端的this.utName，设置为后端的ut值
    if(!ut && checkUt){
      if(!utils.isApp()){
        utils.setCookie(this.utName,checkUt);
        ut = checkUt;
      }
    }
    alert(JSON.stringify(utils.getUaParams()))
    if(utils.isApp()){
      if(!ut){//部分手机不能正常写入cookie
        ut = utils.getUaParams().ut;
      }
    }
    return  ut;
  },
  //设置UT
  setUserToken (ut) {
    utils.setCookie(this.utName, ut);
  },

  //清空用户登录UT
  //因为在iphone6 se版本的微信里无法删除cookie，所以只能通过设置为空来标识用户退出登录状态。
  deleteUserToken () {
    utils.setCookie(this.utName, "");
  },
  requireLogin (from) {
    if (utils.isApp()) {
      app.login()
    } else {

      const from = utils.getRelatedUrl()
      window.location.href = `/login.html?from=` + encodeURIComponent(from);
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

    if (app.loggedIn()) {
      return
    } else {

      if (utils.isApp()) {

        app.login()

      } else {

        const from = utils.getRelatedUrl()

        if (from) {
          window.location.href = `/login.html?from=` + encodeURIComponent(from)
        } else {
          window.location.href = '/login.html'
        }
      }
    }
  }
}

export default app
