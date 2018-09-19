<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
    </AppHeader>
    <div class="scroll-view-wrapper white-view" id="my-vip-scroll" :class="{'visibility': pageView}">
      <div class="my-vip-user">
        <div class="my-vip-info">
          <img src="http://cdn.oudianyun.com/lyf/prod/frontier-guide/1536316815859_6008_42.png"/>
          <div class="my-vip-user-txt">
            <div class="my-vip-user-info">
              <span class="font cfff" v-if="userInfo.mobile">{{userInfo.mobile | hideMobile}}</span>
              <p>V1会员</p>
            </div>
            <div class="my-vip-integral">
              <p>会员积分：{{walletInfo.point}}</p>
            </div>
          </div>
          <div class="my-vip-user-level" @click="pageAction('/my/vip/rule')">
            <span>等级说明</span>
          </div>
        </div>
      </div>
      <Banner :bannerList="vip_banner"></Banner>
      <div class="my-vip-index-des">
        <div class="my-vip-title">
          <h5 class="font-xb c3">会员权益</h5>
          <span class="font-s c9">RIGHTS</span>
        </div>
        <div class="my-vip-des-pic">
          <img :src="vip_description"/>
        </div>
        <div class="my-vip-des-btn" @click="pageAction('/my/vip/explain')">
          <span class="font-b cfff">查看权益详情</span>
        </div>
      </div>
      <div class="my-vip-title">
        <h5 class="font-xb c3">精选权益</h5>
        <span class="font-s c9">BEST</span>
      </div>
      <div class="my-vip-best">
        <img :src="item.imageUrl" v-for="item in vip_interests"/>
      </div>
      <div class="my-vip-title">
        <h5 class="font-xb c3">会员最爱买</h5>
        <span class="font-s c9">HOT</span>
      </div>
      <LazyLoad :list="rankList" :options="{ele:'pic-lazyLoad',scrollEle: 'my-vip-scroll'}">
        <div class="my-vip-cart">
          <div class="my-vip-cart-item" v-for="item in rankList">
            <div class="pic-lazyLoad my-vip-cart-pic" :data-src="item['url300x300']"></div>
            <p class="ellipsis c3">{{item.name}}</p>
            <div class="my-vip-cart-price">
              <span class="font" v-if="rankPrice[item.mpId]">¥{{rankPrice[item.mpId].price}}</span>
              <strong class="c9" v-if="rankPrice[item.mpId]">¥{{rankPrice[item.mpId].marketPrice}}</strong>
              <div class="my-vip-cart-add-wrapper">
                <div class="my-vip-cart-add">
                  <i></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LazyLoad>
      <div class="my-vip-cart-bottom">
        <p class="c9">— Hi ! 你碰到我的底线了 —</p>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import * as Model from '@/model/vip'

  import Banner from '@/components/vip/banner'

  import LazyLoad from '@/components/widget/lazyLoad'

  export default {
    data () {
      return {
        isBorder: true,
        title: '会员中心',
        pageView: true,
        vip_banner: [],
        vip_description: '',
        vip_interests: [],
        userInfo: {},
        walletInfo: {},
        rankList: [],
        rankPrice: {}
      }
    },
    components: {
      AppHeader,
      Banner,
      LazyLoad
    },
    methods: {
      pageAction (url) {
        this.$router.push(url)
      },
      getDolphinList () {
        Model.getDolphinList({
          type: 'GET',
          data: {
            pageCode: 'H5_USER_VIP',
            adCode: 'vip_banner,vip_description,vip_interests'
          }
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            const {
              vip_banner,
              vip_description,
              vip_interests
            } = data
            this.vip_banner = vip_banner
            this.vip_description = vip_description.length && vip_description[0].imageUrl
            this.vip_interests = vip_interests
          } else {
            this.$toast(result.message)
          }
        })
      },
      /**
       * 获取商品排行榜
       */
      getRankList () {
        Model.getRankList({
          type: 'GET',
          data: {
            type: 1
          }
        }).then((result) => {
          const mpIds = []
          const data = result.data
          if (result.code == 0 && data) {
            const rankList = data.listObj
            if (rankList && rankList.length) {
             const rankListArr = rankList.slice(0,20)
             this.rankList = rankListArr
             rankListArr.forEach((item) => {
               mpIds.push(item.mpId)
             })
            }
          }
          return mpIds
        }).then((mpIds) => {
          if (mpIds && mpIds.length) {
            this.getRankPrice(mpIds)
          }
        })
      },
      /**
       * 获取商品排行价格
       */
      getRankPrice (mpIds) {
        if (!mpIds) {
          return
        }
        Model.getRankPrice({
          type: 'GET',
          data: {
            mpIds
          }
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            const plist = data.plist
            if (plist && plist.length) {
              const rankPrice = {}
              plist.forEach((item) => {
                rankPrice[item.mpId] = {
                  marketPrice: item.marketPrice,
                  price: item.price
                }
              })
              this.rankPrice = rankPrice
            }
          }
        })
      },
      /**
       * 获取用户信息
       */
      getUserInfo () {
        return Model.getUserInfo({
          type: 'GET',
          ignoreLogin: true
        }).then((result) => {
          const data = result.data
          if (result.code == 0 && data) {
            this.userInfo = data
          }
          return result
        })
      },
      /**
       * 获取用户钱包信息
       */
      getWalletInfo () {
        return Model.getWalletInfo({
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
          }
          return result
        })
      },
      /**
       * 获取会员个人信息
       */
      getUserVipInfo () {
       // this.$showLoading()
        Promise.all([
          this.getUserInfo(),
          this.getWalletInfo()
        ]).then((result) => {
          if (result) {
            let isSendSuccess = result.every((item) => {
              return item.code == 0
            })
            if (isSendSuccess) {
              this.$hideLoading()
              this.pageView = true
            }
          }
        })
      }
    },
    created () {
      this.getUserVipInfo()
      this.getDolphinList()
      this.getRankList()
    }
  }

