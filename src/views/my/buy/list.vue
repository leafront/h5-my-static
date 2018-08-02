<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
    </AppHeader>
    <div class="scroll-view-wrapper"  id="my-buy-list-scroll" @scroll="scrollLoadList" :class="{'visibility': pageView}">
      <div class="my-buy-view" id="my-buy-view">
        <div class="my-buy-list">
          <LazyLoad :list="list" :options="{ele:'my-buy-item-pic',scrollEle: 'my-buy-list-scroll'}">
            <div class="my-buy-item" :key="index" v-for="(item,index) in list">
              <img class="my-buy-item-pic pic-lazyLoad":data-src="item['url160x160']"/>
              <div class="my-buy-item-des">
                <h4 class="font">{{item.name}}</h4>
                <div class="my-by-item-info">
                  <span class="font ff6900">¥{{item.price | price}}</span>
                  <p>购买<strong class="ff6900">{{item.num}}次</strong></p>
                </div>
              </div>
              <div class="my-buy-item-cart" @click="addBuyListCart(item)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-cart"></use>
                </svg>
              </div>
            </div>
          </LazyLoad>
        </div>
        <PageLoading :showLoading="showLoading"></PageLoading>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import PageLoading from '@/components/common/pageLoading'

  import LazyLoad from '@/components/widget/lazyLoad'

  import utils from '@/widget/utils'

  import * as Model from '@/model/buy'

  export default {
    data () {
      return {
        isBorder: true,
        title: '常购清单',
        pageView: false,
        currentPage: 1,
        totalPage: 1,
        showLoading: false,
        isScrollLoad: true,
        list: []
      }
    },
    components: {
      AppHeader,
      PageLoading,
      LazyLoad
    },
    methods: {
      /**
       * 获取常购清单列表
       */
      getBuyList (type) {
        const {
          currentPage
        } = this
        Model.getBuyList({
          type: 'GET',
          data: {
            pageNo: currentPage,
            pageSize: 10
          }
        }).then((result) => {

          this.$hideLoading()
          const data = result.data
          if (result.code == 0 && data) {
            this.pageView = true
            this.totalPage = data.totalPage
            if (currentPage > 1) {
              setTimeout(() => {
                this.showLoading = false
                this.isScrollLoad = true
              }, 1000)
            }
            if (type == 1) {
              this.list = this.list.concat(data.data || [])
            } else {
              this.list = data.data || []
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
       * 添加常购清单
       */
      addBuyListCart (item) {
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

          if (result.code == 0 && data) {
            this.$toast('添加成功')
          } else {
            this.$toast(result.message)
          }
        })
      },
      /**
       * 滚动加常购清单列表
       * @param event
       */
      scrollLoadList (event) {

        const pageViewHeight = event.target.clientHeight
        const scrollTop = event.target.scrollTop
        const pageHeight = document.getElementById('my-buy-view').clientHeight
        if (pageViewHeight + scrollTop > pageHeight && this.list.length < this.totalPage) {
          utils.throttle(() => {
            if (!this.isScrollLoad) {
              return
            }
            this.isScrollLoad = false
            this.showLoading = true
            this.currentPage += 1
            this.getBuyList(1)
          })()
        }
      }
    },
    created () {
      this.$showLoading()
      this.getBuyList()
    }
  }

</script>

<style lang="scss">
  .my-buy-view{
    padding-top: .2rem;
    background: #f0f0f0;
  }
  .my-buy-list{
    background: #fff;
    padding-left: .3rem;
  }
  .my-buy-item{
    padding: .2rem 0;
    display: flex;
    position: relative;
    border-bottom: .01rem solid #e0e0e0;
    .my-buy-item-pic{
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .my-buy-item-des{
    margin-left: .2rem;
    width: 3.8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h4 {
      color: #777;
    }
  }
  .my-by-item-info {
    display: flex;
    justify-content: space-between;
    strong{
      padding-left: .1rem;
    }
  }
  .my-buy-item-cart{
    padding: .3rem .3rem .2rem .3rem;
    position: absolute;
    right:0;
    bottom:0;
    .icon{
      width: .44rem;
      height: .44rem;
      color: #ff6900;
    }
  }
</style>
