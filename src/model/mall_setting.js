import request from '@/widget/request'

export const getWxpayAppId = (data) => request('/opay-web/getWxpayAppId.do',data)

export const getMobileMallBasicSetting = (data) => request('/osc-api/getMobileMallBasicSetting.do',data)
