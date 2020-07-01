import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addCsqlBase(params) {
    return fetchPost('/api/chengshiqiaoliang', params)
  },
  // 基本信息
  getCsqlBase(params) {
    return fetchGet(`/api/chengshiqiaoliang/${params}`)
  },
  // 养护信息保存
  addYhxxInfo(params) {
    return fetchPost(`/api/yanghuxinxi`, params)
  },
  // 养护信息列表
  getYhxxList(params) {
    return fetchGet('/api/yanghuxinxi', params)
  },
  // 养护信息删除
  deleteYhxxInfo(id) {
    return fetchDelete(`/api/yanghuxinxi/${id}`)
  },
}
