<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="my-security">
        <p>来伊份在此声明，您通过本软件参加的商业活动，与发布平台无关。</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

  .my-security{
    padding: .3rem .3rem 0;
    p{
      font-size: .26rem;
    }
  }

</style>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  export default {
    data () {
      return {
        isBorder: true,
        title: '特别说明',
        pageView: true
      }
    },
    components: {
      AppHeader
    }
  }

</script>
