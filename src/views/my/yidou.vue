<template>
	<div class="pageView">
    <AppHeader :title="title">
    	<div class="ui-header-right" @click="pageAction('/rules/eBean-rule.html?')">
      	<span>伊豆规则</span>
      </div>
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
    	<div class="my_yidou_header">
    		<i class="icon"></i>
    		<div class="my_yidou_number">
    			<span>当前伊豆数</span>
    			<p v-if="amountBalance">{{amountBalance}}<span class="font-xs">个</span></p>
    		</div>	
    	</div>	
    	<div class="my_yidou_title">
    		<p class="font">伊豆明细</p>
    	</div>
    	<div class="my_yidou_nav font ui-bottom-line">
    		<div class="my_yidou_nav_item" @click="selectNav(index)" v-for="(item,index) in navList">
    			<span :class="{'active': pointStatus == index}">{{item}}</span>
    		</div>	
    	</div>
    	<div class="my_yidou_list">	
    		<div class="my_yidou_item" :key="item.createTime" v-for="item in list">
    			<div class="my_yidou_info">
    				<span class="font c3">{{item.actionTypeName}}</span>
    				<strong class="c3">{{item.createTimeStr}}</strong>
    			</div>
    			<div class="my_yidou_txt">	
    				<span class="font" v-if="item.actionType == 1">+</span>
    				<span class="font" v-if="item.actionType == 2">-</span>
    				<strong class="font-xb c3">{{item.balance}}</strong>
    		  </div>		
    		</div>
    	</div>
    	<PageLoading :showLoading="showLoading"></PageLoading>		
    	<div class="yidou-empty" v-show="pageView && !list.length">
        <UIEmpty></UIEmpty>
      </div> 
   	</div>
  </div> 	 	
</template>	

<script type="text/javascript">

	import AppHeader from '@/components/common/header'

	import utils from '@/widget/utils'

	import '@/widget/requestAnimationFrame'

	import PageLoading from '@/components/common/pageLoading'

	import * as Model from '@/model/integral'

	import UIEmpty from '@/components/common/ui-empty'
	
	export default {
		data () {
			return {
				pageView: false,
				title: '我的积分',
				list: [],
				pointStatus: 0,
				navList: ['全部','收入','支出'],
				amountBalance: 0,
				currentPage: 1,
				showLoading: false,
				isScrollLoad: false,
				totalPage: 0,
				timer: null,
			}
		},
		components: {
			AppHeader,
			PageLoading,
			UIEmpty
		},
		methods: {
			pageAction (url) {
				location.href = url
			},
			selectNav (index) {
				this.pointStatus = index
				this.currentPage  = 1
				this.getPointList()
			},
			getPointList (type) {
				const {
					pointStatus,
					currentPage
				} = this
				Model.getPointList({
					type: 'POST',
					data: {
						pageNo: 1,
						pageSize: 10,
						accountType: 2,
						pointStatus
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
			getPointNumber () {
				Model.getPointNumber({
					type: 'POST',
					data: {
						accountType: 2
					}
				}).then((result) => {
					const data = result.data 

					if (result.code == 0 && data) {
						this.amountBalance = data.amountBalance
					} else {
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
        const pageHeight = document.documentElement.offsetHeight
        const realFunc = () => {
          if (pageViewHeight + scrollTop >= pageHeight && this.list.length < this.totalPage) {
            this.showLoading = true
            this.currentPage += 1
            this.getPointList(1)
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
			this.getPointList()
			this.getPointNumber()
			window.addEventListener('touchmove',this.scrollLoadList,utils.isPassive() ? {passive: true} : false)
		},
		beforeDestroy () {
      cancelAnimationFrame(this.timer)
      window.removeEventListener('touchmove', this.scrollLoadList,utils.isPassive() ? {passive: true} : false)
    }
	}
</script>

<style lang="scss">
	.yidou-empty{
		padding-top: 30%;
	}
	.my_yidou_txt{
		display: flex;
		span {
			color: #777;
			padding-right: .05rem;
		}
	}
	.my_yidou_list{
		background: #fff;
		padding-left: .3rem;
	}
	.my_yidou_item{
		padding: .3rem 0;
		display: flex;
		justify-content: space-between;
		padding-right: .3rem;
		&:last-child{
			border-bottom: 0;
		}
	}
	.my_yidou_nav{
		height: .88rem;
		display: flex;
		background: #fff;
		.my_yidou_nav_item{
			flex:1;
			display: flex;
			justify-content: center;
			span{
				height: 100%;
				display: flex;
				align-items: center;
				&.active{
					border-bottom: .04rem solid #ff6900;
				}
			}
		}
	}
	.my_yidou_info{
		display: flex;
		flex-direction: column;
	}
	.my_yidou_title{
		padding: .2rem .3rem;
	}
  .my_yidou_header{
  	height: 2rem;
  	background: url(./images/integral.png) no-repeat;
  	background-size: 100% auto;
  	padding-left: .3rem;
  	display: flex;
  	align-items: center;
  	.icon{
  		width: 1.1rem;
  		height: 1.1rem;
  		background: url(./images/integral-header.png) no-repeat;
  		background-size: 100% auto;
  	}
  	.my_yidou_number{
  		display: flex;
  		flex-direction: column;
  		color: #fff;
  		padding-left: .4rem;
  		padding-top: .1rem;
  		p{
  			font-size: .6rem;
  			span{
  				padding-left: .1rem;
  			}
  		}
  	}
  }
</style>
