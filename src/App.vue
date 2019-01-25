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
