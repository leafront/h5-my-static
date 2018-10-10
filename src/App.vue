<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/javascript">

import utils from '@/widget/utils'

import app from '@/widget/app'

import store from '@/widget/store'

import * as Model from '@/model/common'

export default {
  name: 'App',
  beforeCreate () {
    /**
     * 获取 fastclick 文件缓存
     */
    const cacheTimes = 30 * 24 * 60 * 60 * 1000

    Model.getFastClick({
      type: 'GET',
      dataType: 'text',
      cache: true,
      expires: cacheTimes
    }).then((res) => {

      if (!store.get('/webapp-static/fastclick/index.js'), 'local') {

        let result = {
          times: new Date().getTime() + cacheTimes,
          results: res
        }

        utils.appendScript(res)

        store.set('/webapp-static/fastclick/index.js', result, 'local')
      }

      if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
          FastClick.attach(document.body);
        }, false);
      }
    })
  },
  created () {
    //统一隐藏app头部
    if(utils.isApp()) {
      if (utils.getVersion() <= 5320) {
        app.postMessage('hiddenHead',{'isHidden':'1'})
      }
    }
  }
}
</script>

<style lang="scss">
  @import './styles/reset.scss';
  @import './styles/main.scss';
  @import './styles/loading.scss';
  @import './styles/toast.scss';
</style>
