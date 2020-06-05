import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addKsqyltkBase(params) {
    return fetchPost('/api/kuangshanqiyelutiankuang', params)
  },
  // 基本信息
  getKsqyltkBase(params) {
    return fetchGet(`/api/kuangshanqiyelutiankuang/${params}`)
  },
  // 开采规模保存
  addKcgmltkInfo(params) {
    return fetchPost(`/api/lutiankuangkaicaiguimo`, params)
  },
  // 开采规模列表
  getKcgmltkList(params) {
    return fetchGet('/api/lutiankuangkaicaiguimo', params)
  },
  // 开采规模删除
  deleteKcgmltkInfo(id) {
    return fetchDelete(`/api/lutiankuangkaicaiguimo/${id}`)
  },
}
