import request from '@/widget/request'

export const getWalletInfo = (data) => request('/api/my/wallet/YBalance', data)

export const createPay = (data) => request('/opay-web/createPay.do', data)

export const getOpenIdByCode = (data) => request('/api/weixin/getWxPayOpenIdByCode', data)

export const getPayGateway = (data) => request('/api/checkout/getPayGateway', data)

export const getRecordList = (data) => request('/api/my/wallet/YRecordList', data)