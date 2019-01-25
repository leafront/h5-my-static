import request from '@/widget/request'

export const getLizardCode = (data) => request('/webapp-static/lizard/index.js',data)
