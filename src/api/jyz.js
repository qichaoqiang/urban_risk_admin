import { fetchPost, fetchGet, fetchDelete } from './axios'

export default {
  // 基本信息保存
  addJyzBase(params) {
    return fetchPost('/api/jiayouzhan', params)
  },
  // 基本信息
  getJyzBase(params) {
    return fetchGet(`/api/jiayouzhan/${params}`)
  },
  // 储罐保存
  addCgInfo(params) {
    return fetchPost(`/api/jiayouzhanchucunxinxi`, params)
  },
  // 储罐列表
  getCgList(params) {
    return fetchGet('/api/jiayouzhanchucunxinxi', params)
  },
  // 储罐删除
  deleteCgInfo(id) {
    return fetchDelete(`/api/jiayouzhanchucunxinxi/${id}`)
  },
  // 加油量保存
  addJylInfo(params) {
    return fetchPost(`/api/jiayouliang`, params)
  },
  // 加油量列表
  getJylList(params) {
    return fetchGet('/api/jiayouliang', params)
  },
  // 加油量删除
  deleteJylInfo(id) {
    return fetchDelete(`/api/jiayouliang/${id}`)
  },
}
