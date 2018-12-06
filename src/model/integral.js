
import request from '@/widget/request'

export const getPointList = (data) => request('/api/my/point/list', data)

export const getPointNumber = (data) => request('/api/my/point/account', data)
