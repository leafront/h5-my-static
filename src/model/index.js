import request from '@/widget/request'

export const getUserInfo = (data) => request('/api/my/user/info', data)

export const getWalletInfo = (data) => request('/api/my/wallet/summary', data)

export const getUserRecharge = (data) => request('/back-finance-web/api/commission/queryPreCommissionAmount.do', data)

export const orderSummary = (data) => request('/api/my/order/summary', data)

export const getMessageInfo = (data) => request('/api/social/vl/message/getMsgSummary', data)

export const getBaichuanConfig = (data) => request('/search-backend-web/getTaoBaoOpenIM.json', data)

export const getCustomerInfo = (data) => request('/customer/user/getInfo.do', data)

export const getIMAppModule = (data) => request('/im/appModule', data)
