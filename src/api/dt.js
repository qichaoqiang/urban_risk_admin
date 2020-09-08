import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addDtBase(params) {
    return fetchPost('/api/ditie', params)
  },
  // 基本信息
  getDtBase(params) {
    return fetchGet(`/api/ditie/${params}`)
  },
}
