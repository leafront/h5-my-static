
import utils from '@/widget/utils'

import store from '@/widget/store'

//上家的sharecode
const SHANGJIA_SHARE_CODE = "shareCode"
//当前用户的sharecode, 对于普通用户该值是他的上家分销商的sharecode。
const CURUSER_SHARE_CODE = "s_currentsharecode"
//当前分销商的id
const DISTRIBUTOR_ID = "distributorId"
//当前分销商信息
const CUR_DISTRIBUTOR = "currDistributor"

const distribution = {

  /**
   * 获取当前用户的上家sharecode，目前上家的sharecode会存储在cookie里。
   * @return {String} shareCode
   */
  getInviterShareCode() {
    return utils.getCookie(SHANGJIA_SHARE_CODE || "")
  },

  /**
   * 设置上家的
   * @param {String} sharecode
   */
  setInviterShareCode(shareCode) {
    if (shareCode) {
     utils.setCookie(SHANGJIA_SHARE_CODE, shareCode);
    }
  },
  /**
   * 20170706增加清除上级sharecode（影响未知），修复详情页普通用户分享普通商品，
   * 注册不应该带sharecode，绑定到默认分销商下级，
   * 应该清除session和cookie中的shareCode
   */
  clearCurrentDistributionData () {

    store.remove(SHANGJIA_SHARE_CODE,'session')
    utils.delCookie('shareCode')
    store.remove(CURUSER_SHARE_CODE,'session')
    store.remove(DISTRIBUTOR_ID,'session')
    store.remove(CUR_DISTRIBUTOR,'session')

  }
}


export default distribution
