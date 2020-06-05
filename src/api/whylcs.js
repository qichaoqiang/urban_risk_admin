import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addWhylcsBase(params) {
    return fetchPost('/api/wenhuayulechangsuo', params)
  },
  // 基本信息
  getWhylcsBase(params) {
    return fetchGet(`/api/wenhuayulechangsuo/${params}`)
  },
  // 人流特征保存
  addRltzInfo(params) {
    return fetchPost(`/api/wenhuayulechangsuorenliutezheng`, params)
  },
  // 人流特征列表
  getRltzList(params) {
    return fetchGet('/api/wenhuayulechangsuorenliutezheng', params)
  },
  // 人流特征删除
  deleteRltzInfo(id) {
    return fetchDelete(`/api/wenhuayulechangsuorenliutezheng/${id}`)
  },
}
