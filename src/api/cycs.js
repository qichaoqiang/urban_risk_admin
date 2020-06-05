import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addCycsBase(params) {
    return fetchPost('/api/canyinchangsuo', params)
  },
  // 基本信息
  getCycsBase(params) {
    return fetchGet(`/api/canyinchangsuo/${params}`)
  },
  // 人流信息保存
  addRlxxInfo(params) {
    return fetchPost(`/api/canyinchangsuorenliuxinxi`, params)
  },
  // 人流信息列表
  getRlxxList(params) {
    return fetchGet('/api/canyinchangsuorenliuxinxi', params)
  },
  // 人流信息删除
  deleteRlxxInfo(id) {
    return fetchDelete(`/api/canyinchangsuorenliuxinxi/${id}`)
  },
  // 管道天然气保存
  addGdtrqInfo(params) {
    return fetchPost(`/api/ranliaoxinxiguandaotianranqi`, params)
  },
  // 管道天然气列表
  getGdtrqList(params) {
    return fetchGet('/api/ranliaoxinxiguandaotianranqi', params)
  },
  // 管道天然气删除
  deleteGdtrqInfo(id) {
    return fetchDelete(`/api/ranliaoxinxiguandaotianranqi/${id}`)
  },
  // 液化石油气保存
  addYhsyqInfo(params) {
    return fetchPost(`/api/ranliaoxinxiyehuashiyouqi`, params)
  },
  // 液化石油气列表
  getYhsyqList(params) {
    return fetchGet('/api/ranliaoxinxiyehuashiyouqi', params)
  },
  // 液化石油气删除
  deleteYhsyqInfo(id) {
    return fetchDelete(`/api/ranliaoxinxiyehuashiyouqi/${id}`)
  },
  // 醇基燃料保存
  addCjrlInfo(params) {
    return fetchPost(`/api/ranliaoxinxichunjiranliao`, params)
  },
  // 醇基燃料列表
  getCjrlList(params) {
    return fetchGet('/api/ranliaoxinxichunjiranliao', params)
  },
  // 醇基燃料删除
  deleteCjrlInfo(id) {
    return fetchDelete(`/api/ranliaoxinxichunjiranliao/${id}`)
  },
  // 其他保存
  addElseInfo(params) {
    return fetchPost(`/api/ranliaoxinxiqita`, params)
  },
  // 其他列表
  getElseList(params) {
    return fetchGet('/api/ranliaoxinxiqita', params)
  },
  // 其他删除
  deleteElseInfo(id) {
    return fetchDelete(`/api/ranliaoxinxiqita/${id}`)
  },
}
