import request from '@/widget/request'

import config from '@/config/index'

import utils from '@/widget/utils'

/**
 * @return {String} uuid
 */
const generateUUID = () => {
  let d = new Date().getTime()
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16)
  })
  return uuid
}
/**
 * @param  {String} url
 * @return {String} _obj
 */
const getParseUrl = (url) => {
  if (!url) {
    return
  }
  const REG_PARSE_URL = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
  let _obj = {}
  let _name = ['url','scheme','slash','host','port','path','query','hash']
  let _url = REG_PARSE_URL.exec(url)
  for (let i = 0; i< _name.length; i++) {
    _obj[_name[i]] = _url[i]
  }
  return _obj
}
/**
 * 页面埋点
 * @param  {String} pid 页面埋点
 * @param  {String} ppid 前序页面id
 * @return {Null}
 */
export const sendTracker = ({
	pid = '',
  ppid = ''
 } = {
 	pid: '',
 	ppid: ''
 }) => {
 	const getTracker = (data) => request('/tracker/post', data)
	const referrer = document.referrer
	const pageInfo = {
	 'index.html': {
		p_name: 'home',
		p_id: 1
	 }
  }
	const params = {
	  ev: '17',
	  did: '',
	  tv: '1.0',
	  v: '', //version 客户端版本号
	  ut: utils.getUserToken(),
	  uid: generateUUID(),
	  pid, // 页面ID
	  inf: '', // inFrom 内部来源 上一个页面的page id
	  cha: 'H5', // channel 所属渠道编码：IOS／ANDROID／H5/APPLET（小程序）／WEBSITE（官网）
	  ct:  + new Date, // curTime 当前时间戳毫秒
	  bt: 'pv', //businessType 业务类型：init/pv/event
	  data: {
	  	ru: referrer,
	  	cpu: location.href
	  } 
	}
	
	if (referrer) {
		const referrerPath = getParseUrl(referrer)
		if (pageInfo[referrerPath.path]) {
			params.inf = pageInfo[referrerPath.path].p_name
			params.data.ppid = pageInfo[referrerPath.path].p_id
		}
	}
	params.data = JSON.stringify(params.data)
	getTracker({
		type: 'POST',
		data: params,
		hostPath: config.trackerPath
	})
}