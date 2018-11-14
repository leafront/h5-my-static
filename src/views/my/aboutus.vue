<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="my-aboutUs">
        <img src="./images/about-us-logo.png"/>
        <p class="font" v-if="appVersion">V{{appVersion}}</p>
        <p class="font">Copyright @2011-{{endYear}}</p>
        <p class="font">来伊份官网商城 All Right Reserved</p>
      </div>
      <div class="my-aboutUs-menu">
        <div class="my-aboutUs-item" @click="pageAction('/my/protocol')">
          <span class="c3">手机终端软件用户使用协议</span>
          <div class="ui-right-arrow"></div>
        </div>
        <div class="my-aboutUs-item" @click="pageAction('/my/security')">
          <span class="c3">特别说明</span>
          <div class="ui-right-arrow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import utils from '@/widget/utils'

  const uaParams = utils.getUaParams()

  export default {
    data () {
      return {
        isBorder: true,
        title: '关于我们',
        pageView: true,
        appVersion: uaParams.version || "",
        endYear: new Date().getFullYear()
      }
    },
    components: {
      AppHeader
    },
    methods: {
      pageAction (url) {
        this.$router.push(url)
      }
    }
  }

</script>

<style lang="scss">
  .my-aboutUs{
    margin-top: .3rem;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .8rem 0;
    img{
      width: 1.22rem;
      height: 1.5rem;
      margin-bottom: .1rem;
    }
    p{
      line-height: .5rem;
    }
  }
  .my-aboutUs-menu {
    margin-top: .3rem;
    background: #fff;
    padding-left: .3rem;
  }
  .my-aboutUs-item{
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
