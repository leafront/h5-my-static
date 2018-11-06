<template>
  <div class="pageView">
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="my-index-info">
        <div class="my-index-title">
          <div class="my_signIn_icon" @click="pageAction('/community/my-signIn.html')">
            <i></i>
          </div>
          <div class="my-wrapper-icon">
            <div class="my_message_icon" @click="pageAction('/message/message-center.html')">
              <i></i>
              <span v-if="readyMessage && readyCount" class="my-message-tips" :class="{'active':readyCount > 9}">{{readyCount > 99 ? '99+' : readyCount}}</span>
            </div>
            <div class="my_setting_icon" @click="routerAction('/my/setting')">
              <i></i>
            </div>
          </div>
        </div>
        <div class="my-index-personal">
          <div class="my-vip-txt">
            <p v-if="loggedIn">{{userInfo.userLevlName}}</p>
            <p v-else="loggedIn">- -</p>
            <span>会员等级</span>
          </div>
          <div class="my-vip-pic" @click="routerAction('/my/personal')" v-if="userInfo.headPicUrl" :style="{'background':'url('+userInfo.headPicUrl+')','backgroundSize': '1.28rem auto'}"></div>
          <div class="my-vip-pic" v-else></div>
          <div class="my-vip-txt" @click="pageAction('/my/yidou.html')">
            <p v-if="loggedIn">{{walletInfo.yBean || 0}}</p>
            <p v-else>- -</p>
            <span>伊豆</span>
          </div>
        </div>
        <div class="my-index-name">
          <p class="font-b cfff" v-if="loggedIn">{{userInfo.nickname}}</p>
          <div class="my-index-action cfff font" v-else>
            <span class="my-index-login" @click="pageAction('/login.html?from=/my/home.html')">登录</span>
            <i>/</i>
            <span class="my-index-reg" @click="pageAction('/regis.html?from=/my/home.html')">注册</span>
          </div>
          <div class="my-index-qrcode" @click="pageAction('/my/coupons-usercode.html')">
            <i></i>
            <span class="cfff">会员码</span>
          </div>
        </div>
      </div>
      <div class="my-index-money-bg" @click="pageAction('/activity/make/money')">
        <img src="./images/sales.gif"/>
      </div>
      <div class="my-index-money" @click="pageAction('/placeChannel/index.html')">
        <div class="my-index-money-wrapper">
          <div class="my-index-money-icon">
            <i></i>
            <p class="c000 font-xb">伊起赚</p>
          </div>
          <div class="my-index-money-txt">
            <p>昨日成交预估金额</p>
            <span class="ff6900">￥{{yesterdayRecharge | price}}</span>
          </div>
          <div class="ui-right-arrow"></div>
        </div>
      </div>
      <div class="my-finance">
        <div class="my-finance-item" @click="pageAction('/my/my-income.html')">
          <i class="icon1"></i>
          <span>我的收入</span>
        </div>
        <div class="my-finance-item" @click="pageAction('/my/report-center.html')">
          <i class="icon2"></i>
          <span class="c3">报表中心</span>
        </div>
      </div>
      <div class="my-index-menu" @click="pageAction('/my/my-order.html')">
        <div class="my-index-menu-wrapper">
          <i class="order-icon"></i>
          <p class="c000 font-xb">我的订单</p>
          <span class="font-s">全部订单</span>
          <div class="ui-right-arrow"></div>
        </div>
      </div>
      <div class="my-index-order">
        <div class="my-index-order-item" @click="pageAction('/my/my-order.html?t=1')">
          <i class="icon1"></i>
          <span class="c3">待付款</span>
          <strong class="my-index-tips" v-if="orderSummaryState.unpay != 0 && orderSummaryState.unpay != null" :class="{'active': orderSummaryState.unpay > 9}">{{orderSummaryState.unpay > 99 ? '99+' :  orderSummaryState.unpay}}</strong>
        </div>
        <div class="my-index-order-item" @click="pageAction('/my/my-order.html?t=2')">
          <i class="icon2"></i>
          <span class="c3">待发货</span>
          <strong class="my-index-tips" v-if="orderSummaryState.undelivery != 0 && orderSummaryState.undelivery != null" :class="{'active': orderSummaryState.undelivery > 9}">{{orderSummaryState.undelivery > 99 ? '99+' :  orderSummaryState.undelivery}}</strong>
        </div>
        <div class="my-index-order-item" @click="pageAction('/my/my-order.html?t=3')">
          <i class="icon3"></i>
          <span class="c3">待收货</span>
          <strong class="my-index-tips" v-if="orderSummaryState.unreceive != 0 && orderSummaryState.unreceive != null" :class="{'active': orderSummaryState.unreceive > 9}">{{orderSummaryState.unreceive > 99 ? '99+' :  orderSummaryState.unreceive}}</strong>
        </div>
        <div class="my-index-order-item" @click="pageAction('/my/my-order.html?t=4')">
          <i class="icon4"></i>
          <span class="c3">待评价</span>
          <strong class="my-index-tips" v-if="orderSummaryState.unEvaluate != 0 && orderSummaryState.unEvaluate != null" :class="{'active': orderSummaryState.unEvaluate > 9}">{{orderSummaryState.unEvaluate > 99 ? '99+' :  orderSummaryState.unEvaluate}}</strong>
        </div>
        <div class="my-index-order-item" @click="pageAction('/my/aftersale-list.html')">
          <i class="icon5"></i>
          <span class="c3">退换货</span>
          <strong class="my-index-tips" v-if="orderSummaryState.isAfter != 0 && orderSummaryState.isAfter != null" :class="{'active': orderSummaryState.isAfter > 9}">{{orderSummaryState.isAfter > 99 ? '99+' :  orderSummaryState.isAfter}}</strong>
        </div>
      </div>
      <div class="my-index-menu" @click="routerAction('/my/wallet')">
        <div class="my-index-menu-wrapper">
          <i class="money-icon"></i>
          <p class="c000 font-xb">我的钱包</p>
          <span class="font-s">查看全部</span>
          <div class="ui-right-arrow"></div>
        </div>
      </div>
      <div class="my-index-discount">
        <div class="my-index-discount-item" v-if="yCardBalanceState" @click="pageAction('/pay/youdianCard.html')">
          <span class="ff6900" v-if="loggedIn">{{(walletInfo.yCardBalance || 0) | price}}</span>
          <span class="ff6900" v-else>- -</span>
          <p class="c3">悠点卡</p>
        </div>
        <div class="my-index-discount-item" @click="pageAction('/my/pointCards-list.html')">
          <span class="ff6900" v-if="loggedIn">{{(walletInfo.eCardBalance || 0) | price}}</span>
          <span class="ff6900" v-else>- -</span>
          <p class="c3">伊点卡</p>
        </div>
        <div class="my-index-discount-item" @click="pageAction('/my/integral.html')">
          <span class="ff6900" v-if="loggedIn">{{(walletInfo.point || 0) | price}}</span>
          <span class="ff6900" v-else>- -</span>
          <p class="c3">积分</p>
        </div>
        <div class="my-index-discount-item" @click="pageAction('/my/coupons-list.html')">
          <span class="ff6900" v-if="loggedIn">{{(walletInfo.coupon || 0) | price}}</span>
          <span class="ff6900" v-else>- -</span>
          <p class="c3">优惠券</p>
        </div>
      </div>
      <div class="my-index-column clearfix">
        <div class="my-index-column-item" @click="routerAction('/my/group/list')">
          <i class="icon1"></i>
          <span>我的团</span>
        </div>
        <div class="my-index-column-item" @click="pageAction('/my/pickup-goods.html')">
          <i class="icon2"></i>
          <span>提货券</span>
        </div>
        <div class="my-index-column-item" @click="pageAction('/my/address-manage.html')">
          <i class="icon3"></i>
          <span>收货地址</span>
        </div>
        <div class="my-index-column-item" @click="routerAction('/my/buy/list')">
          <i class="icon4"></i>
          <span>常购清单</span>
        </div>
        <div class="my-index-column-item" @click="pageAction('/my/collect.html')">
          <i class="icon5"></i>
          <span>我的收藏</span>
        </div>
        <div class="my-index-column-item" @click="routerAction('/my/evaluate')">
          <i class="icon6"></i>
          <span>我的评价</span>
        </div>
        <div class="my-index-column-item" @click="goOneWord">
          <i class="icon7"></i>
          <span>一句话福利</span>
        </div>
        <div class="my-index-column-item" @click="pageAction('/specialFun/findFreePoint.html')">
          <i class="icon8"></i>
          <span>查询伊点卡</span>
        </div>
        <div class="my-index-column-item" @click="pageAction('/specialFun/findShop.html')">
          <i class="icon9"></i>
          <span>查询门店</span>
        </div>
        <div class="my-index-column-item" @click="goCustomService">
          <i class="icon10"></i>
          <span>在线客服</span>
        </div>
        <div class="my-index-column-item" @click="pageAction('/joinus/joinus.html')">
          <i class="icon11"></i>
          <span>加盟来伊份</span>
        </div>
        <div class="my-index-column-item" @click="pageAction('/my/my-awards.html')">
          <i class="icon12"></i>
          <span>中奖纪录</span>
        </div>
        <div class="my-index-column-item" @click="pageAction('/VAT/vat.html')">
          <i class="icon13"></i>
          <span>增票资质</span>
        </div>
        <div class="my-index-column-item" @click="pageAction('/order/invoice/list')">
          <i class="icon14"></i>
          <span>我的发票</span>
        </div>
      </div>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script type="text/javascript">

  import AppFooter from '@/components/common/footer'

  import * as Model from '@/model/index'

  import config from '@/config/index'

  import utils from '@/widget/utils'

  import store from '@/widget/store'

  export default {
    data () {
      return {
        title: '我的',
        pageView: false,
        loggedIn: utils.loggedIn(),
        userInfo:  {},
        walletInfo: {},
        yCardBalanceState: false,
        yesterdayRecharge: 0, //昨日收入
        orderSummaryState: {},
        kfConfig: {},
        readyMessage: false,
        readyCount: 0,
        serviceStatus: -1,
        uid: '',
        crmInfo: []
      }
    },
    components: {
      AppFooter
    },
    methods: {
      pageAction (url) {
        location.href = url
      },
      routerAction (url) {

        this.$router.push(url)
      },
      goOneWord () {
        if (this.loggedIn) {
          const ut = utils.getUserToken()
          const hostName = window.encodeURIComponent(location.origin)
          location.href =  config.redPacket + `/wap/wordgetcoupon.html?session=${ut}&source=${hostName}`
        } else {
          location.href = '/login.html?from=/my/home.html'
        }
      },
      /**
       * 获取用户信息
       */
      getUserInfo () {
        Model.getUserInfo({
          type: 'GET',
          ignoreLogin: true
        }).then((result) => {
          const data = result.data
          this.$hideLoading()
          this.pageView = true
          if (result.code == 0 && data) {
            store.set('kf_head_pic', data['url100x100'], 'session');
            this.userInfo = data
          }
        })
      },
      /**
       * 获取昨日日期
       * @param {Number} dayCount
       */
      getYesterday (dayCount) {

        const date = new Date()
        const y = date.getFullYear()
        date.setDate(date.getDate() + dayCount)//获取dayCount天后的日期
        let m = date.getMonth() + 1 //获取当前月份的日期
        let d = date.getDate()
        if (m < 10) {
          m = '0' + m
        }
        if (d < 10) {
          d = '0' + d
        }
        return y + '-' + m + '-' + d
      },
      /**
       * 获取用户钱包信息
       */
      getWalletInfo () {
        Model.getWalletInfo({
          type: 'GET',
          ignoreLogin: true,
          data: {
            isECard: 1,
            isYCard: 1,
            isBean: 1,
            isCoupon: 1,
            isPoint: 1
          }
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            this.walletInfo = data
            if (data.yCardBalance !== null) {
              this.yCardBalanceState = true
            }
          }
        })
      },
      /**
       * 获取昨日收入
       */
      getUserRecharge () {
        Model.getUserRecharge({
          type: 'GET',
          ignoreLogin: true,
          data: {
            startDate: this.getYesterday(-1),
            endDate: this.getYesterday(-1)
          }
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            this.yesterdayRecharge = data.preCommissionAmount
          }
        })
      },
      /**
       * 获取订单状态
       */
      orderSummary () {
        Model.orderSummary({
          type: 'GET',
          ignoreLogin: true,
          data: {
            sysSource: 'ody'
          }
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            this.orderSummaryState = data
          }
        })
      },
      /**
       * 获取未读消息个数
       */
      getMessageInfo () {
        Model.getMessageInfo({
          type: 'GET',
          ignoreLogin: true,
          data: {
            status: 0
          }
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            this.readyMessage = true
            const readyCount = data[0].unReadMsgCount
            if (data && data.length > 0 && readyCount > 0) {
              this.readyCount += readyCount
            }
          }
        })
      },
      //唤起app客服
      goCustomService  () {
        if (utils.weixin()) {
          this.$showModal({
            content: '请点击右上角菜单选择“在浏览器打开',
            confirmText: '知道了'
          })
        } else {
          const username = store.get('username', 'local')
          if (!this.loggedIn || !username) {
            const pathURL = window.encodeURIComponent(utils.getRelatedUrl())
            location.href = `/login.html?from=${pathURL}`
            return
          }
          this._getServiceStatus()
        }
      },
      // 获取客服版本 默认淘宝客服 1 七鱼客服
      _getServiceStatus: function () {
        if (this.serviceStatus == '0' || this.serviceStatus == '1') {
          this._openService()
        } else {
          Model.getIMAppModule({
            type: 'GET',
            data: {
              token: utils.getUserToken(),
              terminal: 'H5'
            }
          }).then((result) => {
            const data = result.data
            if (!data || data.length === 0) {
              return
            }
            data.forEach((item) => {
              if (item.type == '2') {
                this.serviceStatus = item.status
              }
            })
            this._openService()
          })
        }
      },
      _openService: function () {
        if (this.serviceStatus == '1') {
          if(this.uid) {
            this._openCustom()
          } else {
            this._getUid()
            .then(() => {
              this._openCustom()
            })
          }
        } else {
          this._openTaoBaoIm()
        }
      },
      /**
       * 获取信息uid
       * @private
       */
      _getUid () {
        let appVersion = ''
        if (utils.isApp()) {
          appVersion = utils.getUaParams().version || ''
        }
        return Model.getCustomerInfo({
          type: 'POST',
          data: {
            appVersion
          }
        }).then((result) => {
          const data = result.data

          if (!data) {
            return
          }
          const {
            uid,
          } = data
          this.uid = uid || ''
          this.crmInfo = data.data || ''
        })

      },
      // 打开七鱼客服
      _openCustom() {
        const QYKeFuKey = config.QYKeFuKey
        utils.loadScript(`https://qiyukf.com/script/${QYKeFuKey}.js`, () => {
          if (ysf) {
            ysf.config({
              uid: this.uid,
              data: JSON.stringify(this.crmInfo),
              success (){     // 成功回调
                ysf.open()
              },
              error: (error) => {       // 错误回调
                console.log(error)
                this.$toast("连接中，请稍后再试...")
              }
            })
          }
        })
      },
      /**
       * 获取阿里百川配置参数
       * @returns {PromiseLike<T> | Promise<T> | *}
       */
      getBaichuanConfig () {
        const userName =  store.get('username', 'local')
        return Model.getBaichuanConfig({
          type: 'GET',
          data: {
            userId: userName
          }
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            const {
              appKey,
              password,
              receiveId
            } = data
            if (data && appKey && password && receiveId) {
              this.kfConfig = {
                appKey,
                password,
                receiveId
              }
            }
          }
          return result
        })
      },
      _openTaoBaoIm () {
        const {
          appKey,
          password,
          receiveId
        } = this.kfConfig
        if (!appKey) {
          this.getBaichuanConfig()
          .then(() => {
            location.href = `/kf.html?ak=${appKey}&pwd=${password}&rid=${receiveId}`
          })
        } else {
          location.href = `/kf.html?ak=${appKey}&pwd=${password}&rid=${receiveId}`
        }
      }
    },
    beforeCreate () {
      document.body.style.paddingTop = 0
    },
    created () {
      this.$showLoading()
      this.getUserInfo()
      this.getWalletInfo()
      this.orderSummary()
      if (this.loggedIn) {
        this.getMessageInfo()
      }
    }
  }

