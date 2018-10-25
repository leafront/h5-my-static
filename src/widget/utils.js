
import config from '@/config/index'

const utils = {
  ua: navigator.userAgent,
  webKit () {
    return this.ua.indexOf('AppleWebKit') > -1;
  },
  mobile () {
    return !!this.ua.match(/AppleWebKit.*Mobile.*/);
  },
  ios () {
    return this.iPhone() || this.iPad();
  },
  android () {
    return this.ua.indexOf('Android') > -1 || this.ua.indexOf('Linux') > -1;
  },
  iPhone () {
    return this.ua.indexOf('iPhone') > -1;
  },
  iPad () {
    return this.ua.indexOf('iPad') > -1;
  },
  qq () {
    return this.ua.indexOf('QQBrowser') > -1;
  },
  nativeQQ () {
    return (this.ios() && !this.isApp() && this.ua.indexOf('UIWebView') > -1) || (this.android() && !this.isApp() && this.ua.indexOf('Mobile MQQBrowser') > -1);
  },
  weixin () {
    return this.ua.indexOf('MicroMessenger') > -1;
  },
  isApp () {
    return this.ua.indexOf('ody') > -1;
  },
  serialize(value) {
    return JSON.stringify(value);
  },

  deserialize(value) {

    if (typeof value != 'string' || value == '') return ''

    try {
      return JSON.parse(value)
    } catch (e) {

      return ''
    }
  },
  isLocalStorageSupported() {
    var testKey = 'test',
      storage = window.sessionStorage
    try {
      storage.setItem(testKey, 'testValue')
      storage.removeItem(testKey)
      return true
    } catch (error) {
      return false
    }
  },

  /**
   *
   * @param fn {Function}   实际要执行的函数
   * @param delay {Number}  执行间隔，单位是毫秒（ms）
   *
   * @return {Function}     返回一个“节流”函数
   */
  throttle(fn, threshhold) {

    // 记录上次执行的时间
    var last

    // 定时器
    var timer

    // 默认间隔为 250ms
    threshhold || (threshhold = 250)

    // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
    return function () {

      // 保存函数调用时的上下文和参数，传递给 fn
      var context = this
      var args = arguments

      var now = +new Date()

      // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
      // 执行 fn，并重新计时
      if (last && now < last + threshhold) {
        clearTimeout(timer)

        // 保证在当前时间区间结束后，再执行一次 fn
        timer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, threshhold)

        // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
      } else {
        last = now
        fn.apply(context, args)
      }
    }
  },
  /**
   * @param {Object} obj
   * @returns {string}
   * @example
   * util.queryStringify({name:'leafront',age:23}) =>  'name=leafront&age=23'
   *
   */

  queryStringify (obj) {

    function toQueryPair(key,value) {
      if (value==='') {
        return key;
      }
      return key + '=' + encodeURIComponent(value==='' ? '' : String(value))
    }

    let result = []
    for (var key in obj) {

      key = encodeURIComponent(key)
      const values = obj[key]
      if (values && values.constructor == Array) {

        const queryValues = []
        for (let i = 0, len = values.length; i < len; i++) {
          queryValues.push(toQueryPair(key, values[i]))
        }
        result = result.concat(queryValues)

      } else {
        result.push(toQueryPair(key,values))
      }
    }

    return result.join('&');
  },
  /**
   *
   * @param {String || null } text
   *
   * @return {Object}
   */

  query (strName){

    const queryObj = {}
    const query = location.search.substring(1) // Get query string

    const pairs = query.split("&") // Break at ampersand

    for (let i = 0; i < pairs.length; i++) {

      const pos = pairs[i].indexOf('=') // Look for "name=value"

      if (pos == -1) continue // If not found, skip

      const paramsName = pairs[i].substring(0, pos) // Extract the name

      let value = pairs[i].substring(pos + 1) // Extract the value

      value = decodeURIComponent(value) // Decode it, if needed

      queryObj[paramsName] = value // Store as a property
    }
    if (strName) {
      return queryObj[strName] // Return the object
    } else {
      return queryObj
    }
  },
  isPassive() {

    let supportsPassiveOption = false
    try {
      addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassiveOption = true
        }
      }));
    } catch(e) {}
    return supportsPassiveOption  //{passive: true} 就不会调用 preventDefault 来阻止默认滑动行为

  },
  setCookie (name, value, options ) {
    var Days = (options && options.day) || 365
    var exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/; domain=" + location.hostname
  },
  getCookie (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    if (arr = document.cookie.match(reg))
      return unescape(arr[2])
    else
      return null
  },
  delCookie (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.getCookie(name)
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + "; path=/; domain=" + location.hostname
  },

  //唤起app登录
  login () {
    window.location.href = "lyf://login";
  },

  //通知app退出
  logout () {
    window.location.href = "lyf://logout";
  },

  //清空用户登录UT
  //因为在iphone6 se版本的微信里无法删除cookie，所以只能通过设置为空来标识用户退出登录状态。
  deleteUserToken () {
    utils.setCookie(this.utName, "");
  },
  //user token name
  utName: "lyfh5ut",

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
  getUaParams: function () {
    var matchers = this.ua.match(/\-\-\[([\s\S]+?)\]\-\-/i);
    if (matchers && matchers.length>1) {
      var uaObj = JSON.parse(matchers[1]);
      return uaObj;
    }
    return {};

  },
  /**
   * 获得相对url
   * 如果当前完整url是：http://pintuan.test.odianyun.com/my-center/home.html?p=1
   * 返回：/my-center/home.html?p=1
   */
  getRelatedUrl () {
    return location.pathname + (location.search || "")
  },
  getSessionId () {
    let sid = ''
    if (utils.isApp()){
      sid = utils.getUaParams().sessionId
    } else {
      sid = utils.getCookie('sessionId')
    }

    if (!sid) {
      const now = new Date()
      //随机数字
      const randNum = Math.round(Math.random() * 1000)
      sid = now.getTime() + "" + randNum
      utils.setCookie('sessionId', sid)
    }

    return sid
  },
  appViewFixed () {

    const appView = document.getElementById('app')

    if (appView.classList.contains('app_fixed')){

      appView.classList.remove('app_fixed')

    } else {

      appView.classList.add('app_fixed')
    }
  },
  trim (text) {
    return text.replace(/\s+/g, "")
  },
  getVersion () {
    let version =  utils.getUaParams().version
    if (version) {
      version = version.replace(/\./g,'')
    }
    return version
  },
  loadScript (url,success) {
    const script = document.createElement("script")
    script.type = 'text/javascript'
    script.src = config.staticPath + url
    document.getElementsByTagName('head')[0].appendChild(script)
    script.onload = () => {
      success && success()
    }
  },
  /**
   * @param {String} res
   */
  appendScript (res) {

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.appendChild(document.createTextNode(res))
    document.head.appendChild(script)
  }
}

export default utils
