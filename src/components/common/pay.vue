<template>
	<div class="ui-mask active">
		<div class="ui-pay-cont bgfff">
			<div class="ui-pay-close">
				<span class="ui-pay-close-btn"></span>
			</div>	
			<div class="ui-pay-title ui-bottom-line">
				<h4>选择充值方式</h4>
			</div>
			<div class="ui-pay-list p30">
				<div class="ui-pay-item">
					<img class="ui-pay-pic"/>
					<div class="ui-pay-info">
						<h4 class="font-s c3">支付宝</h4>
						<p class="font">支付宝快捷支付</p>
					</div>
					<div class="ui-right-arrow"></div>		
				</div>	
			</div>	
		</div>		
	</div>		
</template>

<style lang="scss">
	.ui-pay-item{
		height: 1.06rem;
		display: flex;
		align-items: center;
		border-bottom: .01rem solid #e0e0e0;
		&:last-child{
			border-bottom: 0;
		}
		.ui-pay-pic{
			width: .62rem;
			&:last-child{
				border-bottom: 0;
			}
			height: .62rem;
		}
	}
	.ui-pay-info{
		display: flex;
		flex-direction: column;
		padding-left: .3rem;
		flex: 1;
		p{
			color: #808080;
		}
	}
	.ui-pay-title{
		height: 1.1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		h4{
			font-size: .36rem;
			color: #8a8a8a;
		}
	}
	.ui-pay-cont{
		position: fixed;
		z-index: 1000;
		left: 0;
		bottom: 0;
		width: 100%;
		min-height: 5rem;
	}
	.ui-pay-close {
		position: absolute;
		right: .3rem;
		top: -.35rem;
		.ui-pay-close-btn{
	    width: .7rem;
	    height: .7rem;
	    background: #fff;
	    position: relative;
	    border-radius: 50%;
	    display: block;
	    box-shadow: 0 0 .08rem rgba(51,51,51,.5);
	    &:before,&:after{
	      content: '';
	      display: block;
	      position: absolute;
	      left:50%;
	      top:50%;
	      width: .35rem;
	      height: .04rem;
	      background: #999;
	    }
	    &:before{
				transform: translateX(-50%) rotate(45deg);
	    }
	    &:after{
	      transform: translateX(-50%) rotate(-45deg);
	    }
	  }
	}
</style>
