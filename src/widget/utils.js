
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
  setTimeout (callback,times) {

    this.timer = setTimeout(() => {
      callback()
    },times)

  },
  clearTimeout () {

    clearTimeout(this.timer)

  },
  serialize(value) {
    return JSON.stringify(value);
  },

  deserialize(value) {

    if (typeof value != 'string' || value == '') return '';

    try {
      return JSON.parse(value);
    } catch (e) {

      return '';
    }
  },
  /**
   * 获得主机名
   * 如果当前完整url是：http://pintuan.test.odianyun.com/my-center/home.html?p=1
   * 返回：http://pintuan.test.odianyun.com
   */
  getHost () {
    var url = location.protocol + "//" + location.host
    return url
  },
  isLocalStorageSupported() {
    var testKey = 'test',
      storage = window.sessionStorage;
    try {
      storage.setItem(testKey, 'testValue');
      storage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
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
  isWeixinIphoneX (){

    const isWeixin = this.weixin()

    const ua = window.navigator.userAgent.toLowerCase()

    const isPhoneX = /iphone/gi.test(ua) && (screen.height == 812 && screen.width == 375)

    return (isWeixin && isPhoneX)
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

      return key + '=' + encodeURIComponent(value==='' ? '' : String(value));

    }

    var result = [];

    for (var key in obj) {

      key = encodeURIComponent(key);

      var values = obj[key];

      if (values && values.constructor == Array) {

        var queryValues = [];

        for (var i = 0, len = values.length; i < len; i++) {

          queryValues.push(toQueryPair(key, values[i]));

        }

        result = result.concat(queryValues);

      } else {

        result.push(toQueryPair(key,values));

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

  query (){

    var strParame = arguments[0]

    var args = {};

    var query = location.search.substring(1); // Get query string

    var pairs = query.split("&") // Break at ampersand

    for (var i = 0; i < pairs.length; i++) {

      var pos = pairs[i].indexOf('=') // Look for "name=value"

      if (pos == -1) continue // If not found, skip

      var argname = pairs[i].substring(0, pos); // Extract the name

      var value = pairs[i].substring(pos + 1); // Extract the value

      value = decodeURIComponent(value); // Decode it, if needed

      args[argname] = value // Store as a property
    }
    if (strParame == undefined) {

      return args

    }else {

      return args[strParame] // Return the object
    }
  },

  /**
   * 获取url hash的值
   * 例：/details.html?itemid=1#sort=asc&price=100
   * 返回: {sort: "asc", price: 100 }
   */
  hashFormat (url) {
    var hashObj = {};
    var sind = url.indexOf('#');
    if (sind >= 0) {
      var hstr = url.substring(sind+1);
      var paramsList = hstr.split("&");
      for(var i=0; i<paramsList.length; i++) {
        var param = paramsList[i];
        var pind = param.indexOf("=");
        if (pind>=0) {
          hashObj[param.substring(0, pind)] = param.substr(pind + 1);
        } else {
          hashObj[param] = "";
        }
      }
    }

    return hashObj;
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
    return supportsPassiveOption;   //{passive: true} 就不会调用 preventDefault 来阻止默认滑动行为

  },
  isContained (arr1,arr2){
    if(!(arr1 instanceof Array) || !(arr2 instanceof Array)) return false;
    if(arr1.length < arr2.length) return false;
    var aStr = arr1.toString();
    for(var i = 0, len = arr2.length; i < len; i++){
      if(aStr.indexOf(b[i]) == -1) return false;
    }
    return true;
  },

  setCookie (name, value, options ) {
    var Days = (options && options.day) || 365;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/; domain=" + location.hostname;
  },
  getCookie (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
  delCookie (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + "; path=/; domain=" + location.hostname;
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
    return location.pathname + (location.search || "") + (location.hash || "");
  },
  getSessionId () {
    if (utils.isApp()){
      var sid = utils.getUaParams().sessionId;
    }

    else
      var sid = utils.getCookie('sessionId');

    if (!sid) {
      var now = new Date();
      //随机数字
      var randNum = Math.round(Math.random() * 1000);
      sid = now.getTime() + "" + randNum;
      utils.setCookie('sessionId', sid);
    }

    return sid;
  },
  /**
   * 根据团单号构造支付成功的返回的页面url
   * {String} orderCode
   */
  getPayBackUrl (orderCode) {
    var url = location.protocol + "//" + location.host

    url += `/pay/pay-success.html?orderCode=${orderCode}`

    return url
  },

  //清空用户登录UT
  //因为在iphone6 se版本的微信里无法删除cookie，所以只能通过设置为空来标识用户退出登录状态。
  deleteUserToken () {
    this.setCookie('lyfh5ut', "");
  },
  isPhoneX (){

    const isWeixin = this.weixin()
    const isApp = this.isApp()
    const ua = window.navigator.userAgent.toLowerCase();
    const isPhoneX = /iphone/gi.test(ua) && (screen.height == 812 && screen.width == 375)
    return (isWeixin && isPhoneX ) || (isApp && isPhoneX)

  },
  removeAppViewFixed: function () {
    const appView = document.getElementById('app')
    appView.classList.remove('app_fixed')

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
  imgScale (url,q = 95){
    const getDeviceWidth = document.documentElement.clientWidth > 750 ? 750 : document.documentElement.clientWidth
    const pattern = /http:\/\/.*?(gif|png|jpg)/gi
    if (url.indexOf('.jpg') > -1 || url.indexOf('.png') > -1) {
      const scaleImage = url.replace(pattern,(res) => {
        if (res.indexOf('http://cdn.oudianyun.com') > -1) {
          return `${res}@base@tag=imgScale&q=${q}&m=1&w=${getDeviceWidth}`
        } else {
          return res
        }
      })
      return scaleImage
    } else {
      return url
    }
  },
  loadScript (url,success) {
    const script = document.createElement("script")
    script.type = 'text/javascript'
    script.src = config.staticPath + url
    document.getElementsByTagName('head')[0].appendChild(script)
    script.onload = () => {
      success && success()
    }
  }
}

export default utils
