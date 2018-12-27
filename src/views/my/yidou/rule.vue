<template>
  <div class="pageView">
      <AppHeader :title="title"></AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
        <div class="my-yidou-rule">
            <h4 class="font">一、什么是伊豆？</h4>
            <p>1.伊豆是仅限在来伊份APP使用，可用于APP内活动参与、社区互动、兑换等。</p>
            <p>2.伊豆可在“我的”中查看伊豆数量及伊豆明细。</p>
            <p>3.用户未使用的伊豆，来伊份将在后年的1月1日清零。例如2018年1月1日清零2016年1月1日至2016年12月31日的所有伊豆。</p>
            <p>4.来伊份积分可以按一定比例兑换成伊豆。</p>
            <h4>二、伊豆如何获得？</h4>
            <p>1.用户成功注册来伊份APP均可获得伊豆。</p>
            <p>2.用户登录来伊份APP签到可以获得伊豆。</p>
            <p>3.用户分享来伊份APP商品、活动等行为可以获得伊豆。</p>
            <p>4.用户完成订单好评并晒图可以获得伊豆。</p>
            <p>5.用户在来伊份App社区内进行互动可以获得伊豆，比如评论、点赞、分享、关注、发布等。</p>
            <p>6.每天伊豆发放数量有限，送完为止。</p>
            <h4>三、伊豆如何使用？</h4>
            <p>1.伊豆可以在APP内参与抽奖等活动时使用。</p>
            <p>2.伊豆可以用于兑换优惠券，按券额进行相应消耗。</p>
            <p>3.来伊份APP社区内用户之间的打赏可以使用伊豆。</p>
            <p>4.来伊份APP其他线上活动时可以使用伊豆。</p>
            <p>5.伊豆的使用数量视不同活动或互动行为情况而定。</p>
            <h4>四、其他说明</h4>
            <p>伊豆规则最终解释权归来伊份所有。</p>
        </div>  
    </div>
  </div>        
</template>

<script type="text/javascript">

    import AppHeader from '@/components/common/header'

    export default {
        data () {
            return {
                title: '伊豆规则',
                pageView: true
            }
        },
        components: {
            AppHeader
        }
    }

</script>   

<style lang="scss">
.my-yidou-rule{
    padding: 0 .2rem .3rem;
    h4{
        font-size: .28rem;
        margin-top: .4rem;
    }
    p{
        margin-top: .1rem;
        line-height: .4rem;
    }
}
</style>    