
import * as Model from '@/model/common'

import store from '@/widget/store'

const common = {
  /**
   * 获取用户地址区域信息
   */
  getAreaInfo () {
    return Model.getAreaInfo({
      type: 'GET'
    }).then((areaInfo) => {

      if (areaInfo.code == 0 && areaInfo.data) {
        return areaInfo.data
      }
    }).then((result) => {

      return Model.getAreaCode({
        type: 'GET',
        data: {
          regionCode: result.defaultAreaCode
        }})
        .then((codeInfo) => {

          if (codeInfo.code == 0 && codeInfo.data) {
            return codeInfo.data
          } else {
            return null
          }

      })
    })
  },

  /**
   *
   * 获取区域信息保存storage
   * @return {Object}
   */
  getAreaCode () {

    const getAreaInfo = store.get('areaInfo','local')

    let pName = ''
    let aCode = ''

    if (!getAreaInfo) {
      this.getAreaInfo().then((result) => {
        const {
          provinceName,
          provinceCode,
          cityName,
          cityCode,
          regionName,
          regionCode
        } = result
        const setAreaInfo = {
          province: {
            name: provinceName,
            code: provinceCode
          },
          city: {
            name: cityName,
            code: cityCode
          },
          region: {
            name: regionName,
            code: regionCode
          }
        }
        store.set('areaInfo',setAreaInfo,'local')
        store.set('curLocation',setAreaInfo,'local')
        pName = provinceName
        aCode = regionCode
      })
    } else {
      pName = getAreaInfo.province.name
      aCode = getAreaInfo.region.code
    }

    return {
      provinceName: pName,
      areaCode:aCode
    }
  }
}

export default common
