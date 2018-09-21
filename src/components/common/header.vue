<template>
  <div class="ui-header-wrapper" v-if="showHeader">
    <div class="ui-header" :class="{'ui-header-border':isBorder}">
      <div class="ui-header-back" @click="backAction">
        <div class="ui-header-back_btn">
        </div>
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
      padding: 0 .3rem 0 .3rem;
      display: flex;
      align-items: center;
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

  .ui-header-back_btn{
    position:relative;
    width: .26rem;
    height: .44rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAsCAMAAABMt1hMAAAAS1BMVEUAAAD/aQD/awD/Zwr/eQn/hgb/agD/aQD/aQD/bAD/cQb/aQD/bAD/agD/bAD/agD/YAD/aQD/Zgb/aQD/aQD/YwD/cQD/bQD/aQCzIa9cAAAAGHRSTlMA9IREFAyz6+N3NNm/opJsUiokzcZjV6ujvjAmAAAAmUlEQVQ4y63QSRaEIAxFUUQaARUbtLL/lVYy/5FjnXrTO0m++VuuUcXiT6KIpRFRgDKznB5REHGaFCgLy6TLgWRliTsSyzLokpEkkRFJJQ7KJbIhuUVuJJvIhWQUqVAGloQkY5EKizWwARzXeUmqD5bASL1pJduz/N7WjsX9vS1ih26TYp8HC2JOt6LYrJsXa0Y3o1gga37tC5M/D6HaFNTnAAAAAElFTkSuQmCC) no-repeat;
    background-size: .26rem auto;
  }

</style>
