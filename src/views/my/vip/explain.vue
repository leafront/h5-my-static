<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
    </AppHeader>
    <div class="scroll-view-wrapper white-view" :class="{'visibility': pageView}">
      <div class="my-vip-explain">
        <div class="my-vip-explain-line"></div>
        <div class="my-vip-explain-item" @click="checkList(index)" :key="index"  :class="{'active': userLevel == index}" v-for="(item,index) in levelList">
          <p>{{item}}</p>
          <span></span>
        </div>
      </div>
      <div class="my-vip-explain-des">
        <i class="my-vip-icon"></i>
        <div class="my-vip-explain-txt">
          <h4 class="c3">{{interestsList[userLevel].level}} <span class="font-xs">{{interestsList[userLevel].title}}</span></h4>
          <div class="my-vip-des-item" :key="i" v-for="(item,i) in interestsList[userLevel].des">
            <h5>{{item.title}}<i class="my-vip-tips" v-if="item.icon"></i></h5>
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'
  import utils from '@/widget/utils'

  export default {
    data () {
      return {
        isBorder: true,
        title: '会员权益说明',
        pageView: true,
        levelList: ['VIP1','VIP2','VIP3','VIP4','VIP5'],
        userLevel: 0,
        interestsList: [{
          level: 'VIP1权益',
          tile: '消费0~200元获得',
          des: [{
            title: '1.新人礼包',
            content: '新人注册，即送88元优惠券。'
          }, {
            title: '2.生日礼券（9折）',
            content: '会员生日当月可获赠9折优惠券。'
          }, {
            title: '3.门店会员价',
            content: '会员出示APP会员码在门店消费，指定商品可享受会员折扣价格。'
          }, {
            title: '4.积分福利',
            content: '会员在门店每消费10元可获1积分（如未消费满10元，不返积分）；会员在门店出示会员码，每10积分即可抵扣现金1元；会员可在积分商城使用积分兑换奖品。'
          }, {
            title: '5.会员庆典',
            content: '会员可参加“门店/APP”内会员专属庆典/折扣，活动期间会员可领取活动优惠券或参与抽奖活动，详细规则以各档活动海报为准。'
          },{
            title: '6.会员活动',
            content: '会员有机会参加来伊份筹办的不定期明星见面会及会员旅行活动，详情以各档活动海报为准。'
          }]
        },{
          level: 'VIP2权益',
          tile: '消费201~500元获得',
          des: [{
            title: '1.新人礼包',
            content: '新人注册，即送88元优惠券。'
          }, {
            title: '2.生日礼券（9折）',
            content: '会员生日当月可获赠9折优惠券。'
          }, {
            title: '3.门店会员价',
            content: '会员出示APP会员码在门店消费，指定商品可享受会员折扣价格。'
          }, {
            title: '4.积分福利',
            content: '会员在门店每消费10元可获1积分（如未消费满10元，不返积分）；会员在门店出示会员码，每10积分即可抵扣现金1元；会员可在积分商城使用积分兑换奖品。'
          }, {
            title: '5.会员庆典',
            content: '会员可参加“门店/APP”内会员专属庆典/折扣，活动期间会员可领取活动优惠券或参与抽奖活动，详细规则以各档活动海报为准。'
          },{
            title: '6.会员活动',
            content: '会员有机会参加来伊份筹办的不定期明星见面会及会员旅行活动，详情以各档活动海报为准。'
          }]
        },{
          level: 'VIP3权益',
          tile: '消费501~1000元获得',
          des: [{
            title: '1.新人礼包',
            content: '新人注册，即送88元优惠券。'
          }, {
            title: '2.生日礼券（8.8折）',
            content: '会员生日当月可获赠8.8折优惠券。',
            icon: true
          }, {
            title: '3.门店会员价',
            content: '会员出示APP会员码在门店消费，指定商品可享受会员折扣价格。'
          }, {
            title: '4.积分福利（1.1倍）',
            content: '会员在门店每消费可按1.1倍积分返还（如未消费满10元，不返积分）；会员在门店出示会员码，每10积分即可抵扣现金1元；会员可在积分商城使用积分兑换奖品',
            icon: true
          }, {
            title: '5.会员庆典',
            content: '会员可参加“门店/APP”内会员专属庆典/折扣，活动期间会员可领取活动优惠券或参与抽奖活动，详细规则以各档活动海报为准。'
          },{
            title: '6.会员活动',
            content: '会员有机会参加来伊份筹办的不定期明星见面会及会员旅行活动，详情以各档活动海报为准。'
          }]
        }, {
          level: 'VIP4权益',
          tile: '消费1001~2000元获得',
          des: [{
            title: '1.新人礼包',
            content: '新人注册，即送88元优惠券。'
          }, {
            title: '2.生日礼券（8.8折）',
            content: '会员生日当月可获赠8.8折优惠券。'
          }, {
            title: '3.门店会员价',
            content: '会员出示APP会员码在门店消费，指定商品可享受会员折扣价格。'
          }, {
            title: '4.积分福利（1.1倍）',
            content: '会员在门店每消费可按1.1倍积分返还（如未消费满10元，不返积分）；会员在门店出示会员码，每10积分即可抵扣现金1元；会员可在积分商城使用积分兑换奖品'
          }, {
            title: '5.会员庆典',
            content: '会员可参加“门店/APP”内会员专属庆典/折扣，活动期间会员可领取活动优惠券或参与抽奖活动，详细规则以各档活动海报为准。'
          },{
            title: '6.会员活动',
            content: '会员有机会参加来伊份筹办的不定期明星见面会及会员旅行活动，详情以各档活动海报为准。'
          }]
        }, {
          level: 'VIP5权益',
          tile: '消费2000元以上获得',
          des: [{
            title: '1.新人礼包',
            content: '新人注册，即送88元优惠券。'
          }, {
            title: '2.生日礼券（8.5折）',
            content: '会员生日当月可获赠8.5折优惠券。',
            icon: true
          }, {
            title: '3.门店会员价',
            content: '会员出示APP会员码在门店消费，指定商品可享受会员折扣价格。'
          }, {
            title: '4.积分福利（1.2倍）',
            content: '会员在门店每消费可按1.2倍积分返还（如未消费满10元，不返积分）；会员在门店出示会员码，每10积分即可抵扣现金1元；会员可在积分商城使用积分兑换奖品',
            icon: true
          }, {
            title: '5.会员庆典',
            content: '会员可参加“门店/APP”内会员专属庆典/折扣，活动期间会员可领取活动优惠券或参与抽奖活动，详细规则以各档活动海报为准。'
          },{
            title: '6.会员活动',
            content: '会员有机会参加来伊份筹办的不定期明星见面会及会员旅行活动，详情以各档活动海报为准。'
          }]
        }]
      }
    },
    components: {
      AppHeader
    },
    methods: {
      /**
       * 页面跳转
       * @param {String} url
       */
      pageAction (url) {
        this.$router.push(url)
      },
      /**
       * 切换会员等级显示内容
       * @param {Number} val
       */
      checkList (val) {
        const userLevel = val + 1
        this.userLevel = val
        history.replaceState(null,null,`/my/vip/explain?level=${userLevel}`)
      }
    },
    created () {
      const userLevel = utils.query('level')
      if (userLevel > 0) {
        this.userLevel = userLevel - 1 >= 4 ? 4 : userLevel - 1
      } else {
        this.userLevel = 0
      }
    }
  }

