import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addZtxncBase(params) {
    return fetchPost('/api/zhatuxiaonachang', params)
  },
  // 基本信息
  getZtxncBase(params) {
    return fetchGet(`/api/zhatuxiaonachang/${params}`)
  },
  // 堆场信息保存
  addDcxxInfo(params) {
    return fetchPost(`/api/zhatuxiaonachangduichang`, params)
  },
  // 堆场信息列表
  getDcxxList(params) {
    return fetchGet('/api/zhatuxiaonachangduichang', params)
  },
  // 堆场信息删除
  deleteDcxxInfo(id) {
    return fetchDelete(`/api/zhatuxiaonachangduichang/${id}`)
  },
}
