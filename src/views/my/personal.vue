<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
    </AppHeader>
    <AppHeader :title="editTitle" :isBorder="isBorder" v-show="editHeader" :isShowHeader="isShowHeader" :backFn="backAction">
      <div class="ui-header-right" @click="editUserInfo">
        <span>确认</span>
      </div>
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView, 'scroll_view_hidden': showAddress}">
      <div class="my-personal">
        <div class="my-personal-upload">
          <span class="c3">头像</span>
          <div class="my-personal-pic" v-if="headPicUrl" :style="{'backgroundImage': 'url('+headPicUrl+')'}"/>
          <input type="file" @change="uploadHeadPic($event)" @click="appUploadHeadPic" class="my-personal-file" accept="image/png,image/jpeg,image/jpg"/>
        </div>
        <div class="my-personal-item" @click="editPopup(1, '编辑昵称')">
          <span>昵称</span>
          <strong>{{userInfo.nickname}}</strong>
          <div class="ui-right-bottom"></div>
        </div>
        <div class="my-personal-item">
          <span>手机号码</span>
          <strong>{{userInfo.mobile}}</strong>
        </div>
        <div class="my-personal-item" @click="toggleLocation(true)">
          <span>地区</span>
          <strong>{{userInfo.addressDetail}}</strong>
          <div class="ui-right-bottom"></div>
        </div>
        <div class="my-personal-item" @click="editPopup(2, '编辑地址')">
          <span>地址</span>
          <strong>{{userInfo.userAddress}}</strong>
          <div class="ui-right-bottom"></div>
        </div>
        <div class="my-personal-item" @click="toggleSex(true)">
          <span>性别</span>
          <strong>{{userInfo.sex == 0 ? '男' : '女' }}</strong>
        </div>
        <div class="my-personal-item" @click="togglePicker(true)">
          <span>生日</span>
          <strong>{{userInfo.birthdayStr}}</strong>
        </div>
        <div class="my-personal-item" @click="editPopup(3, '编辑邮编')">
          <span>邮编</span>
          <strong>{{userInfo.zipCode}}</strong>
          <div class="ui-right-bottom"></div>
        </div>
        <div class="my-personal-item" @click="editPopup(4, '编辑邮箱')">
          <span>邮箱</span>
          <strong>{{userInfo.email}}</strong>
          <div class="ui-right-bottom"></div>
        </div>
      </div>
      <div class="my-personal-auth">
        <p class="font">实名认证备案信息(伊手海淘订单必填)</p>
      </div>
      <div class="my-personal-auth-item" @click="identityAuth">
        <span>实名认证</span>
        <strong>{{isIdentityTips[identityStatus]}}</strong>
        <div class="ui-right-bottom"></div>
      </div>
    </div>
    <div class="my-personal_popup" v-show="personalPopup == 1">
      <input type="text" v-model="userInfo.nickname" placeholder="昵称" maxlength="20"/>
      <div class="my-personal-close-icon"  v-show="userInfo.nickname" @click="deleteInputText('nickname')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
    </div>
    <div class="my-personal_popup" v-show="personalPopup == 2">
      <input type="text" v-model="userInfo.userAddress" placeholder="详细地址" maxlength="40"/>
      <div class="my-personal-close-icon" v-show="userInfo.userAddress" @click="deleteInputText('userAddress')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
    </div>
    <div class="my-personal_popup" v-show="personalPopup == 3">
      <input type="text" v-model="userInfo.zipCode" placeholder="邮编" maxlength="40"/>
      <div class="my-personal-close-icon" v-show="userInfo.zipCode" @click="deleteInputText('zipCode')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
    </div>
    <div class="my-personal_popup" v-show="personalPopup == 4">
      <input type="text" v-model="userInfo.email" placeholder="邮箱" maxlength="40"/>
      <div class="my-personal-close-icon" v-show="userInfo.email" @click="deleteInputText('email')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
    </div>
    <UIAddress
      :showAddress="showAddress"
      @toggleLocation="toggleLocation"
      @selectValue="selectValue">
    </UIAddress>
    <UIDatePicker
      :start="start"
      :end="end"
      :selectValue="checkedValue"
      :isPicker="isPicker"
      @togglePicker="togglePicker"
      @confirm="confirm">
    </UIDatePicker>
    <UISex :sexPopup="sexPopup" @toggleSex="toggleSex" @checkedSex="checkedSex"></UISex>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import ImageUpload from '@/components/widget/imageUpload'

  import UIAddress from '@/components/widget/ui-address'

  import UISex from '@/components/common/ui-sex'

  import UIDatePicker from '@/components/widget/ui-date-picker'

  import config from '@/config/index'

  import utils from '@/widget/utils'

  import validate from '@/widget/validate'

  import app from '@/widget/app'

  import * as Model from '@/model/setting'

  export default {
    data() {
      return {
        isBorder: true,
        title: '个人资料',
        editTitle: '',
        pageView: false,
        isShowHeader: true,
        userInfo: {},
        identityStatus: 7,
        isIdentityTips: {
          "0": "已提交待审核",
          "1": "待认证",
          "2": "已认证",
          "3": "认证失败",
          "7": "立即认证"
        },
        editHeader: false,
        personalPopup: -1,
        showAddress: false,
        headPicUrl: '',
        start: 1920,
        checkedValue: ['1990','01','10'],
        end:  new Date().getFullYear(),
        isPicker: false,
        sexPopup: false
      }
    },
    components: {
      AppHeader,
      ImageUpload,
      UIDatePicker,
      UIAddress,
      UISex
    },
    methods: {
      pageAction(url) {
        this.$router.push(url)
      },
      toggleSex (val) {
        this.sexPopup = val
      },
      checkedSex (val) {
        this.userInfo.sex = val
        const data =  {
          sex: val
        }
        this.updateUserInfo(data,'保存成功')
      },
      backAction () {
        this.personalPopup = -1
        this.pageView = true
        this.editHeader = false
        this.editTitle = ''
        this.getUserInfo()
      },
      editPopup (val,title) {
        this.personalPopup = val
        this.pageView = false
        this.editHeader = true
        this.editTitle = title
      },
      confirm (val) {
        const data = {
          birthday: val
        }
        this.userInfo.birthdayStr  = val
        this.isPicker = false
        this.updateUserInfo(data)
      },
      /**
       * 获取用户信息
       */
      getUserInfo () {
        Model.getUserInfo({
          type: 'POST'
        }).then((result) => {

          const data = result.data
					this.$hideLoading()
          if (result.code == 0 && data) {
            this.pageView = true
            this.userInfo = data
            this.headPicUrl = data.url160x160 || config.staticPath + '/my-static/images/logo-laiyifen.png'
          } else {
            this.$toast(result.message)
          }
        })
      },
      getRealNameAuthInfo () {
        Model.getRealNameAuthInfo({
          type: 'POST'
        }).then((result) => {

          const data = result.data
          if (result.code == 0 && data) {
            const identityStatus = data.authStatus
            this.identityStatus = identityStatus
          }
        })
      },
      identityAuth () {
        const {
          identityStatus
        } = this

        if (identityStatus == 3 || identityStatus == -1) {  //可编辑

          location.href = '/my/authentication.html?isEdit=1'

        } else if (identityStatus == 0 || identityStatus == 1 || identityStatus == 2) {  //不可编辑

          location.href = '/my/authentication.html?isEdit=0'
        }
      },
      selectValue ({provinceCode,cityCode,regionCode,provinceName,cityName,regionName}) {

        this.userInfo.userProvinceCode = provinceCode
        this.userInfo.userCityCode = cityCode
        this.userInfo.userRegionCode = regionCode
        this.userInfo.userProvince = provinceName
        this.userInfo.userCity = cityName
        this.userInfo.userRegion = regionName
        this.userInfo.addressDetail = provinceName + ' ' +  cityName + ' ' + regionName

        const data = {
          userProvinceCode: provinceCode,
          userCityCode: cityCode,
          userRegionCode: regionCode,
          userProvince: provinceName,
          userCity: cityName,
          userRegion: regionName
        }

        this.updateUserInfo(data,'保存成功')

      },
      /**
       *
       * 显示切换收货地址
       */
      toggleLocation (val) {
        utils.appViewFixed()
        this.showAddress = val
      },
      togglePicker (val) {
        this.isPicker = val
        let birthday = this.userInfo.birthdayStr

        if (birthday && val) {
          birthday =  birthday.split('-')
          this.checkedValue = birthday
        }
      },
      /**
       * 更新个人资料信息
       * @param data
       */
      updateUserInfo (data,message) {

        let messageStr  = message || '资料修改成功'

        Model.updateUserInfo({
          type: 'POST',
          data
        }).then((result) => {

          const data = result.data
          if (result.code == 0 ) {
            this.$toast(messageStr)
          } else {
            this.$toast(result.message)
          }

        })
      },
      deleteInputText (key) {

        this.userInfo[key] = ''

      },
      editUserInfo () {
        const {
          personalPopup
        } = this
        const data = {}
        const editStatus = {
          "1": "nickname",
          "2": "userAddress",
          "3": "zipCode",
          "4": "email"
        }

        const tipsMessage = {
          "nickname": "请输入昵称",
          "userAddress": "请输入详细地址",
          "zipCode": "请输入邮编",
          "email": "请输入邮箱"
        }

        const editKey = editStatus[personalPopup]

        const editVal = this.userInfo[editKey]

        if (!editVal) {
          this.$toast(tipsMessage[editKey])
          return
        }

        if (personalPopup == 3 && editVal) {
          if (!validate.isZipCode(editVal)) {
            this.$toast('请输入正确的邮编')
            return
          }
        }

        if (personalPopup == 4 && editVal) {
          if (!validate.isEmail(editVal)) {
            this.$toast('请输入正确的邮箱')
            return
          }
        }

        data[editKey] = editVal
        this.updateUserInfo(data)
        this.backAction()

      },
      /**
       * app图片上传
       */
      appUploadHeadPic () {
        if (utils.isApp) {
          app.postMessage("uploadPhoto", {
            maxCount:  1,
            isNeedCut: 1
          }, (result)=> {
            const data = { headPicUrl:result }
            this.headPicUrl = result
            Model.updateUserInfo({
              type: 'POST',
              data
            }).then((result) => {
              if (result.code != 0) {
                this.$toast(result.message)
              }
            })
          })
        }
      },
      /**
       * H5 图片上传
       * @param event
       */
      uploadHeadPic (event) {

        if (utils.isApp()) {
          return
        }
        this.$showPageLoading()
        const file = event.currentTarget.files[0]

        ImageUpload.start(file, {
          url: '/api/fileUpload/putObjectWithForm.do',
          data: {
            suffix: 'png'
          },
          fileKey: 'file',
          onUpload:(result) =>{

            const data = result.data
            this.$hidePageLoading()

            if (result.code == 0 && data) {

              const filePath =  data.filePath
              this.headPicUrl = filePath
              event.target.value = ''
              this.updateUserInfo({headPicUrl:filePath},'头像修改成功')

            } else {

              this.$toast(result.message)
            }

          },
          onError: () =>{
            this.$toast('请求出错，请稍后再试')
          }
        })
      }
    },
    created() {
      this.$showLoading()
      this.getUserInfo()
      this.getRealNameAuthInfo()
    }
  }

