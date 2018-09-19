
import request from '@/widget/request'

export const getDolphinList = (data) => request('/api/dolphin/list', data)

export const getRankList = (data) => request('/api/ranking/rangKingList')

export const getRankPrice = (data) => request('/api/realTime/getPriceStockList')
