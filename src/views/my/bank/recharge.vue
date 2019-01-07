<template>
  <div class="pageView">
    <AppHeader :title="title" :backFn="backAction">
      <div class="ui-header-right" @click="pageAction('/my/recharge/list')">
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
          <input type="tel" v-model="money" maxlength="4" class="bank-recharge-input">
        </div> 
        <p class="font">充值金额不可超过 3000元</p>
      </div>
      <div class="bank-recharge-submit p30" @click="submitPay">
        <div class="ui-submit">
          <span>充值</span>
        </div>  
      </div> 
      <form id="submitPay" method="post">
        <input type="hidden" name="paymentConfigId" v-model="payGateWayConfigId">
        <input type="hidden" name="returnUrl" v-model="returnUrl">
      </form>
      <PayPopup 
        :isPopup="isPopup" 
        :payGateWays="payGateWays"
        @createPay="createPay"
        @togglePopup="togglePopup">
      </PayPopup> 
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'
  import config from '@/config/index'
  import utils from '@/widget/utils'
  import store from '@/widget/store'
  import * as Model from '@/model/bank'
  import PayPopup from '@/components/common/pay'
  import app from '@/widget/app'
  import validate from '@/widget/validate'

  export default {
    data () {
      return {
        title: '悠点卡',
        pageView: false,
        yCardBalance: 0,
        money: 100,
        openId: '',
        ycartreturnurl: '',
        payGateWayConfigId:'',
        paymentThirdparty: '',
        payGateWays: [],
        isPopup: false,
        returnUrl: location.origin + '/my/bank/recharge',
        payJumpUrl: ''
      }
    },
    components: {
      AppHeader,
      PayPopup
    },
    methods: {
      submitPay () {
        const {
          money,
          paymentThirdparty,
          openId
        } = this
        if (!money || !validate.isNumber(money)) {
          this.$toast('请输入有效的充值金额')
          return
        }
        if (money > 3000) {
          this.$toast('充值金额不可超过3000元')
          return
        }
        if (utils.isApp()) {
          const url = 'lyf://pay?body={"amount":'+ money +', "url": '+ returnUrl +', "orderType": 1}'
          location.href = url
        } else {
          this.togglePopup(true)
        }
      },
      createPay (paymentConfigId) {
        const {
          openId,
          returnUrl,
          money,
          paymentThirdparty
        } = this
        const submitData = {
          sessionId: utils.getUserToken(),
          orderType: 1,
          returnUrl,
          money
        }
        if (paymentThirdparty) {
          submitData.paymentThirdparty = paymentThirdparty
        }
        if (paymentConfigId) {
          submitData.paymentConfigId = paymentConfigId
        }
        if (openId) {
          submitData.openId = openId
        } else {
          if (utils.weixin()) {
            this.$toast('充值失败')
            return
          }
        }
        Model.createPay({
          type: 'POST',
          data: submitData
        }).then((result) => {

          const data = result.data
          if (result.code == 0 && data) {

            if (paymentThirdparty.indexOf('支付宝') > -1) {
              location.href = data.od
            } else if (paymentThirdparty.indexOf('微信') > -1) {
              this.createWechatpay(data)
            } else if (paymentThirdparty.indexOf('银联') > -1) {
              const payJumpUrl = data.od
              const submitPayEle = document.getElementById('submitPay')
              submitPayEle.setattribute('action', payJumpUrl)
              submitPayEle.submit()
            }
          }
        })
      },
      createWechatpay ({appid, timestamp, noncestr, prepayid, sign}) {
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
            "appId": appid, //公众号名称，由商户传入
            "timeStamp": timestamp, //时间戳，自1970年以来的秒数
            "nonceStr": noncestr, //随机串
            "package": 'prepay_id=' + prepayid,
            "signType": 'MD5', //微信签名方式:
            "paySign": sign
        }, (res) => {
          //微信支付成功，如果缓存中有ycartreturnurl，就跳转对应连接
          const err_msg = res.err_msg
          if (err_msg == "get_brand_wcpay_request:ok") {
            const ycartreturnurl = store.get('ycartreturnurl', 'session')
            if (ycartreturnurl) {
              location.href = ycartreturnurl
              store.remove('ycartreturnurl', 'session')
            } else {
              location.href = this.returnUrl
            }
          } else if (err_msg == "get_brand_wcpay_request:cancel") {
            this.$toast('取消支付')
          } else if (err_msg == "get_brand_wcpay_request:fail") {
            this.$toast('支付失败')
          }
        })
      },
      /**
       * [getOpenIdByCode 获取微信的openId]
       * @param  {String} code [微信授权返回的code]
       */
      getOpenIdByCode (code) {
        Model.getOpenIdByCode({
          type: 'GET',
          data: {
            code
          },
          cache: true
        }).then((result) => {
          const data = result.data
          if (result.code == 0 && data) {
            this.openId = data.data
          }
        })
      },
      togglePopup (val) {
        this.isPopup = val
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
      getPayGateway () {
        Model.getPayGateway({
          type: 'GET',
          data: {
            businessType: 2
          }
        }).then((result) => {

          const data = result.data
          if (result.code == 0 && data) {

            const payGateWays = data.payGatewayList.concat(data.commonPayGatewayList) || []
            this.setGateWays(payGateWays)
          }
        })
      },
      /**
       * [setGateWays 设置支付方式]  微信端过滤掉支付宝，普通浏览器端过滤掉微信
       * @param {Array/Objet} payGateWays [支付方式列表]
       */
      setGateWays (payGateWays) {
        if (payGateWays && payGateWays.length > 0) {
          payGateWays.forEach((item, index) => {
            if (utils.weixin() && item.paymentThirdparty.indexOf('支付宝') > -1) {
              payGateWays.splice(index, 1)
            }
            if (!utils.weixin() && item.paymentThirdparty.indexOf('微信') > -1) {
              payGateWays.splice(index, 1)
            }
          })
          this.payGateWays = payGateWays
          this.payGateWayConfigId = this.payGateWays[0].paymentConfigId
          this.paymentThirdparty = this.payGateWays[0].paymentThirdparty
        }
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
      setWeixinAuthUrl (url) {
        return app.getWeixinAppId().then((appId) => {
          const weixinUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +appId + "&redirect_uri="+encodeURIComponent(url)+"&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect"
          location.replace(weixinUrl)
        })
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
      },
      setWeixinAuth () {
        if (utils.weixin()) {
          const {
            code
          } = this.$route.query
          if (code) {
            this.getOpenIdByCode(code)
          } else {
            const url = location.origin + '/my/bank/recharge'
            this.setWeixinAuthUrl(url)
          }
        }
      }
    },
    created () {
      this.$showLoading()
      this.getWalletInfo()
      this.setWeixinAuth()
      if (!utils.isApp()) {
        this.getPayGateway()
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