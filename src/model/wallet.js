import request from '@/widget/request'

export const getWalletInfo = (data) => request('/api/my/wallet/summary', data)
