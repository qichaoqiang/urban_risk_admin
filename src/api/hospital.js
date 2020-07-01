import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 医院基本信息保存
  addHospitalBase(params) {
    return fetchPost('/api/yiyuan', params)
  },
  // 医院
  getHospitalBase(params) {
    return fetchGet(`/api/yiyuan/${params}`)
  },
  // 危险化学品保存
  addWhyyItem(params) {
    return fetchPost('/api/yiyuanweixianhuaxuepin', params)
  },
  // 危险化学品列表
  getWhyyItemList(params) {
    return fetchGet('/api/yiyuanweixianhuaxuepin', params)
  },
  // 危险化学品删除
  deleteWhyyItem(id) {
    return fetchDelete(`/api/yiyuanweixianhuaxuepin/${id}`)
  },
  // 液氮保存
  addYdItem(params) {
    return fetchPost('/api/yiyuanyeyang', params)
  },
  // 液氮列表
  getYdItemList(params) {
    return fetchGet('/api/yiyuanyeyang', params)
  },
  // 液氮删除
  deleteYdItem(id) {
    return fetchDelete(`/api/yiyuanyeyang/${id}`)
  },
  // 危险废液保存
  addRiskLiauidItem(params) {
    return fetchPost('/api/yiyuanweixianfeiye', params)
  },
  // 危险废液列表
  getRiskLiauidItemList(params) {
    return fetchGet('/api/yiyuanweixianfeiye', params)
  },
  // 危险废液删除
  deleteRiskLiauidItem(id) {
    return fetchDelete(`/api/yiyuanweixianfeiye/${id}`)
  },
}
