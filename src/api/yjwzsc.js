import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addYjwzscBase(params) {
    return fetchPost('/api/yingjiwuzishengchan', params)
  },
  // 基本信息
  getYjwzscBase(params) {
    return fetchGet(`/api/yingjiwuzishengchan/${params}`)
  },
  // 生产物资信息保存
  addScwzxxInfo(params) {
    return fetchPost(`/api/shengchanwuzixinxi`, params)
  },
  // 生产物资信息列表
  getScwzxxList(params) {
    return fetchGet('/api/shengchanwuzixinxi', params)
  },
  // 生产物资信息删除
  deleteScwzxxInfo(id) {
    return fetchDelete(`/api/shengchanwuzixinxi/${id}`)
  },
}
