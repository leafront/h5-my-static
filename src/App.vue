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
      // 新版本首页页签  需要根据url参数'hideHead' 判断是否postMessage。
      let urlParams = utils.query()
      if (urlParams.hideHead != 1) {
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
  @import './styles/dialog.scss';
  @import './styles/ui-switch.scss';
</style>
