<template>
  <div class="vip-skeleton">
    <div class="vip-skeleton-user">
      <div class="vip-skeleton-pic ui-skeleton-bg"></div>
      <div class="vip-skeleton-user-txt">
        <span class="ui-skeleton-bg"></span>
        <strong class="ui-skeleton-bg"></strong>
      </div>
    </div>
    <div class="vip-skeleton-banner">
      <div class="vip-skeleton-banner-item ui-skeleton-bg"></div>
    </div>
    <div class="vip-skeleton-des">
      <div class="vip-skeleton-title ui-skeleton-bg"></div>
      <div class="vip-skeleton-des-pic ui-skeleton-bg"></div>
      <div class="vip-skeleton-title ui-skeleton-bg"></div>
    </div>
    <div class="vip-skeleton-best">
      <div class="vip-skeleton-best-pic ui-skeleton-bg"></div>
      <div class="vip-skeleton-best-pic ui-skeleton-bg"></div>
      <div class="vip-skeleton-best-pic ui-skeleton-bg"></div>
      <div class="vip-skeleton-best-pic ui-skeleton-bg"></div>
    </div>
    <div class="vip-skeleton-shop">
      <div class="vip-skeleton-title ui-skeleton-bg"></div>
      <div class="vip-skeleton-shop-item" v-for="n in 10">
        <div class="vip-skeleton-shop-pic ui-skeleton-bg"></div>
        <span class="ui-skeleton-bg"></span>
        <strong class="ui-skeleton-bg"></strong>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .vip-skeleton-shop{
    padding: 0 .3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .vip-skeleton-shop-item{
    width: 3.22rem;
    padding-top: .3rem;
    padding-bottom: .3rem;
    display: flex;
    flex-direction: column;
    span{
      width: 80%;
      height: .3rem;
      margin-top: .2rem;
    }
    strong{
      margin-top: .3rem;
      width: 1.5rem;
      height: .3rem;
    }
    .vip-skeleton-shop-pic{
      width: 3.22rem;
      height: 3.22rem;
    }
  }
  .vip-skeleton-title{
    width: 100%;
    height: .76rem;
    margin-top: .2rem;
  }
  .vip-skeleton-des{
    padding: 0 .3rem;
    .vip-skeleton-des-pic{
      height: 4.45rem;
    }
  }
  .vip-skeleton-best{
    padding: 0 .3rem .2rem;
    .vip-skeleton-best-pic{
      margin-top: .16rem;
      height: 2.16rem;
    }
  }
  .vip-skeleton-banner{
    height: 1.44rem;
    padding: .16rem .3rem 0;
    .vip-skeleton-banner-item{
      width: 100%;
      height: 1.2rem;
    }
  }
  .vip-skeleton-user{
    height: 2.1rem;
    padding: 0 .3rem;
    display: flex;
    align-items: center;
    .vip-skeleton-pic{
      width: 1.2rem;
      height: 1.2rem;
    }
  }
  .vip-skeleton-user-txt{
    margin-left:.25rem;
    display: flex;
    flex-direction: column;
    flex:1;
    span{
      width: 100%;
      height: .3rem;
    }
    strong{
      margin-top: .3rem;
      width: 2rem;
      height: .3rem;
    }
  }
</style>
