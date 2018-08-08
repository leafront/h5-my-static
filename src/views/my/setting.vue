<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="my-setting-list">
        <div class="my-setting-item" @click="routerAction('/my/personal')">
          <span class="c3">个人资料</span>
          <div class="ui-right-bottom"></div>
        </div>
        <div class="my-setting-item" @click="routerAction('/my/account/security')">
          <span class="c3">账户安全</span>
          <div class="ui-right-bottom"></div>
        </div>
        <div class="my-setting-item" @click="routerAction('/my/aboutus')">
          <span class="c3">关于我们</span>
          <div class="ui-right-bottom"></div>
        </div>
        <div class="my-setting-item" v-if="isApp" @click="clearCache">
          <span class="c3">清除图片缓存</span>
          <strong class="c3 font" v-if="cache">{{cache}}</strong>
        </div>
        <div class="my-setting-item" @click="toggleContactPopup(true)">
          <span class="c3">联系客服</span>
          <div class="ui-right-bottom"></div>
        </div>
        <div class="my-setting-item" v-if="isApp" @click="routerAction('/my/message')">
          <span class="c3">消息设置</span>
          <div class="ui-right-bottom"></div>
        </div>
        <div class="my-setting-item" v-if="isApp" @click="pageAction('/setting/trustedDevice/trustedDevice.html')">
          <span class="c3">可信设备管理</span>
          <div class="ui-right-bottom"></div>
        </div>
      </div>
    </div>
    <UIContact :contactPopup="contactPopup" @toggleContactPopup="toggleContactPopup"></UIContact>
    <div class="my-setting-logout" @click="logoutAction" v-if="loggedIn">
      <div class="ui-submit">
        <span>退出当前账户</span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import UIContact from '@/components/common/ui-contact'

  import utils from '@/widget/utils'

  import app from '@/widget/app'

  import * as Model from '@/model/setting'

  import store from '@/widget/store'

  import distribution from '@/common/distribution'

  export default {
    data () {
      return {
        isBorder: true,
        title: '个人设置',
        pageView: true,
        isApp: utils.isApp(),
        cache: '0MB',
        loggedIn: app.loggedIn(),
        contactPopup: false
      }
    },
    components: {
      AppHeader,
      UIContact
    },
    methods: {
      toggleContactPopup (val) {
        this.contactPopup = val
      },
      backAction () {
        if (this.isApp) {
          app.back()
        } else {
          location.href = '/my/home.html'
        }
      },
      /**
       * 清除缓存数据
       */
      clearCache () {
        app.postMessage("clearCache", ()=>{
          this.cache = '0MB'
        })
      },
      getCacheSize () {
        if (!this.isApp) {
          return
        }
        app.postMessage('getCache', (data) => {
          this.cache = data
        })
      },
      pageAction (url) {
       location.href = url
      },
      routerAction (url) {
        this.$router.push(url)
      },
      /**
       * 退出当前账户
       */
      logoutAction () {

        Model.mobileLogout({
          type: 'POST'
        }).then((result) => {

          if (result.code == 0) {

            utils.deleteUserToken()
            store.remove('lyfuid','local')
            distribution.clearCurrentDistributionData() //清除分销商的信息
            if (this.isApp) {
              app.logout()
            } else {
              location.href = '/my/home.html'
            }
          } else {
            this.$toast(result.message)
          }
        })
      }
    },
    created () {
      this.getCacheSize()
    }
  }
</script>

<style lang="scss">
  .my-setting-list{
    background: #fff;
    padding-left: .3rem;
    margin-top: .2rem;
  }
  .my-setting-item{
    height:.88rem;
    padding-right: .3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: .01rem solid #ddd;
    &:last-child{
      border-bottom:0;
    }
    span{
      font-size: .32rem;
      font-weight: 400;
    }
  }
</style>
