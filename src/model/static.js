import request from '@/widget/request'

export const getFastClick = (data) => request('/webapp-static/fastclick/index.js',data)

export const getLizardCode = (data) => request('/webapp-static/lizard/index.js',data)
