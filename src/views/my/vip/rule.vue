<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
    </AppHeader>
    <div class="scroll-view-wrapper white-view" :class="{'visibility': pageView}">
      <div class="my-vip-rule">
        <div class="my-vip-rule-title">
          <i class="icon1"></i>
          <h4 class="c3">会员升级</h4>
        </div>
        <div class="my-vip-rule-des">
          <p class="font c3">(1)月度统计一年内（即12个自然月内）会员消费金额，一年内累计消费金额达升级额度时，会员等级提升。</p>
          <p class="font c3">(2)时间维度为月度统计，每月30日/31日完成会员升等。</p>
          <p class="font c3">(3)支持跳级升等。</p>
        </div>
        <div class="my-vip-rule-title">
          <i class="icon2"></i>
          <h4 class="c3">会员降级</h4>
        </div>
        <div class="my-vip-rule-des">
          <p class="font c3">(1)一年内（即12个自然月内）会员消费金额达本级别标准时，等级即可保留；如一年内累计消费金额达降级额度时，会员等级降低。</p>
          <p class="font c3">(2)时间维度为年度统计，每年12月31日完成会员保级与降级。</p>
          <p class="font c3">(3)支持跳级降等。</p>
        </div>
        <div class="my-vip-rule-title">
          <i class="icon3"></i>
          <h4 class="c3">等级概览</h4>
        </div>
        <div class="my-vip-rule-des">
          <p class="font c3">VIP1 需消费0~200元</p>
          <p class="font c3">VIP2 需消费201~500元</p>
          <p class="font c3">VIP3 需消费501~1000元</p>
          <p class="font c3">VIP4 需消费1001~2000元</p>
          <p class="font c3">VIP5 需消费2000元以上</p>
        </div>
        <div class="my-vip-rule-title">
          <i class="icon4"></i>
          <h4 class="c3">积分有效期</h4>
        </div>
        <div class="my-vip-rule-des">
          <p class="font c3">每年8月31日清除2年前账户剩余积分。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .my-vip-rule{
    padding: 0 .3rem 0 .28rem;
  }
  .my-vip-rule-des{
    padding-left: .56rem;
    padding-top: .16rem;
    p{
      line-height: .4rem;
    }
  }
  .my-vip-rule-title{
    margin-top: .32rem;
    display: flex;
    align-items: center;
    height: .5rem;
    i{
      width: .5rem;
      height: .5rem;
      background: url(./images/vip_rule_sprite.png) no-repeat;
      background-size: 1.78rem auto;
      &.icon1{
        background-position: .03rem -.06rem;
      }
      &.icon2{
        background-position: -.43rem -.05rem;
      }
      &.icon3{
        background-position: -.87rem -.06rem;
      }
      &.icon4{
        background-position: -1.31rem -.07rem;
      }
    }
    h4{
      padding-left: .1rem;
      font-size: .36rem;
      font-weight: bold;
    }
  }
</style>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  export default {
    data () {
      return {
        isBorder: false,
        title: '会员升降级规则',
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

