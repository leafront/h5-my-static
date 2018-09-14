<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">

    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'


  export default {
    data () {
      return {
        isBorder: true,
        title: '会员中心',
        pageView: true
      }
    },
    components: {
      AppHeader
    },
    methods: {
      pageAction (url) {
        this.$router.push(url)
      }
    }
  }

</script>

<style lang="scss">
</style>

