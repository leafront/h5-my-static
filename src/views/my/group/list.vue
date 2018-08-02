<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
    </AppHeader>
    <div class="scroll-view-wrapper white-view" id="my-group-scroll" @scroll="scrollLoadList" :class="{'visibility': pageView}">
      <div class="my-group-view" id="my-group-view">
        <div class="my-group-menu">
          <ul class="my-group-menu-list">
            <li :class="{'active': index == status}" :key="item.orderCode" @click="checkedList(index)" v-for="(item,index) in menuList">{{item}}</li>
          </ul>
        </div>
        <LazyLoad :list="list" :options="{ele:'my-group-item-pic',scrollEle: 'my-group-scroll'}">
          <div class="my-group-info" v-for="item in list">
            <div class="my-group-item">
              <img class="my-group-item-pic pic-lazyLoad" :data-src="item.patchGrouponMainPicUrl"/>
              <div class="my-group-item-des">
                <h4 class="font c3">{{item.patchGrouponTitle}}</h4>
                <p><strong>{{item.totalMembers}}人团</strong><span>¥</span><b>{{item.patchGrouponPrice}}</b><span>/件</span></p>
              </div>
              <div class="my-group-item-status">
                <p class="font c3" :class="{'active': item.status == 1 || item.status == 2}">{{item.statusDesc}}</p>
              </div>
            </div>
            <div class="my-group-action">
              <span class="font c3" v-if="item.status != 1 && item.status != 2" @click="pageAction(`/group/group-detail.html?instId=${item.patchGrouponInstId}`)">查看团详情</span>
              <span class="font c3" @click="pageAction(`/my/order-detail.html?orderCode=${item.orderCode}`)">查看订单详情</span>
              <span class="active font c3" @click="shareAction(item)" v-if="(item.status == 6 || item.status == 2) && (isApp || isWeixin)">邀请好友参团</span>
            </div>
          </div>
        </LazyLoad>
        <PageLoading :showLoading="showLoading"></PageLoading>
        <div class="my_group_empty" v-show="pageView && !list.length">
          <img src="./images/my_empty_group.png"/>
          <p>暂时没有相关团单哦</p>
        </div>
      </div>
      <UIShare></UIShare>
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
        isScrollLoad: true,
        totalPage: 1,
        shareCodeNum: null,
        isApp: utils.isApp(),
        isWeixin: utils.weixin()
      }
    },
    components: {
      AppHeader,
      PageLoading,
      LazyLoad,
      UIShare
    },
    methods: {
      ...mapActions([
        'updateShareMenu'
      ]),
      pageAction (url) {
        location.href = url
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
                this.isScrollLoad = true
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
                this.isScrollLoad = true
              }, 1000)
            }
            this.$toast(result.message)
          }
        })
      },
      /**
       * 滚动加载团列表
       * @param event
       */
      scrollLoadList (event) {

        const pageViewHeight = event.target.clientHeight
        const scrollTop = event.target.scrollTop
        const pageHeight = document.getElementById('my-group-view').clientHeight
        if (pageViewHeight + scrollTop > pageHeight && this.list.length < this.totalPage) {
          utils.throttle(() => {
            if (!this.isScrollLoad) {
              return
            }
            this.isScrollLoad = false
            this.showLoading = true
            this.currentPage += 1
            this.getGroupList(1)
          })()
        }
      },
      shareAction (item) {
        let url = ''
        const patchGrouponInstId = item.patchGrouponInstId
        const shareCodeNum = this.shareCodeNum
        const productInfo = item.productInfo
        const attendeeList = item.attendeeList
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
        if (productInfo && productInfo[0]) {
          const patchGrouponPrice = item.patchGrouponPrice
          const productName = productInfo[0].name
          const title = '我买了' + patchGrouponPrice +'元【' +productName + '】'
          shareConfig.title = title
        }
        if(attendeeList) {
          const totalMembers = item.totalMembers - attendeeList.length
          const patchGrouponDesc = item.patchGrouponDesc || ''
          const description = '还差' + totalMembers + '人 ' + patchGrouponDesc
          shareConfig.desc = description
          shareConfig.description  = description
        }

        this.hybridShareAction(shareConfig)

      },
      hybridShareAction (shareConfig) {
        if (utils.isApp()) {
          app.postMessage('share',{
            url: shareConfig.url,
            title: shareConfig.title,
            description: shareConfig.description,
            url160x160: shareConfig.pic,
            pic: shareConfig.pic
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
      utils.setCookie('ut','c956b1e813a6b44c601dadd5367df3af53')
      utils.setCookie('lyf_ut','c956b1e813a6b44c601dadd5367df3af53')
      this.$showLoading()
      this.getGroupList()
    }
  }

</script>

<style lang="scss">
  .my-group-view{
    display: flex;
    flex-direction: column;
  }
  .my_group_empty{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    flex:1;
    padding-top: 3rem;
    img{
      width: 3rem;
      height: 3rem;
    }
    p{
      color: #bbb;
      font-size: .32rem;
    }
  }
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
    border-bottom: .01rem solid #e0e0e0;
    .my-group-item-pic{
      width: 1.2rem;
      height: 1.2rem;
    }
    .my-group-item-des{
      display: flex;
      flex-direction: column;
      padding-left: .3rem;
      justify-content: space-between;
      h4{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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
