import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addKsqydxkBase(params) {
    return fetchPost('/api/kuangshanqiyedixiakuang', params)
  },
  // 基本信息
  getKsqydxkBase(params) {
    return fetchGet(`/api/kuangshanqiyedixiakuang/${params}`)
  },
  // 开采规模保存
  addKcgmdxkInfo(params) {
    return fetchPost(`/api/kaicaiguimo`, params)
  },
  // 开采规模列表
  getKcgmdxkList(params) {
    return fetchGet('/api/kaicaiguimo', params)
  },
  // 开采规模删除
  deleteKcgmdxkInfo(id) {
    return fetchDelete(`/api/kaicaiguimo/${id}`)
  },
}
