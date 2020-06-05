import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addSptqyBase(params) {
    return fetchPost('/api/shepentuqiye', params)
  },
  // 基本信息
  getSptqyBase(params) {
    return fetchGet(`/api/shepentuqiye/${params}`)
  },
  // 喷涂工艺保存
  addPtgyInfo(params) {
    return fetchPost(`/api/pentugongyi`, params)
  },
  // 喷涂工艺列表
  getPtgyList(params) {
    return fetchGet('/api/pentugongyi', params)
  },
  // 喷涂工艺删除
  deletePtgyInfo(id) {
    return fetchDelete(`/api/pentugongyi/${id}`)
  },
}
