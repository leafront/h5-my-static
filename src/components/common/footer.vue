<template>
  <div class="footer">
    <div class="footer-item" @click="pageAction('/index.html')">
      <i class="icon1"></i>
      <span>首页</span>
    </div>
    <div class="footer-item" @click="pageAction('/category.html')">
      <i class="icon2"></i>
      <span>分类</span>
    </div>
    <div class="footer-item" @click="pageAction('/view/h5/30.html')">
      <i class="icon3"></i>
      <span>全球尖货</span>
    </div>
    <div class="footer-item" @click="pageAction('/cart.html')">
      <i class="icon4"></i>
      <span>购物车</span>
    </div>
    <div class="footer-item active">
      <i class="icon5"></i>
      <span>我</span>
    </div>
  </div>
</template>

<script type="text/javascript">

  export default {
    methods: {
      pageAction (url) {
        location.href = url
      }
    }
  }

</script>

<style lang="scss">
 .footer{
   height: 1rem;
   border-top: .01rem solid #ddd;
   display: flex;
   background: #fff;
 }
  .footer-item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &.active {
      .icon5 {
        background-position: -2.55rem 0;
      }
    }
    i{
      width: .5rem;
      height: .5rem;
      background: url(../../images/footer_icon.png) no-repeat;
      background-size: 3rem auto;
      display: block;
      margin-top: .1rem;
    }
    .icon1 {
      background-position: .01rem -.01rem;
    }
    .icon2 {
      background-position: -.55rem -.01rem;
    }
    .icon3 {
      background-position: -1.12rem -.03rem;
    }
    .icon4 {
      background-position: -1.66rem -.02rem;
    }
    .icon5 {
      background-position: -2.13rem 0;
    }
    span{
      color: #333;
      margin-top: .02rem;
      display: block;
    }
  }
</style>
