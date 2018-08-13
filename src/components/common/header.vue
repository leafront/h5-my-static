<template>
  <div class="ui-header-wrapper" v-if="showHeader">
    <div class="ui-header" :class="{'ui-header-border':isBorder}">
      <div class="ui-header-back" @click="backAction">
        <svg class="icon ui-header-back_btn" aria-hidden="true">
          <use xlink:href="#icon-back"></use>
        </svg>
      </div>
      <h4 class="ui-header-title">{{title}}</h4>
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/javascript">

  import app from '@/widget/app'

  import utils from '@/widget/utils'

  export default {
    props: {
      backFn: {
        default: null,
        type: Function
      },
      title: {
        default:'',
        type: String
      },
      isBorder: {
        default: false,
        type: Boolean
      },
      isShowHeader: {
        default: false,
        type: Boolean
      }
    },
    computed: {
      showHeader () {
        return this.isShowHeader || !(utils.weixin() || utils.nativeQQ())
      }
    },
    methods: {
      backAction () {
        if (this.backFn && typeof this.backFn == 'function') {
          this.backFn()
        } else {
          if (utils.isApp()) {
            app.back()
          } else {
            this.$router.back()
          }
        }

      }
    }
  }

</script>

<style lang="scss">
  .ui-header-right{
    height: .88rem;
    display: flex;
    align-items: center;
    padding: 0 .3rem;
    position:absolute;
    right:0;
    top:0;
    span{
      font-size: .3rem;
    }
  }

  .ui-header-wrapper{
    width:100%;
    height: .88rem;
  }

  .ui-header {
    width: 100%;
    height: .88rem;
    background: #fff;
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    top:0;
    z-index:999;
    &.ui-header-border{
      border-bottom: .01rem solid #ddd;
    }
    .ui-header-back{
      height: .88rem;
      padding: 0 .3rem 0 .15rem;
      display: flex;
      align-items: center;
    }
    .ui-header-back_btn{
      font-size: .46rem;
      color:#ff6900;
      font-weight: bold;
    }
    .ui-header-title{
      height:.88rem;
      display: flex;
      align-items: center;
      position: absolute;
      left:50%;
      top:0;
      transform: translateX(-50%);
      font-size: .36rem;
      color:#333;
      text-align: center;
    }
  }
  .ui-header-right-icon{
    position:absolute;
    right:0;
    top:0;
    display: flex;
    align-items: center;
    height: .88rem;
    width: 1.2rem;
    padding-right: .2rem;
    justify-content: flex-end;
    .icon-gengduo{
      font-size: .5rem;
      color:#999;
      transition: transform .4s linear;
      &.active{
        transform: rotate(90deg);
      }
    }
  }

</style>
