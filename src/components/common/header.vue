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
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAsCAYAAAB7aah+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NThCMEUzNEJCNDJBMTFFOEI2NzA4OEIzMzZEMDNGMkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NThCMEUzNEFCNDJBMTFFOEI2NzA4OEIzMzZEMDNGMkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxRjZBRDBBN0ExOUUxMUU3OTBBQUNFQTREQTM0QzM1NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxRjZBRDBBOEExOUUxMUU3OTBBQUNFQTREQTM0QzM1NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmioDq4AAAKtSURBVHja3Jg9aBRBFMf/cznHHDnQIpWmtLKUpIgWxkKCoHC5JigqQsDPRDkbjQppNDGVoJcoQiD4gQiSC8bGWBgR0UJsBAuxM1hdEfD0jjHJ+G7MHTO7m9yy+5LChYXhzTI/3sx/3scKrTU24klgg55kbSCEiL2YHky1YqH8nIYdEMhhTOfZPdLDMk2QlzTsNA5oDLFvnYF8V7M03FU3CnxgBRnIDzWz4knt+YQ2eZgNNDWY2YR59QRL6HIgW1Pd4ooq2d+KmryjiEGfxQydxUHL9JUge8RIuWjmrasT2SOCPPBA5m0Iyz1agRxzIEty32qQSCDdj9seSHXxbnFffWOLDPocrtPBD1imX/TuFXfxhS0EGcgyrjqQZtkVBhIaRNt1yQdJ4IC4pT6yBVU6+H7arpuWaRHL6R4xhreRgmogpA99dPB3HEgZvWKy9IotTegceiFxz4E046iYxFSsNOFATiCLCh458wqn6eCfsiU+fSq9HymzYNKKxANiAhNsGdZAEqWCA2nCZTGOfNwoXw+quLi5HRU1R6MWB5LHaOR4GBhUK+qxA0ngRhzIWlu33ZmR+Lw+VZDCBWeGVGfUxw0yqhJOwExW1ccFc1Rn1EUC8MGqauQuII0AvDCSfFxYYAgyMFKdZWqJC1uzOFk1B4VMD6GLE0oF13ye0aXWOdnO6pFTJ3hTeAjPbI9C13UBsGKjeiFSXUcCOU9qtJNgK71v9BnsZNu6BjVdkWq6zqByK1alSpf6OEWQh45nTeq1Pil3sHd8BpbEM8vU1ggWufYupDNHyLMXPli16+MEZUem/xS2ZLI+2EL5XRAsVttS65F6fk7Penok075g+HeRDeR0fS7sPcb1btYe1nR32+QhumdzlrljXf4z1GH/zmyRVh4NroL+lz8nfwUYADZPHW4TwjtIAAAAAElFTkSuQmCC) no-repeat;
    background-size: .26rem auto;
  }

</style>