</script>

<style lang="scss">
  .my-index-action{
    height: .9rem;
    display: flex;
    span{
      display: flex;
      align-items: center;
    }
    i{
      display: flex;
      align-items: center;
    }
    .my-index-login{
      padding-left: .3rem;
      padding-right: .1rem;
    }
    .my-index-reg{
      padding-left: .1rem;
      padding-right: .3rem;
    }
  }
  .my-index-column{
    margin-top: .2rem;
    margin-bottom: 1.5rem;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
  }
  .my-index-column-item{
    width: 25%;
    padding: .3rem 0;
    text-align: center;
    border-right: .01rem solid #e0e0e0;
    border-bottom: .01rem solid #e0e0e0;
    &:nth-child(4n) {
      border-right: 0;
    }
    i{
      width: .6rem;
      height: .6rem;
      background: url(./images/my_icon.png) no-repeat;
      background-size: 3rem auto;
      display: block;
      margin: 0 auto;
    }
    .icon1{
      background-position: -1.1rem -1.06rem;
    }
    .icon2 {
      background-position: -1.8rem -1.1rem;
    }
    .icon3 {
      background-position: -2.42rem -1.15rem;
    }
    .icon4 {
      background-position: -.03rem -1.51rem;
    }
    .icon5 {
      background-position: -.78rem -1.71rem;
    }
    .icon6 {
      background-position: -1.55rem -1.75rem;
    }
    .icon7 {
      background-position: -2.32rem -1.78rem;
    }
    .icon8 {
      background-position: -.05rem -2.2rem;
    }
    .icon9 {
      background-position: -.76rem -2.39rem;
    }
    .icon10 {
      background-position: -1.51rem -2.45rem;
    }
    .icon11 {
      background-position: -2.32rem -2.37rem;
    }
    .icon12 {
      background-position: -.03rem -2.81rem;
    }
    .icon13 {
      background-position: -.72rem -2.32rem;
    }
    .icon14 {
      background-position: -1.45rem -3.06rem;
    }
    span{
      color: #333;
      padding-top: .1rem;
      display: block;
      text-align: center;
    }
  }
  .my-index-discount{
    display: flex;
    padding: .3rem 0;
    background: #fff;
    display: flex;
    justify-content: space-evenly;
  }
  .my-index-discount-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    span{
      font-size: .4rem;
    }
    p{
      padding-top: .1rem;
    }
  }
  .my-index-order{
    padding: .3rem 0;
    display: flex;
    background: #fff;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .my-index-order-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 1rem;
    i{
      width: .5rem;
      height: .5rem;
      background: url(./images/my_icon.png) no-repeat;
      background-size: 3rem auto;
      margin-bottom: .1rem;
    }
    .icon1{
      background-position: -1.4rem -.55rem;
    }
    .icon2{
      background-position: -1.94rem -.57rem;
    }
    .icon3{
      background-position: -2.47rem -.6rem;
    }
    .icon4{
      background-position: .01rem -.95rem;
    }
    .icon5{
      background-position: -.54rem -.96rem;
    }
    .my-index-tips{
      height: .32rem;
      padding: 0 .09rem;
      border-radius: 50%;
      color: #fff;
      line-height: .32rem;
      display: block;
      position: absolute;
      background: #ff6900;
      top: -.15rem;
      right: .1rem;
      &.active{
        padding: 0 .15rem;
        border-radius: .15rem;
        right: .1rem;
      }
    }
  }

  .my-index-menu{
    margin-top: .2rem;
    background: #fff;
    padding-left: .3rem;
  }
  .my-index-menu-wrapper{
    padding-right: .3rem;
    height: .94rem;
    display: flex;
    align-items: center;
    border-bottom: .01rem solid #ddd;
    i{
      background: url(./images/my_icon.png) no-repeat;
      background-size: 3rem auto;
      margin-right: .2rem;
      width: .31rem;
      height: .38rem;
    }
    .order-icon{
      background-position: -.74rem -.57rem;
    }
    .money-icon{
      background-position: -1.07rem -.57rem;
    }
    span{
      flex: 1;
      color: grey;
      display: flex;
      justify-content: flex-end;
      padding-right: .1rem;
    }
  }
  .my-finance{
    padding: .3rem 0;
    background: #fff;
    display: flex;
    justify-content: space-evenly;
  }
  .my-finance-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    i{
      width: .6rem;
      height: .6rem;
      background: url(./images/my_icon.png) no-repeat;
      background-size: 3rem auto;
    }
    span{
      padding-top: .15rem;
    }
    .icon1{
      background-position: -2.41rem 0;
    }
    .icon2{
      background-position: -1.75rem .02rem;
    }
    .icon3{
      background-position: -1.75rem .02rem;
    }
  }
  .my-index-money-txt{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    flex: 1;
    padding: .1rem .2rem .1rem;
    p{
      color: grey;
    }
  }
  .my-index-money-wrapper{
    height: .94rem;
    display: flex;
    align-items: center;
    border-bottom: .01rem solid #ddd;
    padding-right: .3rem;
  }
  .my-index-money{
    background: #fff;
    padding-left: .3rem;
  }
  .my-index-money-icon{
    display: flex;
    align-items: center;
    i{
      width: .32rem;
      height: .36rem;
      background: url(./images/my_icon.png) no-repeat -.4rem -.58rem;
      background-size: 3rem auto;
      margin-right: .2rem;
    }
    p{
      color: #000;
    }
  }
  .my-index-money-bg{
    height: .84rem;
    display: flex;
    justify-content: center;
    background: url(./images/sales-bg.png) no-repeat;
    background-size: 100% auto;
    img{
      margin-top: -.14rem;
      width: 1.3rem;
      height: 1.1rem;
    }
  }
  .my-vip-pic{
    width: 1.28rem;
    height: 1.28rem;
    background: url(./images/logo-laiyifen.png) no-repeat;
    background-size: 1.28rem auto;
    border-radius: 50%;
    margin: 0 .4rem;
  }
  .my-index-name{
    height: .9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .my-index-qrcode{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: .6rem;
    border-top-left-radius: .3rem;
    border-bottom-left-radius: .3rem;
    background: #ff4b14;
    display: flex;
    align-items: center;
    padding: 0 .2rem;
    i{
      width: .32rem;
      height: .3rem;
      background: url(./images/my_icon.png) no-repeat 0 -.58rem;
      background-size: 3rem auto;
      margin-right: .1rem;
    }
  }
  .my-index-personal{
    height: 1.28rem;
    display: flex;
    width: 60%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
  }
  .my-vip-txt{
    display: flex;
    flex-direction: column;
    p{
      width: .84rem;
      text-align: center;
      height: .4rem;
      line-height: .4rem;
      border-radius: .3rem;
      background: #ffc600;
      color: #fff;
    }
    span{
      padding-top: .1rem;
      color: #fff;
      text-align: center;
    }
  }
  .my_signIn_icon{
    padding: .3rem;
    display: flex;
    i{
      width: .42rem;
      height: .42rem;
      background: url(./images/my_icon.png) no-repeat -.68rem -.1rem;
      background-size: 3rem auto;
    }
  }
  .my_message_icon{
    display: flex;
    padding: .3rem;
    position: relative;
    i{
      width: .42rem;
      height: .42rem;
      background: url(./images/my_icon.png) no-repeat -.1rem -.11rem;
      background-size: 3rem auto;
    }
    .my-message-tips{
      height: .32rem;
      padding: 0 .09rem;
      border-radius: 50%;
      color: #fff;
      line-height: .32rem;
      display: block;
      position: absolute;
      background: #ff6900;
      top: .15rem;
      right: .15rem;
      &.active{
        padding: 0 .1rem;
        border-radius: .15rem;
        right: .15rem;
      }
    }
  }
  .my-wrapper-icon{
    display: flex;
  }
  .my_setting_icon{
    display: flex;
    padding: .3rem .3rem .3rem 0;
    i{
      width: .42rem;
      height: .42rem;
      background: url(./images/my_icon.png) no-repeat -1.27rem -.11rem;
      background-size: 3rem auto;
    }
  }
  .my-index-title{
    height: 1.08rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

  }
  .my-index-info{
    background: linear-gradient(top,#ffb300,#ff6c00);
    background: -webkit-linear-gradient(top,#ffb300,#ff6c00);
  }
</style>
