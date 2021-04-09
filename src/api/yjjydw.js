import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addYjjydwBase(params) {
    return fetchPost('/api/yingjijiuyuanduiwu', params)
  },
  // 基本信息
  getYjjydwBase(params) {
    return fetchGet(`/api/yingjijiuyuanduiwu/${params}`)
  },
  // 队伍构成保存
  addDwgcInfo(params) {
    return fetchPost(`/api/duiwugoucheng`, params)
  },
  // 队伍构成列表
  getDwgcList(params) {
    return fetchGet('/api/duiwugoucheng', params)
  },
  // 队伍构成删除 
  deleteDwgcInfo(id) {
    return fetchDelete(`/api/duiwugoucheng/${id}`)
  },
}
