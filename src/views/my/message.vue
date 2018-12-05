<template>
  <div class="pageView">
    <AppHeader :title="title"></AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="my-message">
        <div class="my-message-item" @click="settingMessage('pushStatus')">
          <span>消息推送</span>
          <div class="ui-switch">
            <input type="checkbox" :checked="pushStatus == 1" @click="stopEvent($event)">
          </div>
        </div>
        <div class="my-message-item" @click="settingMessage('noticeMessage')">
          <span>通知显示消息详情</span>
          <div class="ui-switch">
            <input type="checkbox" :checked="noticeMessage == 1" @click="stopEvent($event)">
          </div>
        </div>
        <div class="my-message-item" @click="settingMessage('voicePhone')">
          <span>允许接受语音视频电话</span>
          <div class="ui-switch">
            <input type="checkbox" :checked="voicePhone == 1" @click="stopEvent($event)">
          </div>
        </div>
        <div class="my-message-item" @click="settingMessage('friendValidate')">
          <span>加我好友需要验证</span>
          <div class="ui-switch">
            <input type="checkbox" :checked="friendValidate == 1" @click="stopEvent($event)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import utils from '@/widget/utils'

  import store from '@/widget/store'

  import app from '@/widget/app'

  export default {
    data () {
      return {
        title: '消息设置',
        pageView: false,
        isApp: utils.isApp(),
        pushStatus: 1,  //消息推送默认状态
        noticeMessage: 1, //通知显示消息详情
        voicePhone: 1, //音频通话
        friendValidate: 1, //好友验证
        isClickMessage: true
      }
    },
    components: {
      AppHeader
    },
    methods: {
      stopEvent (event) {
        event.preventDefault()
      },

      /**
       * H5 调用native 消息设置
       */
      settingMessage (name){

        if (!this.isClickMessage) {
          return
        }

        const messageName = this[name] == 1 ? 0 : 1

        this.isClickMessage = false

        app.postMessage( name,{status: messageName},(result) => {
          if (result == 1) {
            this[name] = messageName
            store.set('SETTING_'+ name, messageName,'local')
            this.$toast('设置成功')
            setTimeout(() => {
              this.isClickMessage = true
            },1000)
          } else {
            this.$toast('设置失败')
            setTimeout(() => {
              this.isClickMessage = true
            },1000)
          }
        })

        setTimeout(() => {
          this.isClickMessage = true
        },4000)

      },
      setMessageInfo () {

        const pushStatus = store.get('SETTING_pushStatus','local') === 0 ? 0 : 1

        const noticeMessage = store.get('SETTING_noticeMessage','local') === 0 ? 0 : 1

        const voicePhone = store.get('SETTING_voicePhone','local') === 0 ? 0 : 1

        const friendValidate = store.get('SETTING_friendValidate','local') === 0 ? 0 : 1

        this.pushStatus = pushStatus
        this.noticeMessage = noticeMessage
        this.voicePhone = voicePhone
        this.friendValidate = friendValidate
        this.pageView = true
      }
    },
    created () {
      this.setMessageInfo()
    }
  }

</script>

<style lang="scss">
  @import '../../styles/ui-switch.scss';
  .my-message{
    padding-left: .2rem;
    margin-top: .2rem;
    background: #fff;
  }
  .my-message-item{
    height: .88rem;
    display: flex;
    padding-right: .3rem;
    border-bottom: .01rem solid #ddd;
    align-items: center;
    justify-content: space-between;
    span{
      font-size: .32rem;
      color: #333;
    }
  }
</style>
