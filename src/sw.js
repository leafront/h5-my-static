
// 当前缓存版本的唯一标识符，用当前时间代替
var cacheKey = String(process.config.getTime)

// 当前缓存白名单，在新脚本的 install 事件里将使用白名单里的 key

var cacheFileList = global.serviceWorkerOption.assets

// 监听 install 事件
self.addEventListener('install', function (event) {
  // 等待所有资源缓存完成时，才可以进行下一步
  event.waitUntil(
    caches.open(cacheKey).then(function (cache) {
      // 要缓存的文件 URL 列表
      return cache.addAll(cacheFileList)
    })
  )
})

self.addEventListener('fetch', function(event) {
  const request = event.request
	const requestUrl = new URL(request.url)
	const fileType = /\.(?:png|jpg|gif|css|js)$/gi
  // Ignore not GET request.
  if (request.method !== 'GET') {
    return
  }
  if (!fileType.test(requestUrl.pathname)) {
  	return
	}
  event.respondWith(
    caches.match(request)
    .then(function(response) {
      if (response) {
        return response
      }

      // 因为 event.request 流已经在 caches.match 中使用过一次，
      // 那么该流是不能再次使用的。我们只能得到它的副本，拿去使用。
      const fetchRequest = request.clone()

      // fetch 的通过信方式，得到 Request 对象，然后发送请求
      return fetch(fetchRequest).then(
        function(response) {
          // 检查是否成功
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          // 如果成功，该 response 一是要拿给浏览器渲染，而是要进行缓存。
          // 不过需要记住，由于 caches.put 使用的是文件的响应流，一旦使用，
          // 那么返回的 response 就无法访问造成失败，所以，这里需要复制一份。
          const responseToCache = response.clone()

          caches.open(cacheKey)
          .then(function(cache) {
            cache.put(request, responseToCache)
          })

          return response
        }
      )
    })
  )
})

// 新 Service Workers 线程取得控制权后，将会触发其 activate 事件
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          // 不在白名单的缓存全部清理掉
          if (cacheKey !== cacheName) {
            // 删除缓存
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
