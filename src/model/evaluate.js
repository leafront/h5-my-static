
import request from '@/widget/request'

export const getEvaluateList = (data) => request('/api/my/comment/list',data)
