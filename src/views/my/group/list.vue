<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
    </AppHeader>
    <div class="scroll-view-wrapper" id="my-group-scroll" :class="{'visibility': pageView}">
      <div class="my-group-menu">
        <ul class="my-group-menu-list">
          <li :class="{'active': index == status}" :key="item.orderCode" @click="checkedList(index)" v-for="(item,index) in menuList">{{item}}</li>
        </ul>
      </div>
      <LazyLoad :list="list" :options="{ele:'pic-lazyLoad',scrollEle: 'my-group-scroll'}">
        <div class="my-group-info" v-for="item in list">
          <div class="my-group-item ui-bottom-line" @click="pageAction(`/group/group-detail.html?instId=${item.patchGrouponInstId}`)">
            <div class="my-group-item-pic pic-lazyLoad" :data-src="item.patchGrouponMainPicUrl"></div>
            <div class="my-group-item-des ui-ellipsis">
              <h4 class="font c3">{{item.patchGrouponTitle}}</h4>
              <p><strong>{{item.totalMembers}}人团</strong><span>¥</span><b>{{item.patchGrouponPrice}}</b><span>/件</span></p>
            </div>
            <div class="my-group-item-status">
              <p class="font c3" :class="{'active': item.status == 1 || item.status == 2}">{{item.statusDesc}}</p>
            </div>
          </div>
          <div class="my-group-action">
            <span class="font c3" v-if="item.status != 1 && item.status != 2" @click="pageAction(`/group/group-detail.html?instId=${item.patchGrouponInstId}`)">查看团详情</span>
            <span class="font c3" @click="appAction(item.orderCode)">查看订单详情</span>
            <span class="active font c3" @click="shareAction(item)" v-if="(item.status == 6 || item.status == 2) && (isApp || isWeixin)">邀请好友参团</span>
          </div>
        </div>
      </LazyLoad>
      <PageLoading :showLoading="showLoading"></PageLoading>
      <UIShare></UIShare>
      <div class="ui-empty-wrapper" v-show="pageView && !list.length">
        <UIEmpty :pic="emptyURL"></UIEmpty>
      </div>  
    </div>
  </div>
</template>

