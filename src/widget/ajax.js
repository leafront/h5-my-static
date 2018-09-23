/**
 *
 * @param {Object} options
 * arguments
 * type:'GET',
 * timeout: 3000,
 * hostPath: 'http://m.laiyifen.com'
 * headers:{
	 *  Content-Type:'application/json'
	 * },
 * data:{
	 *  name:'leafront'
	 * }
 *
 * @returns {Promise}
 */

import config from '@/config/index'

export default function ajax ({
  hostPath = location.origin,
  url,
  async = true,
  timeout = 30000,
  type,
  headers,
  dataType = 'json'
}){

	return new Promise((resolve, reject) => {

		const xhr = new XMLHttpRequest()

		xhr.open(type, hostPath + url, async)

		xhr.timeout = timeout

		//设置请求头
		for (var k in headers) {

			xhr.setRequestHeader(k, headers[k])
		}

		xhr.responseType = dataType

		xhr.onreadystatechange = () => {

			if(xhr.readyState == 4){

				if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){

					resolve(xhr.response)

				} else {

					resolve({
						data:[],
						status: -500,
            message: '请求出错，请稍后再试'
					})
				}
			}
		}

    type == "GET" ? xhr.send(null) : 	xhr.send(data)

	})
}