</script>

<style lang="scss">
  .my-personal_popup{
    display: flex;
    padding-left: .3rem;
    background: #fff;
    position: absolute;
    top: .88rem;
    left: 0;
    width: 100%;
    height: 1rem;
    input {
      flex: 1;
      height: 1rem;
      padding: .2rem 0;
      font-size: .28rem;
    }
  }
  .my-personal-close-icon{
    height: 1rem;
    display: flex;
    align-items: center;
    padding: 0 .3rem 0 .2rem;
    .icon{
      width:.4rem;
      height: .4rem;
      color:#999;
    }
  }
  .my-personal{
    padding-left: .3rem;
    margin-top: .2rem;
    background: #fff;
  }
  .my-personal-upload{
    height: 1.2rem;
    padding-right: .3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: .01rem solid #e0e0e0;
    position: relative;
    span{
      font-size: .32rem;
    }
    .my-personal-pic {
      width: .8rem;
      height: .8rem;
      border-radius: 50%;
      background: #ddd;
      background:url(/webapp-static/images/logo-laiyifen.png) no-repeat center;
      background-size: .8rem auto;
    }
    .my-personal-file{
      position: absolute;
      left:0;
      top:0;
      height: 1.2rem;
      width: 100%;
      opacity: 0;
    }
  }
  .my-personal-auth{
    display: flex;
    align-items: center;
    padding: 0 .3rem;
    height: .88rem;
  }
  .my-personal-auth-item{
    background: #fff;
    display: flex;
    height: .88rem;
    align-items: center;
    padding: 0 .3rem;
    .ui-right-bottom{
      margin-left: .2rem;
    }
    span{
      font-size: .32rem;
      color: #333;
      flex:1;
    }
    strong{
      font-size: .28rem;
    }
  }
  .my-personal-item{
    display: flex;
    height: .88rem;
    align-items: center;
    padding-right: .3rem;
    border-bottom: .01rem solid #e0e0e0;
    &:last-child{
      border-bottom:0;
    }
    .ui-right-bottom{
      margin-left: .2rem;
    }
    span{
      font-size: .32rem;
      color: #333;
      flex:1;
    }
    strong{
      font-size: .28rem;
    }
  }
</style>
