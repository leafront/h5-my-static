<template>
	<div class="pageView">
		<AppHeader :title="title">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
    	<div class="my_recharge_list">  
        <div class="my_recharge_item ui-bottom-line" v-for="item in list" :key="item.recordTimeStr">
          <div class="my_recharge_info">
            <span class="font c3">{{item.payName}}</span>
            <strong class="c3">{{item.recordTimeStr}}</strong>
          </div>
          <div class="my_recharge_txt"> 
            <span class="font" v-if="item.actionType == 1">+</span>
            <strong class="font-xb c3">{{item.balance}}</strong>
          </div>    
        </div>
      </div>
      <PageLoading :showLoading="showLoading"></PageLoading>    
      <div class="ui-empty-wrapper" v-show="pageView && !list.length">
     		<UIEmpty></UIEmpty> 
     	</div>	
    </div>	
	</div>	
</template>

<style lang="scss">
  .my_recharge_list{
    background: #fff;
    padding-left: .3rem;
  }
  .my_recharge_item{
    padding: .3rem 0;
    display: flex;
    justify-content: space-between;
    padding-right: .3rem;
    &:last-child{
      border-bottom: 0;
    }
  }
  .my_recharge_info{
    display: flex;
    flex-direction: column;
  }
  .my_recharge_txt{
    display: flex;
    span {
      color: #777;
      padding-right: .05rem;
    }
  }
</style>

<script type="text/javascript">

	import AppHeader from '@/components/common/header'
  import utils from '@/widget/utils'
  import PageLoading from '@/components/common/pageLoading'
  import * as Model from '@/model/bank'
  import UIEmpty from '@/components/common/ui-empty'
	
	export default {
		data () {
			return {
				title: '充值记录',
				pageView: false,
				list: [],
				currentPage: 1,
        showLoading: false,
        isScrollLoad: false,
        totalPage: 0
			}
		},
		components: {
      AppHeader,
      PageLoading,
      UIEmpty
    },
		methods: {
			getRecordList (type) {
				const {
					currentPage
				} = this
				Model.getRecordList({
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
                this.isScrollLoad = false
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
                this.isScrollLoad = false
              }, 1000)
            }
            this.$toast(result.message)
          }
				})
			},
			/**
       * 滚动加载列表
       */
      scrollLoadList () {
        const pageViewHeight = window.innerHeight
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const pageHeight = document.querySelector('.scroll-view-wrapper').offsetHeight
        const realFunc = () => {
          if (pageViewHeight + scrollTop >= pageHeight && this.list.length < this.totalPage) {
            this.showLoading = true
            this.currentPage += 1
            this.getRecordList(1)
          }
          this.isScrollLoad = false
        }
        if (!this.isScrollLoad) {
          this.isScrollLoad = true
          this.timer = requestAnimationFrame(realFunc)
        }
      }
    },
    created () {
      this.$showLoading()
      this.getRecordList()
      window.addEventListener('touchmove',this.scrollLoadList,utils.isPassive() ? {passive: true} : false)
    },
    beforeDestroy () {
      cancelAnimationFrame(this.timer)
      window.removeEventListener('touchmove', this.scrollLoadList,utils.isPassive() ? {passive: true} : false)
		}
	}

</script>