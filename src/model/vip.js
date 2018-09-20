
import request from '@/widget/request'

export const getDolphinList = (data) => request('/api/dolphin/list', data)

export const getRankList = (data) => request('/my-static/rank/index.json', data)

export const getRankPrice = (data) => request('/my-static/rank/price.json', data)

export const getUserInfo = (data) => request('/api/my/user/info', data)

export const getWalletInfo = (data) => request('/api/my/wallet/summary', data)

export const addBuyListCart = (data) => request('/api/cart/addItem', data)
