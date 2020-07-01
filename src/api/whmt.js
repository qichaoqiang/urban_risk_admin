import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addWhmtBase(params) {
    return fetchPost('/api/weihuomatou', params)
  },
  // 基本信息
  getWhmtBase(params) {
    return fetchGet(`/api/weihuomatou/${params}`)
  },
  // 码头规模保存
  addMtgmInfo(params) {
    return fetchPost(`/api/matouguimo`, params)
  },
  // 码头规模列表
  getMtgmList(params) {
    return fetchGet('/api/matouguimo', params)
  },
  // 码头规模删除
  deleteMtgmInfo(id) {
    return fetchDelete(`/api/matouguimo/${id}`)
  },
  // 泊位信息保存
  addBwxxInfo(params) {
    return fetchPost(`/api/boweixinxi`, params)
  },
  // 泊位信息列表
  getBwxxList(params) {
    return fetchGet('/api/boweixinxi', params)
  },
  // 泊位信息删除
  deleteBwxxInfo(id) {
    return fetchDelete(`/api/boweixinxi/${id}`)
  },
  // 危货码头-仓储信息保存
  addCcxxwhInfo(params) {
    return fetchPost(`/api/weihuomatoucangchuxinxi`, params)
  },
  // 危货码头-仓储信息列表
  getCcxxwhList(params) {
    return fetchGet('/api/weihuomatoucangchuxinxi', params)
  },
  // 危货码头-仓储信息删除
  deleteCcxxwhInfo(id) {
    return fetchDelete(`/api/weihuomatoucangchuxinxi/${id}`)
  },
}
