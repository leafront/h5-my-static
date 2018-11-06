<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="my-wallet-card">
        <div class="my-wallet-card-item" v-if="info.yCardBalance" @click="pageAction('/pay/youdianCard.html')">
          <strong class="cfff">{{info.yCardBalance || 0}}</strong>
          <span class="font cfff">悠点卡</span>
        </div>
        <i class="my-wallet-icon-line" v-if="info.yCardBalance"></i>
        <div class="my-wallet-card-item" @click="pageAction('/my/pointCards-list.html')">
          <strong class="cfff">{{info.eCardBalance || 0}}</strong>
          <span class="font cfff">伊点卡</span>
        </div>
      </div>
      <div class="my-wallet-item-wrapper">
        <div class="my-wallet-item" v-if="isApp" @click="pageAction('/my/my-paycode.html')">
          <i class="icon1"></i>
          <p>付款码</p>
          <div class="ui-right-bottom"></div>
        </div>
      </div>
      <div class="my-wallet-item-wrapper" @click="pageAction('/my/paycodebank-list.html')">
        <div class="my-wallet-item">
          <i class="icon2"></i>
          <p>银行卡</p>
          <div class="ui-right-bottom">
          </div>
        </div>
      </div>
      <div class="my-wallet-item-wrapper mt20" @click="pageAction('/my/yidou.html')">
        <div class="my-wallet-item ui-bottom-line">
          <i class="icon3"></i>
          <p>伊豆</p>
          <div class="ui-right-bottom">
          </div>
        </div>
      </div>
      <div class="my-wallet-item-wrapper" @click="pageAction('/my/integral.html')">
        <div class="my-wallet-item">
          <i class="icon4"></i>
          <p>积分</p>
          <div class="ui-right-bottom"></div>
        </div>
      </div>
      <div class="my-wallet-item-wrapper mt20" @click="pageAction('/my/coupons-list.html')">
        <div class="my-wallet-item ui-bottom-line">
          <i class="icon5"></i>
          <p>优惠券</p>
          <div class="ui-right-bottom">
          </div>
        </div>
      </div>
      <div class="my-wallet-item-wrapper" @click="pageAction('/my/pickup-goods.html')">
        <div class="my-wallet-item">
          <i class="icon6"></i>
          <p>提货券</p>
          <div class="ui-right-bottom">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import * as Model from '@/model/wallet'

  import utils from '@/widget/utils'

  export default {
    data () {
      return {
        isBorder: true,
        title: '我的钱包',
        pageView: false,
        isApp: utils.isApp(),
        info: {}
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
       * 获取钱包信息
       */
      getWalletInfo () {
        Model.getWalletInfo({
          type: 'GET',
          data: {
            isECard: 1,
            isYCard: 1,
            isBean: 1,
            isCoupon: 1,
            isPoint: 1
          }
        }).then((result) => {

          this.$hideLoading()
          const data = result.data

          if (result.code == 0 && data) {
            this.pageView = true
            this.info = data
          } else {
            this.$toast(result.message)
          }
        })
      }
    },
    created () {
      this.$showLoading()
      this.getWalletInfo()
    }
  }

</script>

<style lang="scss">
  .my-wallet-item-wrapper{
    padding-left: .3rem;
    background: #fff;
  }
  .my-wallet-item{
    height: 1rem;
    display: flex;
    align-items: center;
    padding-right: .3rem;
    i {
      background: url(./images/wallet_icon.png) no-repeat;
      background-size: 1rem auto;
    }
    .icon1{
      width: .36rem;
      height: .3rem;
      background-position: -.05rem -.08rem;
    }
    .icon2{
      width: .36rem;
      height: .27rem;
      background-position: -.6rem -.1rem;
    }
    .icon3{
      width: .33rem;
      height: .33rem;
      background-position: -.06rem -.57rem;
    }
    .icon4{
      width: .32rem;
      height: .37rem;
      background-position: -.62rem -.51rem;
    }
    .icon5{
      width: .36rem;
      height: .27rem;
      background-position: -.04rem -1.08rem;
    }
    .icon6{
      width: .36rem;
      height: .3rem;
      background-position: -.6rem -1.08rem;
    }
    p{
      padding-left: .2rem;
      flex:1;
      font-size:.3rem;
      color: #333;
    }
  }
  .my-wallet-card {
    display: flex;
    padding: .7rem .3rem;
    background: #ff6900;
    .my-wallet-icon-line {
      width: .01rem;
      height: 1.2rem;
      background: linear-gradient(to top, rgba(251, 251, 251, 0.09),rgba(251, 251, 251, 0.59),#fff,rgba(251, 251, 251, 0.09));
    }
  }
  .my-wallet-card-item{
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: center;
    strong{
      font-size: .4rem;
    }
  }

</style>
