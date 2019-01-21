import request from '@/widget/request'

export const getGroupList = (data) => request('/api/patchgroupon/getMyPatchGrouponInfo',data)
