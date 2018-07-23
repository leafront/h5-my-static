
import request from '@/widget/request'

export const getMessageCode = (data) => request('/ouser-web/mobileRegister/sendCaptchasCodeFormNew.do',data)

export const getImageKey = (data) => request('/ouser-web/api/user/init.do',data)

export const getSystemTime = (data) => request('/api/realTime/getTimestamp',data)

export const getAreaInfo = (data) => request('/api/commondata/getConfig',data)

export const getAreaCode = (data) => request('/api/location/getCompleteAreaInfo',data)
