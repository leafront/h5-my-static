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

export default function ajax (options){

  const baseHostPath = options.hostPath || location.origin

	return new Promise((resolve, reject) => {

		const xhr = new XMLHttpRequest()

		xhr.open(options.type, baseHostPath + options.url, options.async)

		xhr.timeout = options.timeout

		//设置请求头
		for (var k in options.headers) {

			xhr.setRequestHeader(k, options.headers[k])
		}

		xhr.responseType = options.dataType

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

    options.type == "GET" ? xhr.send(null) : 	xhr.send(options.data)

	})
}