<script type='text/javascript'>

  import AppHeader from '@/components/common/header'
  import PageLoading from '@/components/common/pageLoading'
  import UIShare from '@/components/widget/ui-share'
  import config from '@/config/index'
  import * as Model from '@/model/group'
  import utils from '@/widget/utils'
  import weixin_share from '@/common/weixin_share'
  import LazyLoad from '@/components/widget/lazyLoad'
  import UIEmpty from '@/components/common/ui-empty'
  import store from '@/widget/store'
  import {mapGetters, mapActions} from 'vuex'
  import app from '@/widget/app'

  export default {
    data () {
      return {
        isBorder: true,
        title: '我的团',
        pageView: false,
        list: [],
        menuList: ['全部','组团中','已成团','组团失败'],
        currentPage: 1,
        status: 0,
        showLoading: false,
        isScrollLoad: false,
        totalPage: 0,
        shareCodeNum: null,
        isApp: utils.isApp(),
        isWeixin: utils.weixin(),
        emptyURL: config.staticPath + '/my-static/images/group-empty.png',
        timer: null
      }
    },
    components: {
      AppHeader,
      PageLoading,
      LazyLoad,
      UIShare,
      UIEmpty
    },
    methods: {
      ...mapActions([
        'updateShareMenu'
      ]),
      pageAction (url) {
        location.href = url
      },
      appAction (orderCode) {
        location.href = `/my/order-detail.html?orderCode=${orderCode}`
      },
      checkedList (val) {
        if (val == this.status) {
          return
        }

        this.status = val
        this.currentPage  = 1
        this.getGroupList()
      },
      /**
       * 获取我的团列表
       */
      getGroupList (type) {
        const {
          currentPage,
          status
        } = this
        Model.getGroupList({
          type: 'GET',
          data: {
            status,
            currentPage,
            itemsPerPage: 10
          }
        }).then((result) => {

          const data = result.data
          this.$hideLoading()
          if (result.code == 0 && data) {
            this.pageView = true
            if (currentPage > 1) {
              setTimeout(() => {
                this.showLoading = false
                this.isScrollLoad = false
              }, 1000)
            }
            this.totalPage = data.total
            if (type == 1) {
              this.list = this.list.concat(data.listObj || [])
            } else {
              this.list = data.listObj || []
            }
          } else {
            if (currentPage > 1) {
              setTimeout(() => {
                this.isScrollLoad = false
              }, 1000)
            }
            this.$toast(result.message)
          }
        })
      },
      /**
       * 滚动加载团列表
       */
      scrollLoadList () {
        const pageViewHeight = window.innerHeight 
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const pageHeight = document.querySelector('.scroll-view-wrapper').offsetHeight
        const realFunc = () => {
          if (pageViewHeight + scrollTop >= pageHeight && this.list.length < this.totalPage) {
            this.showLoading = true
            this.currentPage += 1
            this.getGroupList(1)
          }
          this.isScrollLoad = false
        }
        if (!this.isScrollLoad) {
          this.isScrollLoad = true
          this.timer = requestAnimationFrame(realFunc)
        }
      },
      /**
       * 分享操作
       * @param item
       */
      shareAction (item) {
        let url = ''
        const patchGrouponInstId = item.patchGrouponInstId
        const shareCodeNum = this.shareCodeNum
        const productInfo = item.productInfo
        const attendeeList = item.attendeeList
        const frontPromotionType = item.frontPromotionType
        if(shareCodeNum) {
          url = config.hostPath + '/group/group-detail.html?instId='+item.patchGrouponInstId + '&shareCode=' + shareCodeNum
        } else {
          url = config.hostPath + '/group/group-detail.html?instId='+item.patchGrouponInstId
        }

        const shareConfig = {
          link: url,
          url: url,
          title: '',
          desc: '',
          description: '',
          imgUrl: item.patchGrouponMainPicUrl,
          pic: item.patchGrouponMainPicUrl
        }
        let shareTag = ''
        if (frontPromotionType == 2001) {
          shareTag = '拼团'
        } else if (frontPromotionType == 2002) {
          shareTag = '抽奖团'
        }
        if (productInfo && productInfo[0]) {
          const patchGrouponPrice = item.patchGrouponPrice
          const productName = productInfo[0].name
          const title = '【'+shareTag+'】'+'我买了' + patchGrouponPrice +'元【' +productName + '】'
          shareConfig.title = title
        }
        if(attendeeList) {
          const totalMembers = item.totalMembers - attendeeList.length
          const patchGrouponDesc = item.patchGrouponDesc || ''
          const description = '还差' + totalMembers + '人 ' + patchGrouponDesc
          shareConfig.desc = description
          shareConfig.description  = description
        }

        this.hybridShareAction(shareConfig, patchGrouponInstId)

      },
      /**
       * 调用app和微信分享
       * @param shareConfig
       */
      hybridShareAction (shareConfig, patchGrouponId) {
        if (utils.isApp()) {
          app.postMessage('share',{
            url: shareConfig.url,
            title: shareConfig.title,
            description: shareConfig.description,
            url160x160: shareConfig.pic,
            pic: shareConfig.pic,
            isMiniProgram: true,
            originalId: config.originalId,
            miniProgramPage: `/pages/group/detail/index?id=${patchGrouponId}`
          },() => {

          })
        } else if (utils.weixin()) {
          this.updateShareMenu(true)
          weixin_share.weixinShare(shareConfig)
        }
      }
    },
    created () {
      const shareCodeNum = store.get('s_currentsharecode','session')
      if (shareCodeNum) {
        this.shareCodeNum = shareCodeNum
      }
      this.$showLoading()
      this.getGroupList()
      window.addEventListener('touchmove',this.scrollLoadList,utils.isPassive() ? {passive: true} : false)
    },
    beforeDestroy () {
      cancelAnimationFrame(this.timer)
      window.removeEventListener('touchmove', this.scrollLoadList,utils.isPassive() ? {passive: true} : false)
    }
  }

</script>

<style lang="scss">
  .my-group-action{
    display: flex;
    justify-content: flex-end;
    padding: .15rem 0;
    span{
      height:.58rem;
      width: 1.98rem;
      border: .01rem solid #ddd;
      line-height: .6rem;
      text-align: center;
      margin-right:.2rem;
      border-radius: .08rem;
      &.active{
        background: #ff7900;
        color: #fff;
        border: .01rem solid #ff7900;
      }
    }
  }
  .my-group-info{
    border-top: .2rem solid #f0f0f0;
    background: #fff;
  }
  .my-group-item{
    padding: .24rem .3rem;
    display: flex;
    position: relative;
    .my-group-item-pic{
      width: 1.2rem;
      height: 1.2rem;
      background-size: 100% auto;
    }
    .my-group-item-des{
      display: flex;
      flex-direction: column;
      padding-left: .3rem;
      justify-content: space-between;
      h4{
        width: 4.5rem;
      }
      p{
        padding-left: .15rem;
        b{
          font-size: .4rem;
          color: #ff6900;
          padding-left: .1rem;
        }
        span{
          color: #ff6900;
        }
        strong{
          padding-right: .1rem;
        }
      }
    }
  }
  .my-group-item-status{
    position: absolute;
    right: .3rem;
    bottom: .24rem;
    span{
      .active{
        color: #ff7900;
      }
    }
  }
  .my-group-item{
    background: #fff;
    margin-top: .2rem;
  }
  .my-group-menu-list {
    height: .9rem;
    display: flex;
    background: #fff;
    border-bottom: .01rem solid #ddd;
    li{
      flex:1;
      height: .9rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: .04rem solid transparent;
      color: #666;
      font-size: .28rem;
      &.active{
        border-bottom: .04rem solid #ff6900;
      }
    }
  }
</style>
