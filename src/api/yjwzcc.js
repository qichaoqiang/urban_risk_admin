import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addYjwzccBase(params) {
    return fetchPost('/api/yingjiwuzichucun', params)
  },
  // 基本信息
  getYjwzccBase(params) {
    return fetchGet(`/api/yingjiwuzichucun/${params}`)
  },
  // 储存物资信息保存
  addCcwzxxInfo(params) {
    return fetchPost(`/api/chucunwuzixinxi`, params)
  },
  // 储存物资信息列表
  getCcwzxxList(params) {
    return fetchGet('/api/chucunwuzixinxi', params)
  },
  // 储存物资信息删除
  deleteCcwzxxInfo(id) {
    return fetchDelete(`/api/chucunwuzixinxi/${id}`)
  },
}
