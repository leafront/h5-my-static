import request from '@/widget/request'

export const getSign = (data) => request('/api/weixin/getSign',data)
