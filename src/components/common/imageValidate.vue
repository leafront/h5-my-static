<template>
  <div v-if="needImgCaptcha">
    <div class="ui-mask" :class="{'active': imageValidate}"></div>
    <div class="ui-image" :class="{'active': imageValidate}">
      <h4 class="c3">请输入图片验证码</h4>
      <div class="ui-image-cont">
        <input type="tel" autofocus="autofocus" class="ui-image-code" v-model="verifyCode" maxlength="6" placeholder="请输入验证码"/>
        <div class="ui-image-close" :class="{'active': verifyCode}" @click="deleteVerifyCode">
          <svg class="icon icon-close" aria-hidden="true">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
        <div class="ui-image-pic" @click="getImageKey" :style="{'backgroundImage': 'url(data:image/png;base64,'+imageVerifyCode+')' }"></div>
      </div>
      <div class="ui-image-submit">
        <span @click="cancel">取消</span>
        <span @click="confirm">确定</span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import * as Model from '@/model/common'

  import validate from '@/widget/validate'

  import utils from '@/widget/utils'

  import {mapGetters, mapActions} from 'vuex'

  import CryptoJS from 'crypto-js'

  const encryptKey = (val) => {

    const key = CryptoJS.enc.Utf8.parse("1fi;qPa7utddahWy")

    const srcs = CryptoJS.enc.Utf8.parse(val)

    const ciphertext = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7

    })

    const symbolStr = '@%^*'

    const cipherVal = symbolStr + ciphertext.toString()

    return cipherVal
  }

  export default {
    data () {
      return {
        needImgCaptcha: false,
        verifyCode: '',  //图片输入验证码
        imageVerifyCode: '', //获取的图片验证码
        imageKey: '',  //验证码秘钥
        params: {
          initType: 2,
          width: 1.6,
          height: .6,
        }
      }
    },
    props: {
      mobile: {
        type: String,
        default: ''
      },
      codeText: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapGetters({
        'imageValidate': 'getImageValidate'
      })
    },
    watch: {
      imageValidate (val,oldVal) {
       if (val) {
         this.getImageKey()
       }
      }
    },
    methods: {
      ...mapActions([
        'updateImageValidate'
      ]),
      cancel () {
        this.updateImageValidate(false)
        this.verifyCode = ''
        utils.removeAppViewFixed()
      },

      confirm () {
        const type = 0
        this.getMessageCode(type)
      },

      deleteVerifyCode () {
        this.verifyCode = ''
      },
      /**
       * 获取图片key
       */
      getImageKey () {
        const data = this.params
        const fontSize = parseInt(document.documentElement.style.fontSize)
        data.width = parseInt(String(1.6 * fontSize),10)
        data.height = parseInt(String(.6 * fontSize),10)
        data.mobile = this.mobile
        Model.getImageKey({
          type: 'POST',
          data
        }).then((result) => {
          const data = result.data

          if (result.code == 0) {

            if (data.needImgCaptcha) {
              this.needImgCaptcha = true
              this.verifyCode = ''
              this.imageVerifyCode = data.image
              this.imageKey = data.imageKey
            } else {
              this.imageKey = data.imageKey
              this.getMessageCode(1)
            }
          } else {
            this.$toast(result.message)
          }
        })
      },

      /**
       *
       * 发送验证码
       * @params {Number} type 0、图片验证码在获取短信验证 1、短信验证
       *
       */
      getMessageCode (type) {

        const {
          mobile,
          verifyCode,
          imageKey
        } = this

        const data = {
          mobile,
          captchasType: 3,
          imageKey
        }

        const encryptMobile = encryptKey(mobile)

        if (type == 0) {
          if (!this.verifyCode) {
            this.$toast('请输入图形验证码')
            return
          }

          if (!validate.isMessageCode(verifyCode)) {
            this.$toast('请输入正确的图形验证码')
            return
          }

          data.checkImageCode = verifyCode
        }

        Model.getMessageCode({
          type: 'POST',
          data
        }).then((result) => {

          const data = result.data
          this.verifyCode = ''

          if (result.code == 0) {  // 24小时内一个手机号最多发送30条短信，多则不发
            this.$toast(result.message)
            this.$emit('startCountTime')
          } else if (result.code == 913) {
            this.$toast('您今天发送的短信验证码已超限了哦')

          } else if (result.code == 914) {   // 每小时内一个手机号发送超过10条，则需要图片验证码

            this.updateImageValidate(true)
            this.getImageKey()
            this.$toast('为了您的账户安全，请输入图片验证码再试')
          } else if (result.code == 920) {   // 每分钟手机最多一条验证码
            this.$emit('startCountTime')
            this.$toast('验证码已发送，请1分钟后再试')
          } else if (result.code == -2) {
            this.getImageKey()
            this.$toast(result.message)
          } else {
            this.getImageKey()
            this.$toast(result.message)
          }
        })
      }
    }
  }

</script>

<style lang="scss">
  .ui-image{
    padding-top: .36rem;
    position: fixed;
    width:5.4rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
    background: rgba(253,253,253,.95);

    border-radius: .06rem;
    display: none;
    &.active{
      display: block;
    }
    h4{
      font-size: .32rem;
      text-align: center;
    }
  }
  .ui-image-close{
    padding: .2rem;
    visibility: hidden;
    &.active{
      visibility: visible;
    }
    .icon-close{
      font-size: .4rem;
      color:#999;
    }
  }
  .ui-image-cont{
    margin: .3rem .36rem 0;
    height: 1rem;
    padding: .2rem .2rem;
    display: flex;
    align-items: center;
    background: #fff;
    .ui-image-code{
      height: .6rem;
      line-height:.6rem;
      width: 1.88rem;
      position: relative;
      box-sizing: border-box;
      font-size:.3rem;
      letter-spacing: .05rem;
      &::-webkit-input-placeholder {
        color:#bbb;
        font-size: .28rem;
        letter-spacing: 0;
      }
    }
    .ui-image-pic{
      width: 1.6rem;
      height: .6rem;
      background-repeat: no-repeat;
      cursor: pointer;
    }
  }
  .ui-image-submit{
    border-top: .01rem solid #d5d5d6;
    display: flex;
    align-items: center;
    margin-top: .3rem;
    span{
      display: flex;
      justify-content: center;
      line-height: .88rem;
      flex:1;
      color:#353535;
      font-size: .3rem;
      &:last-child{
        border-left: .01rem solid #d5d5d6;
        color:#ff6900;

      }
    }
  }
</style>
