<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="my-protocol">
        <p>请仔细阅读本协议。一经下载、复制、安装或使用本软件的所有或任何部分，您即接受本协议中规定的所有条款和条件。</p>
        <p>1．本“软件”是由上海来伊份电子商务有限公司（以下简称来伊份）开发。</p>
        <p>2．“软件”的一切版权、商标权、专利权、商业秘密等知识产权，以及与“软件”相关的所有信息内容均受中华人民共和国著作权法、商标法、专利法、反不正当竞争法和相应的国际条约以及其他知识产权法律法规的保护，除涉及第三方授权的软件或技术外，来伊份享有上述知识产权。</p>
        <p>3．未经来伊份书面同意，您不得为任何营利性或非营利性的目的自行实施、利用、转让或许可任何三方实施、利用、转让上述知识产权，来伊份保留追究上述未经许可行为的权利。</p>
        <p>4．来伊份在此提醒您，除非您接受本《协议》所有条款，否则您无权下载、安装或使用本软件及其相关服务。您的下载、安装、使用等行为将视为对本《协议》的接受。</p>
        <p>5．本《协议》可由来伊份随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知。您可重新下载安装本软件查阅最新版协议条款。在来伊份修改《协议》条款后，如果您不接受修改后的条款，请立即停止使用来伊份提供的软件和服务。</p>
        <p>6．您仅可为非商业目的在手机终端上安装、使用、显示、运行本“软件”。通过本软件所获得的信息仅供参考，具体信息以来伊份门店告示为准。</p>
        <p>7．来伊份特别提请您注意：来伊份为了保障公司业务发展和调整的自主权，拥有随时自行修改或中断软件授权而不需通知您的权利，如有必要，修改或中断会以通知形式公布于来伊份门店、报刊或网站重要页面上。</p>
        <p class="my-protocol-name">上海来伊份电子商务有限公司</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .my-protocol{
    padding: .1rem .3rem;
    p{
      font-size: .26rem;
      margin-top: .2rem;
    }
    .my-protocol-name{
      text-align: center;
      padding-top: .2rem;
    }
  }
</style>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  export default {
    data () {
      return {
        isBorder: true,
        title: '软件使用许可协议',
        pageView: true
      }
    },
    components: {
      AppHeader
    },
    methods: {

    },
    created () {

    }
  }

</script>
