/**
 *
 * @param {Object} options
 *
 * @returns {Promise}
 */

import config from '@/config/index'

export default function ajax ({
  hostPath,
  url,
  async = true,
  timeout = 30000,
  type,
  headers,
  dataType = 'json',
  data
}){

	return new Promise((resolve, reject) => {

		const xhr = new XMLHttpRequest()

    hostPath = hostPath || config.apiPath

		xhr.open(type, hostPath + url, async)

		xhr.timeout = timeout

		//设置请求头
		for (var k in headers) {

			xhr.setRequestHeader(k, headers[k])
		}
    xhr.setRequestHeader("Cache-Control","no-cache")

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
