<template>
  <div class="my-vip-banner">
    <swiper :list="bannerList" :index="index" @toggleIndex="toggleIndex" :style="{'height':itemHeight}">
      <ul slot="banner" class="slideshow-item pic-lazyLoad" :style="{'height':itemHeight}">
        <li v-for="item in bannerList" :style="{'width':itemWidth}" @click="pageAction(item.linkUrl)">
          <img :src="item.imageUrl" :style="{'width':itemWidth, 'height':itemHeight}">
        </li>
      </ul>
      <ul slot="dot" class="slideshow-dots">
        <li v-for="(item,$index) in bannerList" :class="{'active':$index == index-1}"></li>
      </ul>
    </swiper>
  </div>
</template>
<style lang="scss">
  .my-vip-banner{
    margin: .16rem 4% 0 4%;
    padding-bottom: .24rem;
    overflow: hidden;
  }
</style>
<script>

  import swiper from '@/components/widget/swiper.vue'

  export default {
    data () {
      return {
        index: 1,
        itemWidth: document.documentElement.clientWidth * .92 + 'px',
        itemHeight: '1.2rem'
      }
    },
    props: {
      bannerList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components:{
      swiper
    },
    methods: {

      pageAction (url) {

        if (url) {

          location.href = url

        }

      },
      toggleIndex (val) {
        this.index = val
      }
    }
  }
</script>
