<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="ui-skeleton-container" v-if="!pageView">
      <UISkeleton></UISkeleton>
    </div>
    <div class="scroll-view-wrapper white-view" id="my-vip-scroll" :class="{'visibility': pageView}">
      <div class="my-vip-user">
        <div class="my-vip-info">
          <img class="my-vip-info-pic" v-if="headerPic" @click="pageAction('/my/personal')" :src="headerPic | httpsImg"/>
          <div class="my-vip-user-txt">
            <div class="my-vip-user-info">
              <span class="font cfff" v-if="userInfo.mobile">{{userInfo.mobile | hideMobile}}</span>
              <p :class="{'icon1': userInfo.userLevel == 1,'icon2': userInfo.userLevel == 2,'icon3': userInfo.userLevel == 3,'icon4': userInfo.userLevel == 4,'icon5': userInfo.userLevel == 5,'icon6': userInfo.userLevel > 5}"></p>
            </div>
            <div class="my-vip-integral">
              <p>会员积分：{{walletInfo.point || 0}}</p>
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
        <div class="my-vip-des-pic" @click="explainAction">
          <img :src="vip_description | httpsImg" :class="{'successImg': vip_description}" class="opacityImg pic-lazyLoad"/>
        </div>
        <div class="my-vip-des-btn" @click="explainAction">
          <span class="font-b cfff">查看权益详情</span>
        </div>
      </div>
      <div class="my-vip-title">
        <h5 class="font-xb c3">精选权益</h5>
        <span class="font-s c9">BEST</span>
      </div>
      <LazyLoad :list="vip_interests" :options="{ele:'my-vip-best-pic',scrollEle: 'my-vip-scroll'}">
        <div class="my-vip-best">
          <div @click="routerAction(item.linkUrl)" :data-src="item.imageUrl | httpsImg" class="pic-lazyLoad my-vip-best-pic" v-for="item in vip_interests"></div>
        </div>
      </LazyLoad>
      <div class="my-vip-title" v-if="rankList && rankList.length">
        <h5 class="font-xb c3">会员最爱买</h5>
        <span class="font-s c9">HOT</span>
      </div>
      <LazyLoad :list="rankList" :options="{ele:'my-vip-cart-pic',scrollEle: 'my-vip-scroll'}">
        <div class="my-vip-cart" id="my-vip-cart">
          <div class="my-vip-cart-item" @click="detailAction(item.mpId)" v-for="item in rankList" v-if="rankList && rankList.length">
            <div class="pic-lazyLoad my-vip-cart-pic" :data-src="item['url300x300'] | httpsImg"></div>
            <p class="ui-ellipsis c3">{{item.name}}</p>
            <div class="my-vip-cart-price">
              <div class="my-vip-pirce-wrapper" v-if="rankPrice[item.mpId] && rankPrice[item.mpId].promotionPrice">
                <span class="font">¥{{(rankPrice[item.mpId].promotionPrice || rankPrice[item.mpId].price) | price }}</span>
                <strong class="c9">¥{{rankPrice[item.mpId].price | price}}</strong>
              </div>
              <div class="my-vip-pirce-wrapper" v-else>
                <span class="font" v-if="rankPrice[item.mpId]">¥{{rankPrice[item.mpId].price | price }}</span>
              </div>
              <div class="my-vip-cart-add-wrapper" @click="addBuyListCart($event,item)">
                <div class="my-vip-cart-add">
                  <i></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LazyLoad>
      <div class="my-vip-cart-bottom" v-if="rankList && rankList.length">
        <p class="c9">— Hi ! 你碰到我的底线了 —</p>
      </div>
      <div class="user-fixed-cart" v-if="rankList && rankList.length" @click="cartAction" :class="{'active': fixedCart}">
        <i></i>
        <span v-if="cartCount"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import UISkeleton from '@/components/vip/skeleton'

  import * as Model from '@/model/vip'

  import Banner from '@/components/vip/banner'

  import LazyLoad from '@/components/widget/lazyLoad'

  import utils from '@/widget/utils'

  import config from '@/config/index'

  import app from '@/widget/app'

  export default {
    data () {
      return {
        isBorder: true,
        title: '会员中心',
        pageView: false,
        vip_banner: [],
        vip_description: '',
        vip_interests: [],
        userInfo: {},
        headerPic: '',
        walletInfo: {},
        rankList: [],
        rankPrice: {},
        fixedCart: false,
        vipScrollEle: null,
        cartCount: 0
      }
    },
    components: {
      AppHeader,
      Banner,
      LazyLoad,
      UISkeleton
    },
    methods: {
      backAction () {
        if (utils.isApp()) {
          app.back()
        } else {
          location.href = '/index.html'
        }
      },
      /**
       * @param {String} url
       */
      pageAction (url) {
        this.$router.push(url)
      },
      /**
       * @param {String} url
       */
      routerAction (url) {
        if (url) {
          location.href = url
        }
      },
      detailAction (mpId) {
        if (utils.isApp()) {
          location.href = `lyf://productdetail?body={"mpId":${mpId}}`
        } else {
          location.href = `/detail.html?itemId=${mpId}`
        }

      },
      cartAction () {
        if (utils.isApp()) {
          location.href = 'lyf://shoppingCar'
        } else {
          location.href = '/cart.html'
        }
      },
      /**
       * 会员权益说明
       */
      explainAction () {
        const {
          userLevel
        } = this.userInfo
        if (userLevel) {
          this.$router.push(`/my/vip/explain?level=${userLevel}`)
        }
      },
      /**
       * 获取广告位
       */
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
            this.vip_interests = vip_interests
            if ( vip_description.length && vip_description[0].imageUrl) {
              this.vip_description = vip_description[0].imageUrl
            }
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
        if (!mpIds.length) {
          return
        }
	      mpIds = mpIds.join(',')
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
                  promotionPrice: item.promotionPrice,
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
        Model.getUserInfo({
          type: 'GET',
        }).then((result) => {
          const data = result.data
          if (result.code == 0 && data) {
            const headerPic = data.headPicUrl
            this.headerPic = headerPic || config.staticPath + '/my-static/images/logo-laiyifen.png'
            this.userInfo = data
            this.pageView = true
          } else {
            this.$toast(result.message)
          }
        })
      },
      /**
       * 获取用户钱包信息
       */
      getWalletInfo () {
        Model.getWalletInfo({
          type: 'GET',
          data: {
            isPoint: 1
          }
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            this.walletInfo = data
          }
        })
      },
      /**
       * 添加常购清单
       */
      addBuyListCart ($event,item) {
        $event.stopPropagation()
        this.$showPageLoading()
        const sessionId = utils.getSessionId()
        Model.addBuyListCart({
          type: 'POST',
          data: {
            sessionId,
            num: 1,
            mpId: item.mpId
          }
        }).then((result) => {
          const data = result.data
          this.$hidePageLoading()
          if (result.code == 0 && data) {
            this.cartCount = 1
            this.$toast('添加购物车成功')
          } else {
            this.$toast(result.message)
          }
        })
      },
      /**
       *
       */
      getCartNum () {
        const sessionId = utils.getSessionId()
        Model.getCartNum({
          type: 'GET',
          data: {
            sessionId
          }
        }).then((result) => {
          const data = result.data

          if (result.code == 0) {
            this.cartCount = data
          }
        })
      },
      /**
       * 固定底部购物车
       */
      fixedCartBottom () {
				const cartEl = document.getElementById('my-vip-cart')
	      const vipScrollEleHeight =  this.vipScrollEle.offsetHeight
				const cartTop = cartEl.getBoundingClientRect().top
        utils.throttle(() => {
          if (cartTop <= vipScrollEleHeight) {
            if (!this.fixedCart) {
              this.fixedCart = true
            }
          } else {
            this.fixedCart = false
          }
        },200)()
      },
      /**
       * 滚动和事件监听底部购物车
       */
      fixedCartScroll () {
        const vipScrollEle = document.getElementById('my-vip-scroll')
        this.vipScrollEle = vipScrollEle
        vipScrollEle.addEventListener('scroll',this.fixedCartBottom,utils.isPassive() ? {passive: true} : false)
      }
    },
    created () {
      this.getUserInfo()
      this.getWalletInfo()
      this.getCartNum()
      this.getDolphinList()
      this.getRankList()
    },
    mounted () {
      this.fixedCartScroll()
    },
    destroyed () {
      this.vipScrollEle.removeEventListener('scroll', this.fixedCartBottom,utils.isPassive() ? {passive: true} : false)
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
    height: .5rem;
    span{
      color: #FF6D00;
    }
    strong{
      padding-left: .1rem;
      text-decoration: line-through;
    }
  }
  .my-vip-cart-add-wrapper{
    position: absolute;
    right: .2rem;
    top:0;
    padding: .2rem .2rem .2rem .3rem;
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
    padding: 0 .3rem;
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
    .my-vip-best-pic{
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
      box-shadow: 0 .02rem .04rem #FF9A00;
    }
  }
  .my-vip-index-des{
    padding-top: .16rem;
  }
  .my-vip-des-pic{
    display: flex;
    img {
      width: 100%;
      min-height: 4.65rem;
    }
  }
  .my-vip-title{
    padding: 0 .3rem;
    display: flex;
    height: .76rem;
    align-items: center;
    h5{
      font-weight: 500;
    }
    span{
      padding-left: .1rem;
      padding-top: .08rem;
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
      border-radius: .3rem;
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
      background: url(./images/vip-index-sprite.png) no-repeat;
      background-size: 3.5rem auto;
      width: .82rem;
      height: .26rem;
      margin-left: .16rem;
      &.icon1{
        background-position: -.82rem -.06rem;
      }
      &.icon2{
        background-position: -.82rem -.39rem;
      }
      &.icon3{
        background-position: -1.70rem -.06rem;
      }
      &.icon4{
        background-position: -1.70rem -.39rem;
      }
      &.icon5{
        background-position: -2.58rem -.07rem;
      }
      &.icon6{
        background-position: -2.58rem -.39rem;
      }
    }
  }
  .my-vip-info{
    display: flex;
    flex:1;
    background: url(./images/vip-user_bg.png) no-repeat;
    background-size: 5.32rem auto;
    padding-top: .15rem;
    padding-left: .25rem;
    .my-vip-info-pic {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      border: .02rem solid rgba(255,255,255,.8);
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
  .user-fixed-cart{
    position: fixed;
    right: .4rem;
    bottom: .7rem;
    width: .92rem;
    height: .92rem;
    box-shadow: .02rem .02rem .02rem #EAEAEA;
    border-radius: 50%;
    padding: .22rem;
    z-index: 100;
    display: block;
    background: #fff;
    visibility: hidden;
    transition: all .5s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    transform: translateX(150%);
    &.active{
      visibility: visible;
      transform: translateX(0);
    }
    i{
      background: url(./images/vip-index-sprite.png) no-repeat -.12rem -.11rem;
      background-size: 3.5rem auto;
      width: .48rem;
      height: .48rem;
      display: block;
    }
    span{
      position: absolute;
      width: .1rem;
      height: .1rem;
      display: block;
      background: #FE1918;
      border-radius: 50%;
      right: .1rem;
      top: .2rem;
    }
  }
</style>
