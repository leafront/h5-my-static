<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
      <div class="ui-header-right" @click="pageAction('/order/invoice/rule')">
        <span>开票说明</span>
      </div>
    </AppHeader>
    <div class="scroll-view-wrapper":class="{'visibility': pageView}">
      <div class="my-account-security">
        <div class="my-account-security-item" v-if="userInfo.memberCardNo">
          <span>会员卡号</span>
          <p class="font">{{userInfo.memberCardNo}}</p>
        </div>
        <div class="my-account-security-item">
          <span>手机号码</span>
          <p class="font">{{userInfo.mobile}}</p>
        </div>
        <div class="my-account-security-item" v-if="hasPassword" @click="pageAction('/setting/changepasswd1.html')">
          <span>密码修改</span>
          <div class="ui-right-bottom"></div>
        </div>
        <div class="my-account-security-item" v-if="!hasPassword" @click="pageAction('/setting/bindpassword.html')">
          <span>密码添加</span>
          <div class="ui-right-bottom"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import * as Model from '@/model/setting'

  import store from '@/widget/store'

  export default {
    data () {
      return {
        isBorder: true,
        title: '账户安全',
        pageView: false,
        userInfo: {},
        hasPassword: true
      }
    },
    components: {
      AppHeader
    },
    methods: {
      pageAction (url) {
        location.href = url
      },
      /**
       * 获取用户信息
       */
      getUserInfo () {
        return Model.getUserInfo({
          type: 'POST'
        }).then((result) => {
          const data = result.data
          if (result.code == 0 && data) {
            this.userInfo = data
            const mobile = data.mobile
            if (mobile) {
              store.set('username',mobile,'local')
            }
          } else {
            this.$toast(result.message)
          }
          return result
        })
      },
      checkPassword () {
        return Model.checkPassword({
          type: 'POST'
        }).then((result) => {

          const data = result.data
          if (result.code == 0) {
            this.hasPassword = false
          } else {
            this.$toast(result.message)
          }
          return result
        })
      }
    },
    created () {
      this.$showLoading()
      Promise.all([
        this.getUserInfo(),
        this.checkPassword()
      ]).then((result) => {
        let isSendSuccess = result.every((item) => {
          return item.code == 0
        })
        if (isSendSuccess) {
          this.pageView = true
          this.$hideLoading()
        }
      })
    }
  }

</script>

<style lang="scss">
  .my-account-security{
    padding-left: .3rem;
    background: #fff;
    margin-top: .2rem;
  }
  .my-account-security-item{
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
