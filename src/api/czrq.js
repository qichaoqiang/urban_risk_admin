import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addCzrqBase(params) {
    return fetchPost('/api/chengzhenranqi', params)
  },
  // 基本信息
  getCzrqBase(params) {
    return fetchGet(`/api/chengzhenranqi/${params}`)
  },
  // 城镇燃气管道信息保存
  addGdxxczInfo(params) {
    return fetchPost(`/api/chengzhenranqiguandaoxinxi`, params)
  },
  // 城镇燃气管道信息列表
  getGdxxczList(params) {
    return fetchGet('/api/chengzhenranqiguandaoxinxi', params)
  },
  // 城镇燃气管道信息删除
  deleteGdxxczInfo(id) {
    return fetchDelete(`/api/chengzhenranqiguandaoxinxi/${id}`)
  },
}