</script>



<style lang="scss">
  .my-vip-cart-bottom{
    padding-top: .32rem;
    padding-bottom: .16rem;
    display: flex;
    justify-content: center;
  }
  .my-vip-cart-price{
    position: relative;
    padding-top: .16rem;
    span{
      color: #FF6D00;
    }
    strong{
      padding-left: .1rem;
    }
  }
  .my-vip-cart-add-wrapper{
    position: absolute;
    right: .2rem;
    top:0;
    padding: .16rem .2rem .2rem .3rem;
  }
  .my-vip-cart-add{
    width: .32rem;
    height: .32rem;
    border-radius: 50%;
    background: linear-gradient(left,#FFAA2B,#FF6A22);
    box-shadow:0 .04rem .06rem 0 rgba(255,154,0,0.2);
    position: relative;
    &:before{
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: .18rem;
      height:.03rem;
      background: #fff;
      border-radius: .05rem;
    }
    &:after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: .03rem;
      height:.18rem;
      background: #fff;
      border-radius: .05rem;
    }
  }
  .my-vip-cart{
    padding: 0 .38rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .my-vip-cart-item{
    padding-top: .24rem;
    padding-bottom: .12rem;
    width: 3.22rem;
    .my-vip-cart-pic{
      width: 3.22rem;
      height: 3.22rem;
    }
    p{
      padding-top: .16rem;
      line-height: .34rem;
      width: 100%;
    }
  }
  .my-vip-best{
    padding: 0 .3rem .48rem;
    img{
      margin-top: .16rem;
      width:100%;
      height: 2.16rem;
    }
  }
  .my-vip-des-btn{
    padding: .3rem 0;
    display: flex;
    justify-content: center;
    span{
      border-radius: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 5.8rem;
      height: .86rem;
      background: linear-gradient(left, #FFAA2B, #FF6A22);
      box-shadow: 0 .02rem .1rem #FF9A00;
    }
  }
  .my-vip-index-des{
    padding-top: .16rem;
  }
  .my-vip-des-pic{
    min-height: 4.65rem;
    img {
      width: 100%;
    }
  }
  .my-vip-title{
    padding: 0 .3rem;
    display: flex;
    height: .76rem;
    align-items: center;
    span{
      padding-left: .1rem;
    }
  }
  .my-vip-user-level{
    padding: .14rem 0 .3rem .3rem;
    span{
      width: 1.08rem;
      height: .4rem;
      background:rgba(173,75,25,0.33);
      display: flex;
      border: .02rem solid rgba(106,26,26,0.34);
      border-radius: .19rem;
      justify-content: center;
      align-items: center;
      font-size: .2rem;
      color: rgba(255,255,255,.85)
    }
  }
  .my-vip-user {
    height: 2.1rem;
    padding: 0 .3rem;
    background: linear-gradient(left, #FF8E0C, #FF5E28);
    display: flex;
    align-items: center;
  }
  .my-vip-user-info{
    display: flex;
    align-items: center;
    height: .42rem;
    p{
      margin-left: .2rem;
      height: .3rem;
      padding: 0 .1rem;
      line-height: .3rem;
      border-radius: .06rem;
      background: linear-gradient(left, #FFCF00, #FF9600);
      color: #fff;
      font-size: .2rem;
    }
  }
  .my-vip-info{
    display: flex;
    flex:1;
    background: url(./images/vip-user_bg.png) no-repeat;
    background-size: 5.32rem auto;
    padding-top: .15rem;
    padding-left: .25rem;
    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      border: .03rem solid rgba(255,255,255,.8);
    }
  }
  .my-vip-user-txt{
    padding: .14rem 0 .16rem .25rem;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }
  .my-vip-integral{
    p{
      color: #fff;
    }
  }
</style>
