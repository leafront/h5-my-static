<template>
  <div class="pageView">
    <AppHeader :title="title" :backFn="backAction">
      <div class="ui-header-right">
        <span>充值记录</span>
      </div>
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="bank-recharge">
        <i class="bank_icon"></i>
        <div class="bank-recharge-money">
          <span>悠点卡当前余额</span>
          <p>{{yCardBalance}}<small>元</small></p>
        </div>
      </div>
      <div class="bank-recharge-tips p30">
        <h4 class="c3">在线充值</h4>
      </div>
      <div class="bgfff bank-recharge-cont p30">
        <h4 class="font">充值金额</h4>
        <div class="bank-recharge-form ui-bottom-line">
          <span class="c0">¥</span>
          <input type="tel" maxlength="4" class="bank-recharge-input">
        </div> 
        <p class="font">充值金额不可超过 3000元</p>
      </div>
      <div class="bank-recharge-submit p30">
        <div class="ui-submit">
          <span>充值</span>
        </div>  
      </div> 
      <PayPopup></PayPopup> 
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'
  import config from '@/config/index'
  import app from '@/widget/app'
  import utils from '@/widget/utils'
  import store from '@/widget/store'
  import * as Model from '@/model/bank'
  import PayPopup from '@/components/common/pay'
  import MallSettings from '@/widget/mall_setting'

  export default {
    data () {
      return {
        title: '悠点卡',
        pageView: false,
        yCardBalance: 0,
        money: '',
        openId: '',
        ycartreturnurl: ''
      }
    },
    components: {
      AppHeader,
      PayPopup
    },
    methods: {
      /**
       * [getOpenIdByCode 获取微信的openId]
       * @param  {String} code [微信授权返回的code]
       */
      getOpenIdByCode (code) {
        Model.getOpenIdByCode({
          type: 'GET',
          data: {
            code
          }
        }).then((result) => {
          const data = result.data
          if (result.code == 0 && data) {
            this.openId = data.data
          }
        })
      },
      /**
       * 获取悠点卡金额
       */
      getWalletInfo () {
        Model.getWalletInfo({
          type: 'GET'
        }).then((result) => {

          const data = result.data
          this.$hideLoading()
          this.pageView = true
          if (result.code == 0 && data) {
            this.yCardBalance = data.yCardBalance || 0
          } else {
            this.$toast(result.message)
          }
        })
      },
      submitAction () {
        const {
          money
        } = this

        if (!money) {
          this.$toast('请输入充值金额')
          return
        }
      },
      pageAction (url) {
        this.$router.push(url)
      },
      toggleBankPopup (val) {
        this.isBankPopup = val
      },
      getWeixinAuthUrl (url) {
        const weixinUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +MallSettings.getAppId() + "&redirect_uri="+encodeURIComponent(url)+"&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect"
        return weixinUrl
      },
      setRefrrer () {
        const referUrl = document.referrer
        if (referUrl.indexOf('.laiyifen.com') >  -1) {
          store.set('ycartreturnurl', referUrl, 'session')
          this.ycartreturnurl = ycartreturnurl
        }
      },
      backAction () {
        const { ycartreturnurl } = this
        if (ycartreturnurl && ycartreturnurl.indexOf('youdianCard-pay-list.html') > -1) {
          location.replace('/my/index')
        } else if (ycartreturnurl) {
          location.replace(ycartreturnurl)
        }
        store.remove('ycartreturnurl', 'local')
      }
    },
    created () {
      this.$showLoading()
      this.getWalletInfo()
      if (utils.weixin()) {
        const {
          code
        } = this.$router.query
        if (code) {
          this.getOpenIdByCode()
        } else {
          const url = '/my/bank/recharge'
          const weixinAuthUrl = this.getWeixinAuthUrl()
          location.replace(weixinAuthUrl)
        }
      }
    }
  }

</script>

<style lang="scss">
  .bank-recharge-submit{
    margin-top: .3rem;
    .ui-submit{
      border-radius: .1rem;
    }
  }
  .bank-recharge-cont{
    h4{
      line-height: 1rem;
    }
    p{
      line-height: .8rem;
    }
  }
  .bank-recharge-form{
    height: 1rem;
    font-size: .48rem;
    display: flex;
    align-items: flex-start;
    span{
      font-family: "Microsoft YaHei";
      padding-right: .2rem;
    }
    .bank-recharge-input{
      height: .7rem;
      padding: .1rem 0;
    }
  }
  .bank-recharge{
    padding: .45rem .54rem;
    background: #FF6900;
    display: flex;
    .bank_icon{
      background: url(./images/bank_icon.png) no-repeat;
      width: 1.1rem;
      height: 1.1rem;
      background-size: 1.1rem auto;
    }
  }
  .bank-recharge-money{
    padding-left: .56rem;
    display: flex;
    flex-direction: column;
    span{
      color: rgba(255,255,255,.8);
    }
    p{
      color: #fff;
      font-size: .65rem;
      small{
        padding-left: .1rem;
        font-size: .24rem;
      }
    }
  }
  .bank-recharge-tips{
    height: 1rem;
    display: flex;
    align-items: center;
  }
</style>