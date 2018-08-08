<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">

    </div>
  </div>
</template>

<script type="text/javascript">

  export default {
    data () {
      return {
        isBorder: true,
        title: '银行卡',
        pageView: true
      }
    }
  }

</script>
