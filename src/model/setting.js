import request from '@/widget/request'

export const mobileLogout = (data) => request('/ouser-web/mobileLogin/exit.do', data)

export const getUserInfo = (data) => request('/api/my/user/info', data)

export const getRealNameAuthInfo = (data) => request('/ouser-center/realNameAuth/getRealNameAuthInfo.do', data)

export const updateUserInfo = (data) => request('/api/my/user/updateInfo', data)
