import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 民爆企业保存
  addMbqyBase(params) {
    return fetchPost('/api/minbaoqiye', params)
  },
  // 民爆企业
  getMbqyBase(params) {
    return fetchGet(`/api/minbaoqiye/${params}`)
  },
  // 仓储信息保存
  addCcxxInfo(params) {
    return fetchPost(`/api/cangchuxinxi`, params)
  },
  // 仓储信息列表
  getCcxxList(params) {
    return fetchGet('/api/cangchuxinxi', params)
  },
  // 仓储信息删除
  deleteCcxxInfo(id) {
    return fetchDelete(`/api/cangchuxinxi/${id}`)
  },
  // 周边情况保存
  addRimInfo(params) {
    return fetchPost(`/api/zhoubianhuanjing`, params)
  },
  // 周边情况列表
  getRimList(params) {
    return fetchGet('/api/zhoubianhuanjing', params)
  },
  // 周边情况删除
  deleteRimInfo(id) {
    return fetchDelete(`/api/zhoubianhuanjing/${id}`)
  },
}
