import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addShyjllBase(params) {
    return fetchPost('/api/shehuiyingjililiang', params)
  },
  // 基本信息
  getShyjllBase(params) {
    return fetchGet(`/api/shehuiyingjililiang/${params}`)
  },
  // 社会应急队伍构成保存
  addShyjdwgcInfo(params) {
    return fetchPost(`/api/shehuiyingjiduiwugoucheng`, params)
  },
  // 社会应急队伍构成列表
  getShyjdwgcList(params) {
    return fetchGet('/api/shehuiyingjiduiwugoucheng', params)
  },
  // 社会应急队伍构成删除
  deleteShyjdwgcInfo(id) {
    return fetchDelete(`/api/shehuiyingjiduiwugoucheng/${id}`)
  },
  // 社会应急救援经历保存
  addShyjjyjlInfo(params) {
    return fetchPost(`/api/shehuiyingjijiuyuanjingli`, params)
  },
  // 社会应急救援经历列表
  getShyjjyjlList(params) {
    return fetchGet('/api/shehuiyingjijiuyuanjingli', params)
  },
  // 社会应急救援经历删除
  deleteShyjjyjlInfo(id) {
    return fetchDelete(`/api/shehuiyingjijiuyuanjingli/${id}`)
  },
}
