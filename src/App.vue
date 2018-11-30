<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/javascript">

import utils from '@/widget/utils'

import app from '@/widget/app'

import store from '@/widget/store'

import * as Model from '@/model/static'

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

      if (res && typeof res == 'string') {
        if (utils.isLocalStorageSupported()) {
          if (!store.get('/webapp-static/fastclick/index.js'), 'local') {
            let result = {
              times: new Date().getTime() + cacheTimes,
              results: res
            }
            store.set('/webapp-static/fastclick/index.js', result, 'local')
          }
        } 
        utils.appendScript(res)
        if ('addEventListener' in document) {
          document.addEventListener('DOMContentLoaded', () =>{
            window.FastClick.attach(document.body)
          }, false)
        }
      }
    })
  },
  watch: {
    '$route'() {
      this.$nextTick(() => {
        document.querySelector('.scroll-view-wrapper').style.minHeight = window.innerHeight + 'px'
      })
    }
  },
  methods: {
    getLizardCode () {
      const cacheTimes = 30 * 24 * 60 * 60 * 1000
      Model.getLizardCode({
        type: 'GET',
        dataType: 'text',
        cache: true,
        expires: cacheTimes
      }).then((res) => {

        if (res && typeof res == 'string') {
          if (utils.isLocalStorageSupported()) {
            if (!store.get('/webapp-static/lizard/index.js'), 'local') {
              let result = {
                times: new Date().getTime() + cacheTimes,
                results: res
              }
              store.set('/webapp-static/lizard/index.js', result, 'local')
            }
          }
        }
      })
    }
  },
  mounted () {
    this.getLizardCode()
  }
}
</script>

<style lang="scss">
  @import './styles/reset.scss';
  @import './styles/main.scss';
  @import './styles/loading.scss';
  @import './styles/toast.scss';

</style>
