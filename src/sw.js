
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
  event.respondWith(
    caches.open(cacheKey).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        const fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone())
          return networkResponse
        })
        return response || fetchPromise
      })
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
