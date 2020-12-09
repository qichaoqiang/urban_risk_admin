import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addHpBase(params) {
    return fetchPost('/api/huapo', params)
  },
  // 基本信息
  getHpBase(params) {
    return fetchGet(`/api/huapo/${params}`)
  },
}