</script>

<style lang="scss">
  .my-vip-explain-des{
    display: flex;
    background: #fff;
    padding: .56rem .3rem 0;
    .my-vip-icon{
      width: .5rem;
      height: .5rem;
      background: url(./images/vip-interests.png) no-repeat;
      background-size: .5rem auto;
    }
  }
  .my-vip-explain-txt{
    font-size: .36rem;
    flex: 1;
    padding-left: .1rem;
    h4{
      padding-bottom: .16rem;
    }
    h5{
      font-size: .32rem;
      line-height: .5rem;
      color: #333;
      display: flex;
      align-items: center;
      .my-vip-tips{
        width: .4rem;
        height: .4rem;
        background: url(./images/vip-tips.png) no-repeat;
        background-size: .4rem auto;
      }
    }
    p{
      font-size: .28rem;
      color: #333;
      padding-bottom: .4rem;
    }
  }
  .my-vip-explain{
    height: 1.76rem;
    background: linear-gradient(to bottom,#FF8E0C,#FF5E28);
    padding: 0 .1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    .my-vip-explain-line{
      width: 5.35rem;
      height: .04rem;
      background: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
  .my-vip-explain-item{
    width: .8rem;
    height: .8rem;
    padding: .04rem;
    background: #fff;
    border-radius: 50%;
    position: relative;
    z-index:10;
    transition: all .3s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    p{
      width: 100%;
      height: 100%;
      background: #DADADA;
      border-radius: 50%;
      font-size: .22rem;
      color: #fff;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.active{
      width: 1.1rem;
      height: 1.1rem;
      p{
        background: linear-gradient(to bottom,#FFCF00,#FF9600);
        font-size: .3rem;
      }
      span{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -.5rem;
        width: 0;
        height: 0;
        border-left: .18rem solid transparent;
        border-right: .18rem solid transparent;
        border-top: .2rem solid #FF5E28;
      }
    }
  }
</style>
