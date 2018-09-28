<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/javascript">

import utils from '@/widget/utils'

import app from '@/widget/app'

export default {
  name: 'App',
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
