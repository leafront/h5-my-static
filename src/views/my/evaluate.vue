<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder"></AppHeader>
    <div class="my-evaluate-nav">
      <ul class="my-evaluate-nav-list">
        <li v-for="(item,index) in menuList" :key="index" @click="checkedList(index)" :class="{'active': status == index}">{{item}}</li>
      </ul>
    </div>
    <div class="scroll-view-wrapper" id="my-evaluate-scroll" :class="{'visibility': pageView}">
      <div class="my-evaluate" id="my-evaluate-view" >
        <LazyLoad :list="list" :options="{ele:'pic-lazyLoad',scrollEle: 'my-evaluate-scroll'}">
          <div class="my-evaluate-item" :key="item.id" v-for="item in list">
            <div class="my-evaluate-title">
              <p class="font">{{item.commentTimeStr}}</p>
              <span class="font c3" v-if="item.isComment == 1">已评价</span>
              <span class="font c3" v-if="item.isComment == 0">未评价</span>
            </div>
            <div class="my-evaluate-des">
              <div class="my-evaluate-pic pic-lazyLoad" :data-src="item.url160x160"></div>
              <div class="my-evaluate-des-txt">
                <h4 class="ellipsis font c3">{{item.name}}</h4>
                <div class="my-evaluate-button">
                  <p v-if="item.isComment == 0" @click="pageAction(`/evaluate/publish-evaluate.html?mpId=${item.orderCode}&soItemId=${item.soItemId}`)">去评价</p>
                  <p v-if="item.canEdit == 1" @click="pageAction(`/evaluate/update-evaluate.html?id=${item.id}&mpId=${item.orderCode}&soItemId=${item.soItemId}`)">去修改</p>
                </div>
              </div>
            </div>
            <div class="my-evaluate-star" v-if="item.rate">
              <div class="my-evaluate-num-star">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="my-evaluate-dynamic" :style="{'width': '0.24' * item.rate + 'rem'}">
                <div class="my-evaluate-start-active">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            <div class="my-evaluate-cont" v-if="item.content">
              <p class="font c3">{{item.content}}</p>
            </div>
          </div>
        </LazyLoad>
        <PageLoading :showLoading="showLoading"></PageLoading>
      </div>
      <div class="ui-empty-wrapper" v-show="pageView && !list.length">
        <UIEmpty ></UIEmpty>
      </div>  
    </div>
  </div>
</template>


<script type="text/javascript">

  import AppHeader from '@/components/common/header'
  import LazyLoad from '@/components/widget/lazyLoad'
  import PageLoading from '@/components/common/pageLoading'
  import UIEmpty from '@/components/common/ui-empty'
  import * as Model from '@/model/evaluate'
  import utils from '@/widget/utils'

  export default {
    data () {
      return {
        isBorder: true,
        title: '我的评价',
        pageView: false,
        currentPage: 1,
        status: 0,
        menuList: ['全部', '已评价', '未评价'],
        list: [],
        showLoading: false,
        isScrollLoad: false,
        totalPage: 1,
        timer: null
      }
    },
    components: {
      AppHeader,
      LazyLoad,
      PageLoading,
      UIEmpty
    },
    methods: {
      /**
       * 获取评价列表
       */
      getEvaluateList (type) {
        const {
          currentPage,
          status
        } = this
        Model.getEvaluateList({
          type: 'GET',
          data: {
            pageNo: currentPage,
            pageSize: 10,
            status
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
            this.totalPage = data.totalCount
            if (type == 1) {
              this.list = this.list.concat(data.commentList || [])
            } else {
              this.list = data.commentList || []
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
       * 切换选择导航
       * @param {Number}  val
       */
      checkedList (val) {
        if (this.status == val) {
          return
        }
        this.status = val
        this.currentPage  = 1
        this.getEvaluateList()
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
            this.getEvaluateList(1)
          }
          this.isScrollLoad = false
        }
        if (!this.isScrollLoad) {
          this.isScrollLoad = true
          this.timer = requestAnimationFrame(realFunc)
        }
      },
      pageAction (url) {
        location.href = url
      }
    },
    created () {
      this.$showLoading()
      this.getEvaluateList()
      window.addEventListener('touchmove',this.scrollLoadList,utils.isPassive() ? {passive: true} : false)
    },
    beforeDestroy () {
      cancelAnimationFrame(this.timer)
      window.removeEventListener('touchmove', this.scrollLoadList,utils.isPassive() ? {passive: true} : false)
    }
  }

</script>


<style lang="scss">
  .my-evaluate-nav{
    position: fixed;
    left: 0;
    width: 100%;
    top: 0;
    z-index: 100;
  }
  .ui-header ~ .my-evaluate-nav {
    top: .88rem;
  }
  .my-evaluate-cont{
    margin-top: .05rem;
    padding-left: .3rem;
    display: flex;
    align-items: center;
  }
  .my-evaluate-star{
    padding-left: .3rem;
    position: relative;
  }
  .my-evaluate-num-star{
    height: .4rem;
    display: flex;
    align-items: center;
    width: 1.35rem;
    span{
      background: url(./images/evaluate_icon.png) no-repeat -.01rem -.02rem;
      background-size: .48rem auto;
      width: .22rem;
      height: .22rem;
      margin-right:.02rem;
    }
  }
  .my-evaluate-dynamic{
    height: .22rem;
    position: absolute;
    left: .3rem;
    top: .09rem;
    overflow: hidden;
  }
  .my-evaluate-start-active{
    width: 1.35rem;
    height: .22rem;
    span{
      float: left;
      background: url(./images/evaluate_icon.png) no-repeat -.25rem -.02rem;
      background-size: .48rem auto;
      width: .22rem;
      height: .22rem;
      margin-right:.02rem;
    }
  }
  .my-evaluate-des{
    display: flex;
    padding: .2rem .3rem;
  }
  .my-evaluate-des-txt{
    padding-left: .2rem;
    padding-top: .2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    h4{
      width: 100%;
    }
    .my-evaluate-button{
      padding-top: .1rem;
      display: flex;
      justify-content: flex-end;
      p{
        width: 1.2rem;
        height: .5rem;
        text-align: center;
        background: #ff6900;
        border-radius: .06rem;
        color: #fff;
        line-height: .5rem;
      }
    }
  }
  .my-evaluate-pic{
    width: 1rem;
    height: 1rem;
    background-size: 1rem auto;
  }
  .my-evaluate-title{
    border-bottom: .01rem solid #ddd;
    display: flex;
    justify-content: space-between;
    height: .88rem;
    align-items: center;
    p{
      padding-left: .3rem;
      color: gray;
    }
    span {
      padding-right: .3rem;
    }
  }
  .my-evaluate{
    padding-top: .9rem;
    background: #f8f8f8;
  }
  .my-evaluate-item{
    margin-top: .2rem;
    background: #fff;
    padding-bottom: .15rem;
  }
  .my-evaluate-nav-list {
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
