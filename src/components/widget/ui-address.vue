<template>
  <div>
    <div class="ui-mask" :class="{'active': showAddress}"></div>
    <div class="ui-address-cont" :class="{'active': showAddress}">
      <div class="ui-address-close" @click="closeAddressPopup"><i></i></div>
      <div class="ui-address-tit">
        <h4 class="c3">选择地区</h4>
      </div>
      <div class="ui-address-checked c3 font">
        <span v-show="currentProvince.name" @click="toggleLocationName(0)">{{currentProvince.name}}</span>
        <span v-show="currentCity.name" @click="toggleLocationName(1)">{{currentCity.name}}</span>
        <span v-show="currentRegion.name" @click="toggleLocationName(2)">{{currentRegion.name}}</span>
        <strong v-show="isChecked">请选择</strong>
      </div>
      <div class="ui-address" id="addressList">
        <ul class="font ui-address-list">
          <li v-for="(item,index) in list" :key="index" @click="selectLocation(item)"><span>{{item.name}}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import IScroll from '@/libs/IScroll'

  import request from '@/widget/request'

  import * as Model from '@/model/address'

  export default {
    props: {
      showAddress: {
        type: Boolean,
        default: false,
      }
    },
    data () {
      return {
        list: [],
        provinceList: [],
        cityList: [],
        regionList: [],
        isChecked: 1,
        currentProvince: {
          id: '',
          name: ''
        },
        currentCity: {
          id: '',
          name: ''
        },
        currentRegion: {
          id: '',
          name: ''
        },
        locationIndex: 0
      }
    },
    methods: {
      preventPopup (event) {
        event.preventDefault()
      },
      stopPopup (event) {
        event.stopPropagation()
      },
      /**
       * 获取用户地址省份列表
       */
      getProvinceList () {
        if (this.list.length) {
          return
        }
        Model.getProvinceList({
          type: 'GET'
        }).then((results) => {

          const data = results.data
          if (results.code == 0 && data) {
            this.list = data
            this.provinceList = data
          } else {
            this.$toast(results.message)
          }
        })
      },
      /**
       * 选择地址索引切换
       * @param {String} code 地址编码
       * @param {String} addressName 地址名称
       */
      selectLocation ({id,code,name}) {

        let {
          locationIndex,
          provinceList
        } = this

        if (locationIndex < 3) {
          
          locationIndex = parseInt(locationIndex) + 1
        }

        this.locationIndex = locationIndex

        this.isChecked = 1

        if (locationIndex == 1) {

          this.currentProvince = {
            name,
            id
          }
          this.list = provinceList

        } else if (locationIndex == 2) {

          this.currentCity = {
            name,
            id
          }
        } else if (locationIndex == 3) {
          this.currentRegion = {
            name,
            id
          }

          this.$emit('toggleLocation',false)
          const provinceCode = this.currentProvince.id
          const cityId = this.currentCity.id
          const regionId = this.currentRegion.id
          const provinceName = this.currentProvince.name
          const cityName = this.currentCity.name
          const regionName = this.currentRegion.name
          this.isChecked = 0
          const isChecked = this.isChecked

          this.$emit('selectValue',{
            provinceCode,
            cityId,
            regionId,
            provinceName,
            cityName,
            regionName,
            isChecked
          })
        }

        if (locationIndex < 3) {
          this.getLocationList(code)
        }

      },
      /**
       * 获取用户地址列表
       * @param {String} code 地址编码
       */
      getLocationList (code) {
        request(`/api/location/list/${code}`,{
          type: 'GET'
        }).then((results) => {
          const data = results.data
          if (results.code  == 0 && data) {
            this.list = data
            if (this.locationIndex == 1)  {
              this.cityList = data
            } else if (this.locationIndex == 2){
              this.regionList = data
            }
          } else {
            this.$toast(results.message)
          }
        })
      },
      /**
       * 切换用户地址切换
       *
       */
      toggleLocationName (index) {

        this.isChecked = 1

        this.currentRegion= {
          id: '',
          name: ''
        }
        if (index == 0) {
          this.currentProvince = {
            id: '',
            name: ''
          }
          this.currentCity = {
            id: '',
            name: ''
          }
          this.list = this.provinceList
        } else if (index == 1){

          this.list = this.cityList

          this.currentCity = {
            id: '',
            name: ''
          }
        }

        this.locationIndex = index
      },
      /**
       *
       * 关闭用户地址弹层
       */
      closeAddressPopup () {
        this.$emit('toggleLocation',false)
      }
    },
    created () {
      this.getProvinceList()
    },
    watch: {
      list () {
        this.$nextTick(() => {
          new IScroll('#addressList',{
            scrollX: false
          })
        })
      }
    }
  }
</script>


<style lang="scss">
  @import '../../styles/ui-address.scss';
</style>
