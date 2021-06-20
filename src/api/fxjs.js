import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 风险计算方法保存
  addFxjsInfo(params) {
    return fetchPost(`/api/fengxianjisuanfangfa`, params)
  },
  // 风险计算方法列表
  getFxjsList(params) {
    return fetchGet(`/api/fengxianjisuanfangfa`, params)
  },
  // 风险计算方法删除
  deleteFxjsInfo(id) {
    return fetchDelete(`/api/fengxianjisuanfangfa/${id}`)
  },
}
