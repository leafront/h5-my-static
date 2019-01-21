import request from '@/widget/request'

export const getBuyList = (data) => request('/api/my/behavior/record', data)

export const addBuyListCart = (data) => request('/api/cart/addItem', data)
