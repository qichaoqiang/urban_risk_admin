import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addKymtBase(params) {
    return fetchPost('/api/keyunmatou', params)
  },
  // 基本信息
  getKymtBase(params) {
    return fetchGet(`/api/keyunmatou/${params}`)
  },
  // 码头容量保存
  addMtrlInfo(params) {
    return fetchPost(`/api/keyunmatoumatourongliang`, params)
  },
  // 码头容量列表
  getMtrlList(params) {
    return fetchGet('/api/keyunmatoumatourongliang', params)
  },
  // 码头容量删除
  deleteMtrlInfo(id) {
    return fetchDelete(`/api/keyunmatoumatourongliang/${id}`)
  },
}
